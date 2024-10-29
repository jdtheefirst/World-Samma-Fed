const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const { setUserSocket, getUserSocket } = require("./config/socketUtils");

const kurento = require("kurento-client");
const kurentoUrl = "wss://localhost:8888/kurento"; // This is the WebSocket URL for Kurento
let isLiveStreamActive = false;

let io;

const initializeSocketIO = (server) => {
  io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "/",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  const userStatuses = new Map();

  io.use(async (socket, next) => {
    try {
      const token = await socket.handshake.query.token;

      if (!token) {
        throw new Error("Not authorized, no token provided");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.exp < Date.now() / 1000) {
        throw new Error("Not authorized, token has expired");
      }

      // Check if user exists in User schema
      let user = await User.findById(decoded.id).select("-password");

      // If user not found in User schema, check in Admission schema
      if (!user) {
        user = await Admission.findById(decoded.id).select("-password");
      }

      if (!user) {
        throw new Error("User not found");
      }

      socket.user = user;
      next();
    } catch (error) {
      console.error(error);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("connected");

    const userId = socket.user._id;
    setUserSocket(userId, socket.id);

    socket.on("chat-message", (data) => {
      io.emit("received-message", data); // Emit message to all clients
    });

    socket.on("new message", (newMessageReceived) => {
      const recipientSocketId = getUserSocket(newMessageReceived.recipient._id);

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message received", newMessageReceived);
      } else {
        console.log("Recipient not connected");
      }
    });

    // Kurento-related events

    socket.on("onIceCandidate", (data) => {
      console.log("Backend received ICE candidate:", data.candidate);

      if (socket.kurentoClient && data.candidate) {
        console.log("Adding ICE candidate to Kurento client.");

        socket.kurentoClient.addIceCandidate(data.candidate, (error) => {
          if (error) {
            console.error("Error adding ICE candidate:", error);
          } else {
            console.log("ICE candidate added successfully.");
          }
        });
      } else {
        console.error("Kurento client or candidate is not set.");
      }
    });

    // For admin initiating the stream
    socket.on("startStream", (data) => {
      const sdpOffer = data.sdpOffer;

      if (isLiveStreamActive || !sdpOffer) {
        console.log(
          "Stream already active or SDP offer is missing:",
          isLiveStreamActive,
          sdpOffer
        );
        return;
      }

      isLiveStreamActive = true;

      try {
        kurento(kurentoUrl, (error, kurentoClient) => {
          if (error) {
            console.error("Could not find Kurento server at", kurentoUrl);
            isLiveStreamActive = false;
            return io.emit("error", {
              message: "Kurento server not available",
            });
          }

          console.log("Kurento client connected successfully.");
          socket.kurentoClient = kurentoClient;

          createMediaPipeline(sdpOffer);
        });
      } catch (error) {
        console.error("Error in starting stream:", error);
        isLiveStreamActive = false;
      }
    });

    function createMediaPipeline(sdpOffer) {
      socket.kurentoClient.create("MediaPipeline", (error, pipeline) => {
        if (error) {
          isLiveStreamActive = false;
          return io.emit("error", { message: error.message });
        }

        console.log("Media pipeline created.");
        pipeline.on("release", () => {
          isLiveStreamActive = false;
          console.log("Pipeline released, stream ended.");
          io.emit("streamEnded", { message: "Stream has ended." });
        });

        createWebRtcEndpoint(pipeline, sdpOffer);
      });
    }

    function createWebRtcEndpoint(pipeline, sdpOffer) {
      pipeline.create("WebRtcEndpoint", (error, webRtcEndpoint) => {
        if (error) {
          isLiveStreamActive = false;
          return io.emit("error", { message: error.message });
        }

        monitorMediaFlow(webRtcEndpoint);

        webRtcEndpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
          if (error) {
            isLiveStreamActive = false;
            return socket.emit("error", { message: error.message });
          }

          socket.emit("sdpAnswer", sdpAnswer); // Send the SDP answer to the client
          createRtpEndpoint(pipeline, webRtcEndpoint);
        });
      });
    }

    function createRtpEndpoint(pipeline, webRtcEndpoint) {
      pipeline.create("RtpEndpoint", (error, rtpEndpoint) => {
        if (error) {
          isLiveStreamActive = false;
          return io.emit("error", { message: error.message });
        }

        const rtmpUri = "rtmp://nginx:1935/stream";

        // Connect the WebRtcEndpoint to the RTP endpoint
        rtpEndpoint.connect(webRtcEndpoint, (error) => {
          if (error) {
            isLiveStreamActive = false;
            return console.error(
              "Error connecting WebRtcEndpoint to RTP:",
              error
            );
          }

          // Connect the RTP endpoint to the RTMP server
          rtpEndpoint.connect(rtmpUri, (error) => {
            if (error) {
              isLiveStreamActive = false;
              return console.error("Error streaming to RTMP server:", error);
            }

            console.log("Streaming to RTMP server started");
          });
        });
      });
    }

    function monitorMediaFlow(webRtcEndpoint) {
      webRtcEndpoint.on("MediaFlowInStateChange", (event) => {
        if (event.state === "NOT_FLOWING") {
          isLiveStreamActive = false;
          console.log("Media flow stopped, stream ended.");
          io.emit("streamEnded", { message: "Stream has stopped." });
        }
      });
    }

    // For user joining the stream
    socket.on("joinStream", (data) => {
      if (!isLiveStreamActive) {
        console.log("Stream is not active. Cannot join.");
        return socket.emit("error", { message: "No active stream" });
      }

      const { kurentoClient } = socket;
      kurentoClient.getMediaobjectById(pipeline.id, (error, pipeline) => {
        if (error) {
          return console.error("Error retrieving pipeline:", error);
        }

        pipeline.create("WebRtcEndpoint", (error, userEndpoint) => {
          if (error) {
            return socket.emit("error", { message: error.message });
          }

          userEndpoint.processOffer(data.sdpOffer, (error, sdpAnswer) => {
            if (error) {
              return socket.emit("error", { message: error.message });
            }

            // Send the SDP answer to the user

            socket.emit("userSdpAnswer", { sdpAnswer });
            userEndpoint.on("OnIceCandidate", (candidate) => {
              socket.emit("userIceCandidate", candidate);
            });
            socket.on("onUserIceCandidate", (candidate) => {
              userEndpoint.addIceCandidate(candidate);
            });
          });
        });
      });
    });

    socket.on("checkLiveStream", () => {
      console.log("checkLiveStream event received");
      socket.emit("liveStreamStatus", isLiveStreamActive);
      console.log("Live stream status emitted:", isLiveStreamActive);
    });

    socket.on("stop", () => {
      if (socket.kurentoClient) {
        socket.kurentoClient.close();
        isLiveStreamActive = false;

        io.emit("stopped", false); // Emit message to all clients
        console.log("Stream stopped by user.");
      }
    });

    socket.on("disconnect", () => {
      if (socket.user._id) {
        userStatuses.set(socket.user._id, "available");
      }
      if (socket.kurentoClient) {
        socket.kurentoClient.close();
        isLiveStreamActive = false;
        console.log("Client disconnected, stream ended.");
      }
    });
    userStatuses.delete(socket.user._id);
  });

  return io;
};

function getIO() {
  if (!io) {
    throw new Error(
      "Socket.IO is not initialized. Call initializeSocketIO(server) first."
    );
  }
  return io;
}

module.exports = {
  initializeSocketIO,
  getIO,
};

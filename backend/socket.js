const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const { setUserSocket, getUserSocket } = require("./config/socketUtils");
const {
  addIceCandidate,
  startKurentoPipeline,
  isLiveStreamActive,
} = require("./kurento");

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

    // For admin initiating the stream
    socket.on("startStream", (data) => {
      try {
        if (isLiveStreamActive) {
          console.log("Stream is already active, cannot start a new one.");
          return;
        }

        console.log("Admin started the stream:");
        startKurentoPipeline(data.sdpOffer, socket);
      } catch (error) {
        console.error("Error in startStream event:", error);
      }
    });

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

    socket.on("onIceCandidate", (data) => {
      console.log("Backend received ICE candidate:", data.candidate);
      addIceCandidate(data.candidate, socket);
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

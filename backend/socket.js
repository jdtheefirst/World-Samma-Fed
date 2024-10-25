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
    socket.on("start", async (data) => {
      try {
        console.log("Received start event with data:", data);
        await startKurentoPipeline(data.sdpOffer, socket);
        console.log("Kurento pipeline started successfully.");
      } catch (error) {
        console.error("Error in start event:", error);
      }
    });

    socket.on("onIceCandidate", (data) => {
      try {
        console.log("Received ICE candidate:", data.candidate);
        addIceCandidate(data.candidate, socket);
        console.log("ICE candidate added successfully.");
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
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

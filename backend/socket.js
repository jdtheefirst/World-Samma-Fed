const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const { setUserSocket, getUserSocket } = require("./config/socketUtils");
const { createProxyMiddleware } = require("http-proxy-middleware");
const Janus = require("janus-gateway");

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
  const createJanusSession = () => {
    return new Janus.Client("ws://janus:8188", {
      keepAlive: "true",
    });
  };

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

    // Initialize Janus session when a client connects
    const janus = createJanusSession();

    // Handle messages from frontend
    socket.on("start-stream", async (data) => {
      try {
        const rtmpPlugin = await janus.attach("janus.plugin.rtmp");

        // Publish stream to internal Janus RTMP server
        const response = await rtmpPlugin.message({
          request: "publish",
          rtmp: "rtmp://janus:8188/stream", // Internal Janus RTMP URL
        });

        socket.emit("stream-started", response); // Notify frontend
      } catch (error) {
        console.error("Error starting stream:", error);
        socket.emit("error", "Failed to start streaming");
      }
    });

    socket.on("stop-stream", async () => {
      try {
        // Stop the RTMP stream by hanging up the plugin
        await janus.detach();
        socket.emit("stream-stopped");
      } catch (error) {
        console.error("Error stopping stream:", error);
        socket.emit("error", "Failed to stop streaming");
      }
    });

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

    socket.on("disconnect", () => {
      if (socket.user._id) {
        userStatuses.set(socket.user._id, "available");
      }
    });
    janus.destroy();
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

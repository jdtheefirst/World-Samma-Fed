const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const Club = require("../backend/models/clubsModel");
const { setUserSocket, getUserSocket, setPeerId, getCurrentPeerId } = require("./config/socketUtils");
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
  const onlineClubs = new Set();
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
    console.log("connected")

    const userId = socket.user._id;
    setUserSocket(userId, socket.id);

    socket.on("wsfLiveSession", ({ peerId }) => {
      console.log("Received, working on it", userId, "Peer:", peerId);
      setPeerId(userId, peerId); // Store the peerId
      io.emit("wsfSessionStarted", { peerId }); // Emit an object with peerId property
    });

    socket.on("startLiveSession", async (clubId) => {
      const club = await Club.findOne({ _id: clubId });

      if (
        club &&
        (club.members.includes(userId) || club.followers.includes(userId))
      ) {
        onlineClubs.add(clubId);
        socket.join(clubId);
        io.broadcast.to(clubId).emit("liveSessionStarted", club.name);

        io.to(clubId).emit("startSignal");
      }
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

const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const Club = require("../backend/models/clubsModel");
<<<<<<< HEAD
const { getUserIdFromToken } = require("./middleware/authMiddleware");
=======
>>>>>>> master
const { setUserSocket, getUserSocket } = require("./config/socketUtils");
let io;

const initializeSocketIO = (server) => {
  io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
<<<<<<< HEAD
      origin: "http://localhost:3000",
    },
  });
  const onlineClubs = new Set();
  const onlineUsers = new Set();
=======
      origin: "/",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  const onlineClubs = new Set();
>>>>>>> master
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

<<<<<<< HEAD
      const user = await User.findById(decoded.id).select("-password");
=======
      // Check if user exists in User schema
      let user = await User.findById(decoded.id).select("-password");

      // If user not found in User schema, check in Admission schema
      if (!user) {
        user = await Admission.findById(decoded.id).select("-password");
      }

>>>>>>> master
      if (!user) {
        throw new Error("User not found");
      }

      socket.user = user;
<<<<<<< HEAD
      socket.handshake.query.token = token;

=======
>>>>>>> master
      next();
    } catch (error) {
      console.error(error);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
<<<<<<< HEAD
    const token = await socket.handshake.query.token;

    const userId = getUserIdFromToken(token);
    setUserSocket(userId, socket.id);

=======
    console.log("connected")

    const userId = socket.user._id;
    setUserSocket(userId, socket.id);

    socket.on('chat-message', (data) => {
      io.emit('received-message', data); // Emit message to all clients
    });

>>>>>>> master
    socket.on("startLiveSession", async (clubId) => {
      const club = await Club.findOne({ _id: clubId });

      if (
        club &&
        (club.members.includes(userId) || club.followers.includes(userId))
      ) {
        onlineClubs.add(clubId);
        socket.join(clubId);
<<<<<<< HEAD
        socket.broadcast.to(clubId).emit("liveSessionStarted", club.name);

        socket.to(clubId).emit("startSignal");
      }
    });

    socket.on("identityLiveSession", async (adminId) => {
      io.to(adminId).emit("signalStart");
    });
    socket.on("signaling", ({ to, from, signal }) => {
      io.to(to).emit("signaling", { from, signal });
    });

    socket.on("new message", (newMessageReceived) => {
      const recipientSocketId = getUserSocket(newMessageReceived.recipient._id);

      if (recipientSocketId) {
        socket
          .to(recipientSocketId)
          .emit("message received", newMessageReceived);
=======
        io.broadcast.to(clubId).emit("liveSessionStarted", club.name);

        io.to(clubId).emit("startSignal");
      }
    });

    socket.on("new message", (newMessageReceived) => {
      const recipientSocketId = getUserSocket(newMessageReceived.recipient._id);
    
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message received", newMessageReceived);
>>>>>>> master
      } else {
        console.log("Recipient not connected");
      }
    });

<<<<<<< HEAD
    socket.on("newConnection", async (userData) => {
      const email = userData.email;

      const clubRequests = await User.findOne({ email }).select("clubRequests");

      if (clubRequests) {
        socket.emit("updates", clubRequests);
      }

      const userId = userData._id;
      socket.join(userId);
      socket.emit("connected");
      socket.userData = userData;
      onlineUsers.add(userId);
      io.emit("onlineUsers", Array.from(onlineUsers));

      if (userData.isNewUser) {
        io.emit("newUserRegistered", userData);
      }
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("join room", (roomId) => {
      socket.join(roomId);
      const otherUsers = io.sockets.adapter.rooms.get(roomId);
      if (otherUsers.size > 1) {
        socket.to(roomId).emit("other user", socket.id);
      }
    });

    socket.on("signal", ({ to, from, signal, room }) => {
      io.to(to).emit("signal", { signal, callerID: from });
    });
    socket.on("initiate call", (recipientId) => {
      const recipientStatus = userStatuses.get(recipientId) || "available";
      if (recipientStatus === "busy") {
        socket.emit("user busy", recipientId);
      } else {
        userStatuses.set(recipientId, "busy");
        userStatuses.set(socket.userData._id, "busy");
        const roomId = createRoomId(socket.userData._id, recipientId);
        io.to(recipientId).emit("call initiated", roomId);
      }
    });

    socket.on("call initiated", (roomId) => {
      io.to(roomId).emit("ringing");
    });

    socket.on("endCall", (roomId) => {
      io.to(roomId).emit("call ended");
      socket.leave(roomId);
    });

    socket.on("disconnect", () => {
      if (socket.userData && socket.userData._id) {
        onlineUsers.delete(socket.userData._id);
        io.emit("onlineUsers", Array.from(onlineUsers));
        userStatuses.set(socket.userData?._id, "available");
      }
    });
    userStatuses.delete(socket.userData?._id);
=======
    socket.on("disconnect", () => {
      if (socket.user._id) {
        userStatuses.set(socket.user._id, "available");
      }
    });
    userStatuses.delete(socket.user._id);
>>>>>>> master
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

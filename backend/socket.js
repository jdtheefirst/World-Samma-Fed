const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../backend/models/userModel");
const { setUserSocket, getUserSocket } = require("./config/socketUtils");
const { spawn } = require("child_process");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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

    socket.on("startLiveSession", async (stream) => {
      const outputPath = "./uploads/video.mp4";
      const hlsOutputPath = `./uploads/live.m3u8`;

      const ffmpeg = spawn("ffmpeg", [
        "-i",
        stream,
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-f",
        "tee",
        // Stream to multiple platforms and generate HLS output
        `[f=flv]rtmp://worldsamma.org/live|` +
          `[f=flv]rtmp://live.yourstreamingplatform.com/app/your_stream_key|` +
          `[f=flv]rtmp://anotherplatform.com/app/your_stream_key|` +
          `[f=hls]${hlsOutputPath}`, // HLS output
      ]);

      ffmpeg.stderr.on("data", (data) => {
        console.error(`FFmpeg error: ${data}`);
      });

      ffmpeg.on("close", async (code) => {
        console.log(`FFmpeg process exited with code ${code}`);

        cloudinary.uploader.upload(
          outputPath,
          { resource_type: "video" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
            } else {
              console.log("Video uploaded to Cloudinary:", result.secure_url);
              io.emit("videoSaved", result.secure_url);

              fs.unlink(outputPath, (err) => {
                if (err) {
                  console.error("Error deleting the video file:", err);
                } else {
                  console.log("Video file deleted successfully");
                }
              });
            }
          }
        );

        // Emit the HLS URL to the frontend clients
        const hlsUrl = `https://worldsamma.org/uploads/live.m3u8`;
        io.emit("hlsUrl", hlsUrl); // Notify clients about the HLS URL

        // Clean up HLS files
        fs.unlink(hlsOutputPath, (err) => {
          if (err) {
            console.error("Error deleting HLS file:", err);
          } else {
            console.log("HLS file deleted successfully");
          }
        });
      });

      io.emit("startSignal");
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

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const payRoutes = require("./routes/payRouter");
const clubRouter = require("./routes/clubsRouter");
const messageRouter = require("./routes/messageRoute");
const submitRouter = require("./routes/submitRouter");
const provinceRouter = require("./routes/provinceRouter");
const nationalRouter = require("./routes/nationalRouter");
const voteRouter = require("./routes/voteRouter");
const donateRouter = require("./routes/donateRouter");
const useTranslator = require("./routes/translateRouter");
const downloadRouter = require("./routes/downloadRouter");
const { createProxyMiddleware } = require("http-proxy-middleware");

const path = require("path");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { initializeSocketIO, getIO } = require("./socket");

dotenv.config({ path: "./secrets.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Initialize Socket.IO
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
initializeSocketIO(server);
const io = getIO();

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api/paycheck", payRoutes);
app.use("/api/message", messageRouter);
app.use("/api/clubs", clubRouter);
app.use("/api/submit", submitRouter);
app.use("/api/province", provinceRouter);
app.use("/api/national", nationalRouter);
app.use("/api/translate", useTranslator);
app.use("/api/donate", donateRouter);
app.use("/api/poll", voteRouter);
app.use("/api/download", downloadRouter);

// Serve static assets and React frontend in production
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./frontend/build")));

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "./frontend/build", "index.html"));
  });
} else {
  // Fallback for development or other environments
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(
  "/janus-ws",
  createProxyMiddleware({
    target: "ws://janus:8188",
    ws: true,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReqWs: (proxyReq, req, socket, options) => {
      console.log("Proxying WebSocket request:", req.url);
      console.log("Headers:", req.headers);
    },
    onError: (err, req, res) => {
      console.error("WebSocket proxy error:", err.message);
    },
    onOpen: (proxySocket) => {
      console.log("WebSocket connection established with Janus");
    },
    onClose: (res) => {
      console.log("WebSocket connection closed");
    },
  })
);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

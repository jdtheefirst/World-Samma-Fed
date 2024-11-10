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

const path = require("path");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { initializeSocketIO } = require("./socket");
const WebSocket = require("ws");

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
  connectToJanus();
});
initializeSocketIO(server);

// Setup WebSocket proxy
const wss = new WebSocket.Server({ server, path: "/" });

wss.on("connection", (ws) => {
  const janusSocket = new WebSocket("ws://janus:8188");
  const ipSocket = new WebSocket("ws://167.99.44.195:8188");

  janusSocket.onopen = () => {
    console.log("Janus WebSocket connected janus");
  };

  ipSocket.onopen = () => {
    console.log("Janus WebSocket connected ip");
  };

  ipSocket.onerror = (error) => {
    console.log("WebSocket error ip error", error);
  };

  janusSocket.onerror = (error) => {
    console.log("WebSocket error janus error", error);
  };

  ws.on("message", (message) => {
    // Relay messages from frontend to Janus
    if (janusSocket.readyState === WebSocket.OPEN) {
      janusSocket.send(message);
    }
  });

  janusSocket.on("message", (message) => {
    // Relay messages from Janus to frontend
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });

  ws.on("close", () => {
    janusSocket.close();
  });

  janusSocket.on("close", () => {
    ws.close();
  });
});

let janusSocket;

// Function to connect to Janus WebSocket
function connectToJanus() {
  janusSocket = new WebSocket("ws://janus:8188");

  janusSocket.onopen = () => {
    console.log("Connected to Janus WebSocket");
  };

  janusSocket.onmessage = (message) => {
    console.log("Received message from Janus:", message.data);
    // Here you can handle or route incoming messages from Janus
  };

  janusSocket.onclose = () => {
    console.log("Disconnected from Janus WebSocket. Reconnecting...");
    setTimeout(connectToJanus, 3000); // Attempt reconnection after 3 seconds
  };

  janusSocket.onerror = (error) => {
    console.error("Janus WebSocket error:", error);
    janusSocket.close(); // Close the socket on error, triggering onclose
  };
}

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

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

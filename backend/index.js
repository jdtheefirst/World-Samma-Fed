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

const kurento = require("kurento-client");
let kurentoClient;
let kurentoPipeline;
let webRtcEndpoint;
let sdpAnswer;
let serverIceCandidates = [];
const kurentoUrl = "ws://localhost:8888/kurento";

app.post("/start-stream", async (req, res) => {
  const { sdpOffer } = req.body;

  if (!sdpOffer) {
    return res.status(400).json({
      error: "Stream already active or SDP offer is missing",
    });
  }

  if (!kurentoClient) {
    kurentoClient = await kurento("ws://localhost:8888/kurento");
    kurentoPipeline = await kurentoClient.create("MediaPipeline");
  }

  kurento(kurentoUrl, (error, kurentoClient) => {
    if (error) {
      console.error("Could not find Kurento server at", kurentoUrl);
      return res.status(500).json({ message: "Kurento server not available" });
    }

    console.log("Kurento client connected successfully.");
    req.kurentoClient = kurentoClient;

    createMediaPipeline(sdpOffer, res); // Pass 'res' for direct response
  });
});

function createMediaPipeline(sdpOffer, res) {
  req.kurentoClient.create("MediaPipeline", (error, pipeline) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    console.log("Media pipeline created.");
    pipeline.on("release", () => {
      console.log("Pipeline released, stream ended.");
    });

    createWebRtcEndpoint(pipeline, sdpOffer, res);
  });
}

function createWebRtcEndpoint(pipeline, sdpOffer, res) {
  pipeline.create("WebRtcEndpoint", (error, webRtcEndpoint) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    monitorMediaFlow(webRtcEndpoint);

    // Process the SDP offer
    webRtcEndpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      // Respond with the SDP answer to the client
      res.status(200).json({ sdpAnswer });
      createRtpEndpoint(pipeline, webRtcEndpoint);
    });
  });
}

function createRtpEndpoint(pipeline, webRtcEndpoint) {
  pipeline.create("RtpEndpoint", (error, rtpEndpoint) => {
    if (error) {
      console.error("Error creating RTP endpoint:", error);
      return io.emit("error", { message: error.message });
    }

    // Example RTMP URI where the stream will be sent
    const rtmpUri = "rtmp://nginx:1935/stream";

    // Connect the WebRtcEndpoint to the RTP endpoint
    rtpEndpoint.connect(webRtcEndpoint, (error) => {
      if (error) {
        console.error("Error connecting WebRtcEndpoint to RTP:", error);
        return io.emit("error", { message: error.message });
      }

      // Connect the RTP endpoint to the RTMP server
      rtpEndpoint.connect(rtmpUri, (error) => {
        if (error) {
          console.error("Error streaming to RTMP server:", error);
          return io.emit("error", { message: error.message });
        }

        console.log("Streaming to RTMP server started successfully.");
      });
    });
  });
}

function monitorMediaFlow(webRtcEndpoint) {
  webRtcEndpoint.on("MediaFlowInStateChange", (event) => {
    if (event.state === "NOT_FLOWING") {
      console.log("Media flow stopped, stream ended.");
      io.emit("streamEnded", { message: "Stream has stopped." });
    } else {
      console.log("Media flow state changed:", event.state);
    }
  });
}

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

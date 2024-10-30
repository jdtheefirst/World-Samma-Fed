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

const kurento = require("kurento-client");
let kurentoClient;
let kurentoPipeline;
let webRtcEndpoint;
let sdpAnswer;
let serverIceCandidates = [];
const kurentoUrl = "ws://localhost:8888/kurento";

app.post("/sendIceCandidate", (req, res) => {
  const { candidate } = req.body;

  console.log(candidate);

  if (webRtcEndpoint) {
    webRtcEndpoint.addIceCandidate(candidate);
  } else {
    console.log("Nothing like webRTC", webRtcEndpoint);
  }
  res.sendStatus(200);
});

app.get("/getSdpAnswer", (req, res) => {
  console.log("getting sdpAnswer");

  res.json({ sdpAnswer });
});

app.get("/getIceCandidates", (req, res) => {
  consoole.log("getIceCandidate", serverIceCandidates);

  res.json({ candidates: serverIceCandidates });
  serverIceCandidates = []; // Reset the candidate list after sending
});

app.post("/start-stream", async (req, res) => {
  const { sdpOffer } = req.body;

  console.log("Starting the stream!!");

  if (!sdpOffer) {
    return res.status(400).json({ error: "SDP offer is missing" });
  }

  try {
    if (!kurentoClient) {
      kurentoClient = await kurento(kurentoUrl);
      kurentoPipeline = await kurentoClient.create("MediaPipeline");
    }
    await createMediaPipeline(sdpOffer, res);
  } catch (error) {
    console.error("Error setting up Kurento:", error);
    return res.status(500).json({ message: "Kurento setup error" });
  }
});

async function createMediaPipeline(sdpOffer, res) {
  try {
    kurentoPipeline = await kurentoClient.create("MediaPipeline");
    console.log("Media pipeline created.");

    kurentoPipeline.on("release", () => {
      console.log("Pipeline released, stream ended.");
    });

    await createWebRtcEndpoint(kurentoPipeline, sdpOffer, res);
  } catch (error) {
    console.error("Error creating MediaPipeline:", error);
    res.status(500).json({ message: error.message });
  }
}

async function createWebRtcEndpoint(pipeline, sdpOffer, res) {
  try {
    webRtcEndpoint = await pipeline.create("WebRtcEndpoint");
    monitorMediaFlow(webRtcEndpoint);

    sdpAnswer = await webRtcEndpoint.processOffer(sdpOffer);
    res.status(200).json({ sdpAnswer });

    await webRtcEndpoint.gatherCandidates();
    await createRtpEndpoint(pipeline, webRtcEndpoint);
  } catch (error) {
    console.error("Error creating WebRtcEndpoint:", error);
    res.status(500).json({ message: error.message });
  }
}

async function createRtpEndpoint(pipeline, webRtcEndpoint) {
  try {
    const rtpEndpoint = await pipeline.create("RtpEndpoint");
    const rtmpUri = "rtmp://nginx:1935/stream";

    await rtpEndpoint.connect(webRtcEndpoint);
    console.log("Connected WebRtcEndpoint to RTP endpoint.");

    await rtpEndpoint.connect(rtmpUri);
    console.log("Streaming to RTMP server started successfully.");
  } catch (error) {
    console.error("Error creating RTP endpoint or streaming to RTMP:", error);
    io.emit("error", { message: error.message });
  }
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
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../frontend/build", "index.html"));
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

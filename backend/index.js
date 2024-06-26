const express = require("express");
const cors = require("cors");
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
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const donateRouter = require("./routes/donateRouter");
const useTranslator = require("./routes/translateRouter");
const path = require("path");
const bodyParser = require("body-parser");
const { initializeSocketIO } = require("./socket");
const helmet = require("helmet");

dotenv.config({ path: "./secrets.env" });
connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  () => console.log(`Server running on PORT ${PORT}...`)
);

initializeSocketIO(server);

// Helmet configuration to set security headers
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS configuration
const corsOptions = {
  origin: ['https://worldsamma.org', 'https://res.cloudinary.com', 'https://via.placeholder.com'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// CSP configuration
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://accounts.google.com; img-src 'self' data: https://res.cloudinary.com https://via.placeholder.com; style-src 'self' 'unsafe-inline';"
  );
  next();
});


// Routes
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

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, ".", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

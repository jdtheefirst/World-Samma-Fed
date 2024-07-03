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
const donateRouter = require("./routes/donateRouter");
const useTranslator = require("./routes/translateRouter");
const path = require("path");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { initializeSocketIO } = require("./socket");
const helmet = require("helmet");
const fs = require("fs");

dotenv.config({ path: "./secrets.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);

// Initialize Socket.IO
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
initializeSocketIO(server);

// Helmet middleware for security headers
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS configuration
const corsOptions = {
  origin: [
    'https://www.worldsamma.org',
    'https://res.cloudinary.com',
    'https://via.placeholder.com',
    'https://accounts.google.com',
    'https://www.paypal.com',
    'https://sandbox.safaricom.co.ke',
    'https://api.safaricom.co.ke',
    'https://www.googletagmanager.com',
    'https://pagead2.googlesyndication.com',
    'mail.privateemail.com',
    'http://1482.digitaldsp.com',
    'https://api.cloudinary.com',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Content Security Policy middleware
app.use((req, res, next) => {
  const nonce = "6EGEzWvXx8zfFfR8dflJ/g==";
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://www.paypal.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://accounts.google.com https://tpc.googlesyndication.com; ` +
    `img-src 'self' data: https://res.cloudinary.com https://via.placeholder.com https://pagead2.googlesyndication.com; ` +
    `style-src 'self' 'unsafe-inline'; ` +
    `frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; ` +
    `connect-src 'self' https://api.cloudinary.com https://sandbox.safaricom.co.ke https://api.safaricom.co.ke https://pagead2.googlesyndication.com;`
  );
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

// Catch-all route for handling any other request
app.use("*", (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/build/index.html");
  fs.readFile(indexPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html:", err);
      res.status(500).send("Error reading index.html");
    } else {
      res.send(data);
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);
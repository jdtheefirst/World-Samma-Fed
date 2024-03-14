const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const payRoutes = require("./routes/payRouter");
const chatRouter = require("./routes/chatRouter");
const clubRouter = require("./routes/clubsRouter");
const messageRouter = require("./routes/messageRoute");
const submitRouter = require("./routes/submitRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const bodyParser = require("body-parser");
const { initializeSocketIO } = require("./socket");

dotenv.config({ path: "./secrets.env" });
connectDB();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

initializeSocketIO(server);

app.use("/api/user", userRoutes);
app.use("/api/paycheck", payRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/clubs", clubRouter);
app.use("/api/submit", submitRouter);
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

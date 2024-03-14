const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    provincial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    national: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { versionKey: false },
  { timestamps: true }
);

chatSchema.set("toObject", { getters: true });
chatSchema.set("toJSON", { getters: true });

chatSchema.path("coach").default(null);
chatSchema.path("provincial").default(null);
chatSchema.path("national").default(null);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

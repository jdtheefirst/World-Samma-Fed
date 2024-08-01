const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, trim: true },
    isBroadcast: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  }
);
messageModel.virtual("admission", {
  ref: "User",
  localField: "sender",
  foreignField: "admission",
  justOne: true,
});
messageModel.virtual("admission", {
  ref: "User",
  localField: "recipient",
  foreignField: "admission",
  justOne: true,
});

const Message = mongoose.model("Message", messageModel);
module.exports = Message;

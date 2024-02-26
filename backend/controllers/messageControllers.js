const Message = require("../models/messageModel")

const createMessage = async (req, res) => {
  const { sender, content, userId } = req.body;

  try {
   const message = new Message({
  sender: userId,
  recipient: sender,
  content: content,
});

await message.save();

const savedMessage = await Message.findById(message._id)
  .populate({
    path: "sender",
    select: "name admission pic",
  })
  .populate({
    path: "recipient",
    select: "name admission pic",
  });

    res.json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const allMessages = async (req, res) => {
  try {
    const { userId } = req.params;
const messages = await Message.find({
  $or: [
    { sender: userId },
    { recipient: userId }
  ]
}).populate("sender admission").populate("recipient admission");


    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


module.exports = { createMessage, allMessages};

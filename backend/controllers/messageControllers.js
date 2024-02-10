const Chat = require("../models/chatModel");
const Message = require("../models/messageModel")

const createMessage = async (req, res) => {
  const { sender, content, userId } = req.body;
  console.log(sender, content, userId);

  try {
    
    const adminId = "65afe74c7d7281f61e29a329";

     let chat = await Chat.findOne({
      user: userId
    });

    if (!chat) {
      chat = new Chat({
        user: userId,
        admin: adminId,
      });
    }

    const message = new Message({
      sender: userId,
      recipient: sender,
      content: content,
      chat: chat._id,
    });
    console.log(message);

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    res.status(201).json({ message: 'Message sent successfully', newMessage: message });
    res.json()
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const allMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "Here we have it!!!")
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { recipient: userId }
      ]
    })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


module.exports = { createMessage, allMessages};

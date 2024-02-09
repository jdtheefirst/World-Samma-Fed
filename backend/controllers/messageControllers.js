const Chat = require("../models/chatModel");
const Message = require("../models/messageModel")

const createMessage = async (req, res) => {
  try {
    const { sender, content, user } = req.body;
    const adminId = "65afe4227b69cf7f766b5abe";

     let chat = await Chat.findOne({
      user: user,
      admin: adminId,
    });

    if (!chat) {
      chat = new Chat({
        user: user,
        admin: adminId,
      });
    }

    const message = new Message({
      sender: user,
      recipient: sender,
      content: content,
      chat: chat._id,
    });

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createMessage };

const Chat = require("../models/chatModel");

const createChat = async (req, res) => {
  const {userId } = req.params;
  console.log(userId, "Users Id");

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
    const savedChat = await chat.save();
    res.json(savedChat);
}catch(error){
     console.error('Error fetching or creating chat:', error);
    }
}
module.exports = {createChat}
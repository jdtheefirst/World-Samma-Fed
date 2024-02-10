const Chat = require("../models/chatModel");

const createChat = async (req, res) => {
  const {userId } = req.params;
  console.log(userId, "Users Id");

  try {
    
    const adminId = "65afe4227b69cf7f766b5abe";

     let chat = await Chat.findOne({
      user: userId
    });

    if (!chat) {
      chat = new Chat({
        user: userId,
        admin: adminId,
      });
    }
    res.json(chat);
}catch(error){
     console.error('Error fetching or creating chat:', error);
    }
}
module.exports = {createChat}
const nodemailer = require("nodemailer");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const adminId = "6693a995f6295b8bd90d9301"; 
const privateEmailPass = process.env.privateEmailPass;
const privateEmail = "support@worldsamma.org";

const createMessage = async (req, res) => {
  const { sender, content, userId } = req.body;

  try {
    if (userId === adminId) {
      // If the sender is the admin, send the message to all users
      const users = await User.find({ _id: { $ne: adminId } });
      const messages = users.map(user => ({
        sender: adminId,
        recipient: user._id,
        content: content,
        isBroadcast: true // Add a flag for broadcast messages
      }));

      await Message.insertMany(messages);

      // Send email to all users
      const userEmails = users.map(user => user.email);
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
          user: privateEmail,
          pass: privateEmailPass,
        },
      });
      const companyLogoUrl = 'https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720864475/icon.jpg';
      const mailOptions = {
        from: `World Samma Federation <${privateEmail}>`,
        bcc: userEmails,
        subject: "New Message from WSF",
        html: `
          <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
            <h4 style="color: #333;">New Message from World Samma Federation</h4>
            <img src="${companyLogoUrl}" loading="eager" alt="Company Logo" style="width: 100px; margin-bottom: 20px;">
            <p>Hello,</p>
            <p>Message: ${content}</p>
            <a style="padding: 5px; color: blue; text-decoration: none;" href="https://www.worldsamma.org/" target="_blank">Reply</a>
            <p>Stay connected and follow us on social media:</p>
            <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><a href="https://www.tiktok.com/@worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Tiktok</a></li>
            <li style="margin-bottom: 10px;"><a href="https://x.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">X</a></li>
            <li style="margin-bottom: 10px;"><a href="https://facebook.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Facebook</a></li>
            <li style="margin-bottom: 10px;"><a href="https://instagram.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Instagram</a></li>
            <li style="margin-bottom: 10px;"><a href="https://www.youtube.com/@worldsammafederation" target="_blank" style="color: #007bff; text-decoration: none;">Youtube</a></li>
          </ul>
            <p>Thank you for being a part of our community.</p>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email Sending Failed", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json({ message: "Message sent to all users and emails dispatched."});
    } else {
      // If the sender is not the admin, send the message normally
      const message = new Message({
        sender: userId,
        recipient: sender,
        content: content,
      });

      await message.save();

      // Populate sender and recipient fields for response
      const savedMessage = await Message.findById(message._id).populate({
        path: "sender",
        select: "name admission pic -password",
      })
      .populate({
        path: "recipient",
        select: "name admission pic -password",
      });

      res.json(savedMessage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const allMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    let messages;

    if (userId === adminId) {
      // Exclude broadcast messages when fetching messages for the admin
      messages = await Message.find({
        $or: [
          { sender: userId, isBroadcast: { $ne: true } },
          { recipient: userId }
        ]
      }).populate({
        path: "sender",
        select: "-password", // Exclude the 'password' field
      })
      .populate({
        path: "recipient",
        select: "-password", // Exclude the 'password' field
      });
    } else {
      // Fetch messages normally for other users
      messages = await Message.find({
        $or: [
          { sender: userId },
          { recipient: userId }
        ]
      }).populate({
        path: "sender",
        select: "-password", // Exclude the 'password' field
      })
      .populate({
        path: "recipient",
        select: "-password", // Exclude the 'password' field
      });

      // If no messages found for the user, create a default message from admin
      if (messages.length === 0) {
        const adminMessage = new Message({
          sender: adminId,
          recipient: userId,
          content: "Welcome to World Samma Federation messaging!",
        });

        const savedMessage = await adminMessage.save();

        // Populate sender and recipient fields for response
        messages = [savedMessage];
      }
    }

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { createMessage, allMessages};

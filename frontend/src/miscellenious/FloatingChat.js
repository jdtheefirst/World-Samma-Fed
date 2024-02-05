import React, { useState } from 'react';
import { Box, Input, Button, Text } from '@chakra-ui/react';

const Message = ({ sender, text, onSelect }) => (
  <Box p={2} mb={2} borderWidth="1px" borderRadius="md" onClick={onSelect}>
    <Text fontWeight="bold">{sender}</Text>
    <Text>{text}</Text>
  </Box>
);

const FloatingChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', text: 'Welcome to the chat!' },
    { id: 2, sender: 'Coach', text: 'How can we assist you today?' },
    // Add more messages as needed
  ]);

  const [replyTo, setReplyTo] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectMessage = (message) => {
    // Set the selected message as the one to reply to
    setReplyTo(message);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return; // Prevent sending empty messages
    }

    const sender = 'User'; // For simplicity, you can set the sender as the user
    const updatedMessages = [...messages, { id: messages.length + 1, sender, text: newMessage }];

    setMessages(updatedMessages);
    setNewMessage('');
    setReplyTo(null);
  };

  return (
    <Box position="fixed" bottom="0" right="0" width="300px" borderLeft="1px" borderColor="gray.300">
      {messages.map((message) => (
        <Message
          key={message.id}
          sender={message.sender}
          text={message.text}
          onSelect={() => handleSelectMessage(message)}
        />
      ))}
      <Box p={2}>
        {replyTo && (
          <Text>
            Replying to: {replyTo.sender} - {replyTo.text}
          </Text>
        )}
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} mt={2}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default FloatingChat;

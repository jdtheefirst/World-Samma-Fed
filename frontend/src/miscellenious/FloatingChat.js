import React, { useState } from 'react';
import { Box, Input, Button, Text,useToast } from '@chakra-ui/react';

const Message = ({ sender, text, onSelect }) => (
  <Box p={2} mb={2} borderWidth="1px" borderRadius="md" onClick={onSelect}>
    <Text fontWeight="bold">{sender}</Text>
    <Text>{text}</Text>
  </Box>
);

const FloatingChat = () => {
  const toast = useToast();

  const [replyTo, setReplyTo] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatOptions, setChatOptions] = useState(['Admin', 'Couch', 'Provincial Coach', 'National Coach']);
  const [selectedChatOption, setSelectedChatOption] = useState(null);


  const handleSelectMessage = (message) => {
    // Set the selected message as the one to reply to
    setReplyTo(message);
  };

 const sendMessage = async (event) => {
  if (!selectedChatOption) {
    toast({
      title: 'Select a recipient',
      description: 'Please choose whom you want to chat with.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    return;
  }

};

  return (
    <Box position="fixed" bottom="0" right="0" width="300px" borderLeft="1px" borderColor="gray.300">
      <Box p={2}>
       {!selectedChatOption && (
    <Box>
    <Text>Select whom you want to chat with:</Text>
    {chatOptions.map((option) => (
      <Button key={option} onClick={() => setSelectedChatOption(option)}>
        {option}
      </Button>
    ))}
    </Box>
     )} 
     
     <Box>{selectedChatOption && (
  <Text>
    Chatting with {selectedChatOption}
  </Text>
)}
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage} mt={2}>
          Send
        </Button></Box>
      </Box>
    </Box>
  );
};

export default FloatingChat;

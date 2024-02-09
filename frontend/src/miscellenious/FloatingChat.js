import React, { useEffect, useState, useCallback } from 'react';
import { Box, Input, Button, Text,useToast, IconButton, Image } from '@chakra-ui/react';
import ScrollableChat from './ScrollableChat';
import { ChatState } from '../components/Context/ChatProvider';
import {getUserById} from "../components/config/chatlogics"
import axios from 'axios';

const FloatingChat = () => {
  const toast = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [chatOptions, setChatOptions] = useState(['Admin', 'Couch', 'Provincial Coach', 'National Coach']);
  const [selectedChatOption, setSelectedChatOption] = useState(null);
  const [messages, setMessages] = useState('')
  const [loading, setLoading] = useState();
  const {user} = ChatState();
 
  const fetchMessages = useCallback(async () => {
         if(!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${user._id}`,
        config
      );

      const userDataCache = new Map();

      const resolvedMessages = await Promise.allSettled(
        data.map(async (message) => {
          const senderId = message.sender._id;

          let sender = userDataCache.get(senderId);

          if (!sender) {
            try {
              sender = await getUserById(senderId, user.token);

              userDataCache.set(senderId, sender);
            } catch (error) {
              console.error(error);
            }
          }
          return {
            ...message,
            sender,
          };
        })
      );

      const resolvedValues = resolvedMessages
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      setMessages(resolvedValues);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, [toast, user]);

    useEffect(() => {
    fetchMessages();

  }, [fetchMessages]);

 const sendMessage = async (event) => {
  if ((event && event.key === "Enter") || !event) {
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
   try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };

          setNewMessage("");
          const { data } = await axios.post(
            "/api/message",
            { sender: selectedChatOption,
              content: newMessage,
              user,
            },
            config
          );

          // socket.emit("new message", data);
          setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
          toast({
            title: "Failed to send the Message",
            description: "Please try again after some time",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }


  }
  


};

  return (
  <Box position="fixed" bottom="0" right="1" height={"50vh"} width="350px" border="1px solid #d80eeb" background={"Background"} borderRadius={4}>
    <Box p={2} top="0" left="0" height="100%" display="flex" flexDir="column" justifyContent="center">
      {!selectedChatOption && (
        <Box display={"flex"} flexDir={"column"}>
          <Text>Select whom you want to chat with:</Text>
          {chatOptions.map((option) => (
            <Button key={option} onClick={() => setSelectedChatOption(option)}>
              {option}
            </Button>
          ))}
        </Box>
      )} 
      <ScrollableChat messages={messages}/>
      <Text display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>Messages</Text>
      <Box position="absolute" bottom={0} width="100%">
        {selectedChatOption && (
          <Text>
            Chatting with {selectedChatOption}
          </Text>
        )}
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"96%"}>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
         <IconButton onClick={sendMessage} p={0} m={1}>
    <Image src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1707479527/icons8-send-24_higtsx.png" />
  </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>
);
};

export default FloatingChat;

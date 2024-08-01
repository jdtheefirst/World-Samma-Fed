<<<<<<< HEAD
import ScrollableFeed from "react-scrollable-feed";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";
=======
import React from "react";
import { Box } from "@chakra-ui/react";
>>>>>>> master
import { ChatState } from "../components/Context/ChatProvider";
import Message from "./Message";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
<<<<<<< HEAD
    <ScrollableFeed height={"100%"}>
      <VStack align="start" spacing={4} p={4} maxH="95%" overflowY="auto">
        {messages.map((m, i) => {
=======
    <div style={{ width: '100%', height: '90%', overflowY: 'auto' }}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexDir="column" 
        background="white"  
        p={4} 
        mb={"10"}
        width="100%"
      >
        {messages.map((m, index) => {
>>>>>>> master
          if (!m && !user) {
            return null;
          }

          const isUserMessage = m.sender?._id === user._id;

          return (
            <Box
              bg={isUserMessage ? "#BEE3F8" : "#B9F5D0"}
              borderRadius="20px"
              p="5px 15px"
<<<<<<< HEAD
              maxW="75%"
              alignSelf={isUserMessage ? "flex-end" : "flex-start"}
              key={m._id}
=======
              mb={"2"}
              maxW="75%"
              alignSelf={isUserMessage ? "flex-end" : "flex-start"}
              key={index}
>>>>>>> master
            >
              <Message m={m} />
            </Box>
          );
        })}
<<<<<<< HEAD
      </VStack>
    </ScrollableFeed>
=======
      </Box>
    </div>
>>>>>>> master
  );
};

export default ScrollableChat;

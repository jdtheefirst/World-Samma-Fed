import React from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import Message from "./Message";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <div style={{ width: '100%', height: '90%', overflowY: 'auto' }}>
      <Box 
        display="flex" 
        justifyContent="start" 
        alignItems="center" 
        flexDir="column" 
        background="white"  
        minH={"100vh"}
        p={4} 
        mb={"10"}
        width="100%"
      >
        {messages.map((m, index) => {
          if (!m && !user) {
            return null;
          }

          const isUserMessage = m.sender?._id === user._id;

          return (
            <Box
              bg={isUserMessage ? "#BEE3F8" : "#B9F5D0"}
              borderRadius="20px"
              p="5px 15px"
              mb={"2"}
              maxW="75%"
              alignSelf={isUserMessage ? "flex-end" : "flex-start"}
              key={index}
            >
              <Message m={m} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default ScrollableChat;

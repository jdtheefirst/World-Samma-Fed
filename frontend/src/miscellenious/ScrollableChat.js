import ScrollableFeed from "react-scrollable-feed";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import Message from "./Message";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed height={"100%"}>
      <VStack align="start" spacing={4} p={4} maxH="95%" overflowY="auto">
        {messages.map((m, i) => {
          if (!m && !user) {
            return null;
          }

          const isUserMessage = m.sender?._id === user._id;

          return (
            <Box
              bg={isUserMessage ? "#BEE3F8" : "#B9F5D0"}
              borderRadius="20px"
              p="5px 15px"
              maxW="75%"
              alignSelf={isUserMessage ? "flex-end" : "flex-start"}
              key={m._id}
            >
              <Message m={m} />
            </Box>
          );
        })}
      </VStack>
    </ScrollableFeed>
  );
};

export default ScrollableChat;

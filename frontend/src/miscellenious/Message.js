// Message.js
import React, { useState } from "react";
import { ChatState } from "../components/Context/ChatProvider";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import axios from "axios";

function Message({ m }) {
  const [showDeleteText, setShowDeleteText] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { user } = ChatState();

 const formatMessageTime = (timestamp) => {
    const messageTime = new Date(timestamp);
    const currentTime = new Date();

    const timeDifference = currentTime - messageTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return 'Just now';
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };
        return messageTime.toLocaleDateString('en-US', options);
    }
};
  const onDeleteMessage = async (messageId) => {
    if (!messageId) {
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/message/${messageId}`, config);
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {deleted ? (
        <Text
          display={"flex"}
          justifyContent={"space-between"}
          fontFamily={"cursive"}
          textDecoration={"underline"}
          colorScheme="grey"
        >
          <Image
            src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1699434297/icons8-unavailable-40_xh1ham.png"
            height={7}
            p={1}
          />
          deleted
        </Text>
      ) : (
        <Box
          display={deleted ? "none" : "flex"}
          flexDir={"column"}
          position={"relative"}
          onClick={() => setShowDeleteText(true)}
          onMouseLeave={() => setShowDeleteText(false)}
          fontSize={"small"}
        >
          {showDeleteText && m.sender._id === user._id && (
            <Button
              onClick={() => {
                onDeleteMessage(m._id);
                setDeleted(true);
              }}
              position={"absolute"}
              left={-10}
              p={3}
              top={-5}
              borderRadius={10}
            >
              delete
            </Button>
          )}

          <Text fontWeight="bold">
            {m.sender._id === user._id ? "You" : m.sender.name}
          </Text>

          {m.content}

          <Text display={"flex"} textAlign="right" m={0} p={0} fontSize={"2xs"}>
            {m.sender._id === user._id ? (
              <Image
                src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1699355257/icons8-sent-64_e9vrai.png"
                height={5}
                p={0}
                loading="lazy"
                m={0}
              />
            ) : (
              ""
            )}
            {formatMessageTime(m.createdAt)}
          </Text>
        </Box>
      )}
    </>
  );
}

export default Message;

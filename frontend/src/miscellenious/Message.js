// Message.js
import React from "react";
import { ChatState } from "../components/Context/ChatProvider";
import { Box, Image, Text } from "@chakra-ui/react";

function Message({ m }) {
  const { user, setSelectedChat, setSend} = ChatState();

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
  const handleClick = () => {
    if (m.sender?._id !== user._id) {
      setSelectedChat(m.sender?._id);
      setSend(m.sender?.name)
    }
  };


  return (
    <>
        <Box
          display={"flex"}
          flexDir={"column"}
          position={"relative"}
          fontSize={"small"}
          onClick={handleClick}
        >
          <Text fontSize={"smaller"} textDecor={"underline"} textAlign={"end"}>
            {m.sender?._id === user._id ? `You to ${m.recipient?.name}` : <Text>{m.sender?.name} -{m.sender?.admission}</Text>}
          </Text>

          {m.content}

          <Text display={"flex"} textAlign="right" m={0} p={0} fontSize={"2xs"}>
            {m.sender?._id === user._id ? (
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
    </>
  );
}

export default Message;

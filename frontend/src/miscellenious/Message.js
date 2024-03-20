// Message.js
import React from "react";
import { ChatState } from "../components/Context/ChatProvider";
import { Box, Image, Text } from "@chakra-ui/react";
import formatMessageTime from "../components/config/formatTime";

function Message({ m }) {
  const { user, setSelectedChat, setSend } = ChatState();

  const handleClick = () => {
    if (m.sender?._id !== user._id) {
      setSelectedChat(m.sender?._id);
      setSend(m.sender?.name);
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
          {m.sender?._id === user._id ? (
            `You to ${m.recipient?.name}`
          ) : (
            <Text>
              {m.sender?.name} -{m.sender?.admission}
            </Text>
          )}
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

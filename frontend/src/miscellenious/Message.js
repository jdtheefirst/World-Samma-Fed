// Message.js
import React from "react";
import { ChatState } from "../components/Context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import formatMessageTime from "../components/config/formatTime";
import { BsSendCheck } from "react-icons/bs";
import { LuBadgeCheck } from "react-icons/lu";

function Message({ m }) {
  const { user, setSelectedChat, setSend } = ChatState();
  const adminId = "6693a995f6295b8bd90d9301"; 
  const userId = user?._id;
  const handleClick = () => {
    if (m.sender?._id !== userId) {
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
        <Box fontSize={"smaller"} textDecor={"underline"} textAlign={"end"}>
        {m.sender?._id === adminId && userId !== adminId && <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} width={"100%"}>From:{'\u00A0'}<Box display={"flex"}><Text fontSize={"bold"}>WSF</Text><LuBadgeCheck style={{color: "blue"}} /></Box></Box>}
        {m.sender?._id === userId && m.recipient?._id === adminId && <Box display={"flex"} >Sent to{'\u00A0'}WSF<LuBadgeCheck style={{color: "blue"}} /></Box>}
        {m.sender?._id !== adminId && <Text >From{'\u00A0'}{m.sender?.name}</Text>}
        {m.sender?._id === adminId && <Text >Sent to{'\u00A0'}{m.recipient?.name}</Text>}
        </Box>

        {m.content}

        <Text display={"flex"} textAlign="right" m={0} p={0} fontSize={"2xs"}>
          {m.sender?._id === user._id ? (
            <BsSendCheck />
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

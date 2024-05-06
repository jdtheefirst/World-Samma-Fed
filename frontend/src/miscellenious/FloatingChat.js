import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  useToast,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConnectSocket } from "../components/config/chatlogics";

const FloatingChat = ({ onClose }) => {
  const toast = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [chatOptions, setChatOptions] = useState([
    "WSF",
    "Coach",
    "Provincial Coach",
    "National Coach",
  ]);
  const [selectedChatOption, setSelectedChatOption] = useState(null);
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState();
  const [rank, setRank] = useState(false);
  const {
    user,
    selectedChat,
    setSelectedChat,
    send,
    setSend,
    messages,
    setMessages,
    national,
    province,
  } = ChatState();
  const navigate = useNavigate();

  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    if (
      user?.admin ||
      user?.coach ||
      province?.provincialCoach._id === user?._id ||
      national?.nationalCoach._id === user?._id
    ) {
      setRank(true);
    }
  }, [user, national, province, setRank]);

  useEffect(() => {
    if (selectedChatOption === "Coach" && !user?.physicalCoach) {
      navigate("/clubs");
      toast({
        title: "You've not joined a Club",
        description: "Join a club or make one as you'd please",
        status: "info",
        duration: 5000,
        position: "bottom-left",
      });
    } else if (selectedChatOption === "Provincial Coach" && !province) {
      navigate("/province");
      toast({
        title: "Provincial Samma Association seat is empty!",
        description: "Apply for Interim",
        status: "info",
        duration: 5000,
        position: "bottom-left",
      });
    } else if (selectedChatOption === "National Coach" && !national) {
      navigate("/national");
      toast({
        title: "National Samma Association seat is empty!",
        description: "Apply for Interim",
        status: "info",
        duration: 5000,
        position: "bottom-left",
      });
    }
  }, [selectedChatOption, navigate, user, national, province, toast]);

  const fetchMessages = useCallback(async () => {
    if (!user) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/message/${user._id}`, config);

      setMessages(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

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

  useEffect(() => {
    if (selectedChatOption === "Coach") {
      setSender(user.physicalCoach);
    } else if (selectedChatOption === "WSF" && user) {
      setSender(user.wsf);
    } else if (selectedChatOption === "Provincial Coach" && province) {
      setSender(province.provincialCoach._id);
    } else if (selectedChatOption === "National Coach" && national) {
      setSender(national.nationalCoach._id);
    }
  }, [selectedChatOption, national, province, user, setSender]);

  useEffect(() => {
    if (selectedChat) {
      setSender(selectedChat);
    }
  }, [selectedChat, setSender]);

  const sendMessage = async (event) => {
    if ((event && event.key === "Enter") || !event) {
      if (!selectedChatOption && !rank) {
        toast({
          title: "Select a recipient",
          description: "Please choose whom you want to chat with.",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if (rank && !selectedChat) {
        toast({
          title: "Select a recipient",
          description: "Please choose whom you want to reply to.",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      try {
        const userId = user._id;
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { sender: sender, content: newMessage, userId },
          config
        );

        setMessages((prevMessages) => [...prevMessages, data]);

        socket.emit("new message", data);
      } catch (error) {
        console.log(error);
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
  const handleChatClose = () => {
    onClose();
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      position="fixed"
      bottom="0"
      right="1"
      height={"90vh"}
      width={{ base: "95%", lg: "450px" }}
      background={"white"}
      borderRadius={4}
      boxShadow="dark-lg"
      p="6"
      rounded="md"
      bg="white"
    >
      <Button p={2} onClick={handleChatClose}>
        X
      </Button>
      <Box
        p={2}
        top="0"
        left="0"
        height="95%"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        {!selectedChatOption && !rank && (
          <Box display={"flex"} flexDir={"column"} bg="transparent">
            <Text>Select whom you want to chat with:</Text>
            {chatOptions.map((option) => (
              <Button
                key={option}
                bg="transparent"
                onClick={() => setSelectedChatOption(option)}
              >
                {option}
              </Button>
            ))}
          </Box>
        )}
        {loading ? (
          <Spinner size={"lg"} />
        ) : (
          <ScrollableChat messages={messages} />
        )}
        <Box position="absolute" bottom={0} width="100%">
          {rank && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              Replying to {selectedChat ? send : "(select a message please)"}
              {selectedChat && (
                <Button
                  onClick={() => {
                    setSelectedChat(null);
                    setSend(null);
                  }}
                  background={"transparent"}
                  textColor={"red"}
                >
                  X
                </Button>
              )}
            </Box>
          )}

          {selectedChatOption && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              Chatting with {selectedChatOption}
              <Button
                onClick={() => setSelectedChatOption(null)}
                background={"transparent"}
                textColor={"red"}
              >
                X
              </Button>
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"90%"}
            background={"white"}
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton onClick={() => sendMessage()} p={0} m={1}>
              <Image src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1707479527/icons8-send-24_higtsx.png" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingChat;

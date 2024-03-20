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
    "Admin",
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
    setChat,
    chat,
    selectedChat,
    setSelectedChat,
    send,
    setSend,
    messages,
    setMessages,
  } = ChatState();
  const navigate = useNavigate();

  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    if (
      chat &&
      (chat.admin === user._id ||
        chat.coach === user._id ||
        chat.provincial === user._id ||
        chat.national === user._id)
    ) {
      setRank(true);
    }
  }, [user._id, chat]);

  useEffect(() => {
    if (selectedChatOption === "Coach" && !chat?.coach) {
      navigate("/clubs");
    } else if (selectedChatOption === "Provincial Coach" && !chat?.provincial) {
      navigate("/provincial");
    } else if (selectedChatOption === "National Coach" && !chat?.national) {
      navigate("/national");
    }
  }, [selectedChatOption, chat, navigate]);

  const fetchOrCreateChat = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/chat/${user._id}`, config);
      setChat(data);
    } catch (error) {
      console.error("Error fetching or creating chat:", error);
    }
  }, [user.token, user._id, setChat]);

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
    fetchOrCreateChat();
  }, [fetchOrCreateChat]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (selectedChatOption === "Coach") {
      setSender(user.physicalCoach);
    } else if (selectedChatOption === "Admin" && chat && chat.admin) {
      setSender(chat.admin);
    } else if (
      selectedChatOption === "Provincial Coach" &&
      chat &&
      chat.provincial
    ) {
      setSender(chat.provincial);
    } else if (
      selectedChatOption === "National Coach" &&
      chat &&
      chat.national
    ) {
      setSender(chat.national);
    }
  }, [selectedChatOption, user.physicalCoach, chat]);

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
      width={{ base: "95%", lg: "350px" }}
      border="1px solid #d80eeb"
      background={"Background"}
      borderRadius={4}
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
              >
                X
              </Button>
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"96%"}
            background={"Background"}
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

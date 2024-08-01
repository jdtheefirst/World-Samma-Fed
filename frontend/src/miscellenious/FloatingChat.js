import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  useToast,
  IconButton,
<<<<<<< HEAD
  Image,
=======
>>>>>>> master
  Spinner,
} from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConnectSocket } from "../components/config/chatlogics";
<<<<<<< HEAD
=======
import { IoIosSend } from "react-icons/io";
>>>>>>> master

const FloatingChat = ({ onClose }) => {
  const toast = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [chatOptions, setChatOptions] = useState([
<<<<<<< HEAD
    "Admin",
=======
    "WSF",
>>>>>>> master
    "Coach",
    "Provincial Coach",
    "National Coach",
  ]);
  const [selectedChatOption, setSelectedChatOption] = useState(null);
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState();
  const [rank, setRank] = useState(false);
<<<<<<< HEAD
  const {
    user,
    setChat,
    chat,
=======
  const [sending, setSending] = useState(false);
  const {
    user,
>>>>>>> master
    selectedChat,
    setSelectedChat,
    send,
    setSend,
    messages,
    setMessages,
<<<<<<< HEAD
  } = ChatState();
  const navigate = useNavigate();

=======
    national,
    province,
  } = ChatState();
  const navigate = useNavigate();
  const adminId = "6693a995f6295b8bd90d9301";
>>>>>>> master
  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    if (
<<<<<<< HEAD
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
=======
      user?._id === adminId ||
      user?.coach ||
      province?.provincialCoach._id === user?._id ||
      national?.nationalCoach._id === user?._id
    ) {
      setRank(true);
    }
  }, [user, national, province, setRank]);

  useEffect(() => {
    if (user.provinces === undefined) {
      setChatOptions((prevOptions) =>
        prevOptions.filter((option) => option !== "Provincial Coach")
      );
    }
  }, [user.provinces]);

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
      setSelectedChatOption(null)
      return;
    } else if (selectedChatOption === "Provincial Coach" && !province) {
      setSelectedChatOption(null)
      navigate("/province");
      toast({
        title: "Provincial Samma Association seat is empty!",
        description: "Apply for Interim",
        status: "info",
        duration: 5000,
        position: "bottom-left",
      });
      return
    } else if (selectedChatOption === "National Coach" && !national) {
      setSelectedChatOption(null)
      navigate("/national");
      toast({
        title: "National Samma Association seat is empty!",
        description: "Apply for Interim",
        status: "info",
        duration: 5000,
        position: "bottom-left",
      });
      return;
    }
  }, [selectedChatOption, navigate, user, national, province, toast]);
>>>>>>> master

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
<<<<<<< HEAD
    fetchOrCreateChat();
  }, [fetchOrCreateChat]);

  useEffect(() => {
=======
>>>>>>> master
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (selectedChatOption === "Coach") {
      setSender(user.physicalCoach);
<<<<<<< HEAD
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
=======
    } else if (selectedChatOption === "WSF" && user) {
      setSender(user.wsf);
    } else if (selectedChatOption === "Provincial Coach" && province) {
      setSender(province.provincialCoach._id);
    } else if (selectedChatOption === "National Coach" && national) {
      setSender(national.nationalCoach._id);
    }
  }, [selectedChatOption, national, province, user, setSender]);
>>>>>>> master

  useEffect(() => {
    if (selectedChat) {
      setSender(selectedChat);
    }
  }, [selectedChat, setSender]);

  const sendMessage = async (event) => {
<<<<<<< HEAD
    if ((event && event.key === "Enter") || !event) {
=======
    if ((event && event.type === "click") || (event && event.key === "Enter")) {
      setSending(true);
      const userId = user._id;
  
>>>>>>> master
      if (!selectedChatOption && !rank) {
        toast({
          title: "Select a recipient",
          description: "Please choose whom you want to chat with.",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
<<<<<<< HEAD
        return;
      }
      if (rank && !selectedChat) {
        toast({
          title: "Select a recipient",
          description: "Please choose whom you want to reply to.",
=======
        setSending(false);
        return;
      }
  
      if (rank && !selectedChat && userId !== adminId) {
        toast({
          title: "Select a recipient!",
          description: "Please choose whom you want to reply to...",
>>>>>>> master
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
<<<<<<< HEAD
        return;
      }

      try {
        const userId = user._id;
=======
        setSending(false);
        return;
      }
  
      try {
>>>>>>> master
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
<<<<<<< HEAD
        setNewMessage("");
=======
  
        // Send message to backend
>>>>>>> master
        const { data } = await axios.post(
          "/api/message",
          { sender: sender, content: newMessage, userId },
          config
        );
<<<<<<< HEAD

        setMessages((prevMessages) => [...prevMessages, data]);

        socket.emit("new message", data);
      } catch (error) {
        console.log(error);
=======
  
        // Update messages state based on sender
        if (userId === adminId) {
          // If admin, construct the new message object
          const newMessageObj = {
            content: newMessage.trim(),
            createdAt: new Date(),
            recipient: { WSF: null, _id: '65c7549721abc4f629ae5009', name: 'Broadcast', otherName: 'Ngatia', email: 'josephmpesa23@gmail.com' },
            sender: { _id: '6693a995f6295b8bd90d9301', name: 'j', otherName: 'e', email: 'almanobe2@gmail.com' },
            updatedAt: "2024-07-01T16:26:45.964Z",
            __v: 0,
            _id: "6682d8c501209935692efb9e"
          };
  
          // Update messages state with the new message object
          setMessages(prevMessages => [...prevMessages, newMessageObj]);
        } else {
          // If regular user, update messages state with the response data
          setMessages(prevMessages => [...prevMessages, data]);
          socket.emit("new message", data);
        }
  
        // Clear input and reset sending state
        setSending(false);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        setSending(false);
>>>>>>> master
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
<<<<<<< HEAD
  };
=======
  };  
  
>>>>>>> master
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
<<<<<<< HEAD
      width={{ base: "95%", lg: "350px" }}
      border="1px solid #d80eeb"
      background={"Background"}
      borderRadius={4}
    >
      <Button p={2} onClick={handleChatClose}>
=======
      width={{base: "100%", md: "60%"}}
      borderRadius={4}
      boxShadow="dark-lg"
      p="2"
      rounded="md"
      bg="white"
      zIndex={11}
    >
      <Button p={2} onClick={handleChatClose} border={"none"}>
>>>>>>> master
        X
      </Button>
      <Box
        p={2}
        top="0"
        left="0"
<<<<<<< HEAD
        height="95%"
        display="flex"
        flexDir="column"
        justifyContent="center"
=======
        height="90%"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems={"center"}
        width={"100%"}
        background={"whitesmoke"}
        
>>>>>>> master
      >
        {!selectedChatOption && !rank && (
          <Box display={"flex"} flexDir={"column"} bg="transparent">
            <Text>Select whom you want to chat with:</Text>
            {chatOptions.map((option) => (
              <Button
                key={option}
                bg="transparent"
                onClick={() => setSelectedChatOption(option)}
<<<<<<< HEAD
=======
                border={"none"}
                p={'2'}
>>>>>>> master
              >
                {option}
              </Button>
            ))}
          </Box>
        )}
        {loading ? (
<<<<<<< HEAD
          <Spinner size={"lg"} />
        ) : (
          <ScrollableChat messages={messages} />
=======
          <Spinner speed='0.65s' size={"xl"} />
        ) : (
         <ScrollableChat messages={messages} />
>>>>>>> master
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
<<<<<<< HEAD
=======
                  textColor={"red"}
                  border={"none"}
>>>>>>> master
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
<<<<<<< HEAD
=======
                textColor={"red"}
                border={"none"}
>>>>>>> master
              >
                X
              </Button>
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
<<<<<<< HEAD
            width={"96%"}
            background={"Background"}
=======
            width={"100%"}
            background={"white"}
            p={2}
>>>>>>> master
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
<<<<<<< HEAD
            <IconButton onClick={() => sendMessage()} p={0} m={1}>
              <Image src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1707479527/icons8-send-24_higtsx.png" />
=======
            <IconButton isLoading={sending} border={"none"} onClick={(event) => sendMessage(event)} p={0} m={1}>
            <IoIosSend/>
>>>>>>> master
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingChat;

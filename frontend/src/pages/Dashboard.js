import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { Box, Button, IconButton, Image } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import Progress from "../miscellenious/Progress";
import MyPrograms from "../miscellenious/Myprograms";
import FloatingChat from "../miscellenious/FloatingChat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import axios from "axios";
import chat from "../chat.png";

export const Dashboard = ({ courses }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { user, setUser, setClub, setMessages, notification, setNotification } =
    ChatState();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
      return;
    } else {
      setUser(userInfo);
    }
  }, [setUser, navigate]);

  const socket = useConnectSocket(user?.token);

  const requestClub = useCallback(async () => {
    if (!user.coach) {
      console.log("I have no Club");
      return;
    }

    try {
      const clubId = user.coach;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/clubs/${clubId}`, config);
      setClub(data);
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub]);

  useEffect(() => {
    if (!socket) {
      console.log("Socket not connected");
      return;
    }
    const showNotification = (title, options) => {
      if (Notification.permission === "granted") {
        new Notification(title, options);
        const audio = new Audio(
          "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        );
        audio.addEventListener("error", (error) => {
          console.error("Audio playback error:", error);
        });

        audio.play().catch((error) => {
          console.error("Audio playback error:", error);
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
            const audio = new Audio(
              "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
            );
            audio.addEventListener("error", (error) => {
              console.error("Audio playback error:", error);
            });

            audio.play().catch((error) => {
              console.error("Audio playback error:", error);
            });
          }
        });
      }
    };

    socket.on("message received", (newMessageReceived) => {
      setNotification([newMessageReceived, ...notification]);
      showNotification(
        "New Message",
        {
          body: `New message from ${newMessageReceived.sender.name}`,
          icon: `${newMessageReceived.sender.pic}`,
        },
        () => {
          navigate("/dashboard");
        }
      );
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    });

    socket.on("updates", (clubRequests) => {
      setUser((prevUser) => ({
        ...prevUser,
        clubRequests: clubRequests.clubRequests,
      }));
    });

    return () => {
      socket.off("newConnection");
      socket.off("message received");
    };
  }, [socket, setUser, user?.token, user]);

  useEffect(() => {
    if (user) {
      requestClub();
    }
  }, [user]);

  return (
    <Box
      width="100%"
      height={"100%"}
      background={"Background"}
      position={"relative"}
    >
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box
          position={"fixed"}
          background={"Background"}
          zIndex={10}
          width="100%"
        >
          <UpperNav />
        </Box>
        <Box mt={20}>
          <Progress userBelt={"Visitor"} />
        </Box>
        <MyPrograms courses={courses} />
        {chatOpen && <FloatingChat onClose={() => setChatOpen(false)} />}
        <IconButton
          display={chatOpen ? "none" : "flex"}
          position="fixed"
          bottom={0}
          right={10}
          icon={
            <Image
              src={chat}
              alt="Chat"
              width={isHovered ? "60px" : "40px"}
              transition="width 0.3s ease-in-out"
            />
          }
          backgroundColor="white"
          _hover={{ backgroundColor: "white" }}
          onClick={() => setChatOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          borderRadius={20}
        />
      </ErrorBoundary>
    </Box>
  );
};

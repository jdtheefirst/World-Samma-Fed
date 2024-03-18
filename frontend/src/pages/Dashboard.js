import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { Box, Button, IconButton, Image, useToast } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import Progress from "../miscellenious/Progress";
import MyPrograms from "../miscellenious/Myprograms";
import FloatingChat from "../miscellenious/FloatingChat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import chat from "../chat.png";
import axiosInstance from "../components/config/axios";

export const Dashboard = ({ courses }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { user, setUser, setClub, setMessages, notification, setNotification } =
    ChatState();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [live, setLive] = useState([]);
  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
      return;
    } else {
      setUser(userInfo);
    }
  }, [setUser, navigate]);

  const requestClub = useCallback(async () => {
    if (!user.coach) {
      return;
    }

    try {
      const clubId = user.coach;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosInstance
        .get(`/api/clubs/${clubId}`, config)
        .then(async (response) => {
          setClub(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast({
              title: "Your session has expired",
              description: "Logging out in less than 8 seconds",
              duration: 8000,
              status: "loading",
              position: "bottom",
            });

            setTimeout(() => {
              localStorage.removeItem("userInfo");
              navigate("/");
            }, 8000);
          }
        });
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub]);

  useEffect(() => {
    if (!socket) {
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
    socket.on("liveSessionStarted", (clubName) => {
      setLive((prev) => ({ ...prev, clubName }));
    });

    socket.on("certificates", (certificates) => {
      setUser((prev) => ({ ...prev, certificates: certificates }));
    });

    return () => {
      socket.off("updates");
      socket.off("liveSessionStarted");
      socket.off("message received");
      socket.off("certificates");
    };
  }, [socket, setUser, user?.token, user]);

  useEffect(() => {
    if (user) {
      requestClub();
    }
  }, [user]);

  return (
    <Box width="100%" height="100%" background="white" position="relative">
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect="none">
        <Box position="fixed" background="Background" zIndex={10} width="100%">
          <UpperNav />
        </Box>
        <Box mt={20}>
          <Progress userBelt={"Visitor"} />
        </Box>
        <MyPrograms courses={courses} user={user} />
        {chatOpen && <FloatingChat onClose={() => setChatOpen(false)} />}
        {live.length > 0 && (
          <Box
            position="fixed"
            top={90}
            right={50}
            borderRadius={20}
            border={"1px solid #d24ce0"}
          >
            {!show && (
              <Button
                backgroundColor="white"
                _hover={{ backgroundColor: "white" }}
                onClick={() => setShow(true)}
                width={"100%"}
                border={"1px solid #d24ce0"}
                borderRadius={20}
              >
                Live Clubs{"   "}
                <Image
                  src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1709910225/icons8-live-video-on_kr3qci.gif"
                  height={6}
                />
              </Button>
            )}
            {show &&
              live.map((liveItem) => (
                <Button
                  key={liveItem._id}
                  textAlign={"center"}
                  width={"100%"}
                  backgroundColor="white"
                  _hover={{ backgroundColor: "white" }}
                  onClick={() => {
                    setLive((prevLive) =>
                      prevLive.filter((n) => n !== liveItem)
                    );
                    navigate(`/showclub/${liveItem._id}/${true}`);
                    setShow(false);
                  }}
                  borderRadius={20}
                >
                  {`${liveItem.name} are live...`}
                </Button>
              ))}
          </Box>
        )}

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

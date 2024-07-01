import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { Box, Button, IconButton, useToast } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import Progress from "../miscellenious/Progress";
import MyPrograms from "../miscellenious/Myprograms";
import FloatingChat from "../miscellenious/FloatingChat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import axiosInstance from "../components/config/axios";
import axios from "axios";
import AdComponent from "../components/Ads";
import { MdOutlineFiberSmartRecord, MdOutlineMarkUnreadChatAlt } from "react-icons/md";

const Dashboard = ({ courses }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const {
    user,
    setUser,
    setClub,
    setMessages,
    notification,
    setNotification,
    setNational,
    setProvince,
  } = ChatState();
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
    if (!user?.coach) {
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

    socket.on("updates", (requests) => {
      setUser((prevUser) => ({
        ...prevUser,
        belt: requests.belt,
        clubRequests: requests.clubRequests,
        provinceRequests: requests.provinceRequests,
        nationalRequests: requests.nationalRequests,
      }));
    });
    socket.on("provincial request", (request) => {
      setUser((prevUser) => ({
        ...prevUser,
        provinceRequests: [
          ...prevUser.provinceRequests,
          request.provincialCoach,
        ],
      }));
    });
    socket.on("national request", (request) => {
      setUser((prevUser) => ({
        ...prevUser,
        provinceRequests: [...prevUser.nationalRequests, request.nationalCoach],
      }));
    });

    socket.on("liveSessionStarted", (clubName) => {
      setLive((prev) => ({ ...prev, clubName }));
    });

    socket.on("certificates", (certificates) => {
      setUser((prev) => ({
        ...prev,
        certificates: certificates.certificates,
        belt: certificates.belt,
      }));
    });

    return () => {
      socket.off("updates");
      socket.off("provincial request");
      socket.off("liveSessionStarted");
      socket.off("message received");
      socket.off("certificates");
    };
  }, [socket, setUser, user?.token, user]);

  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      axiosInstance
        .get(
          `/api/province/officials/${user.country}/${user.provinces}`,
          config
        )
        .then(async (response) => {
          if (response.data.length === 0) {
          } else {
            setProvince(data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast({
              title: "Your session has expired",
              description: "Logging out in 8 seconds",
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
      console.log(error);
    }
    try {
      const { data } = await axios.get(
        `/api/national/officials/${user.country}/${user.provinces}`,
        config
      );

      if (data.length === 0) {
      } else {
        setNational(data);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An Error Occurred!",
        description: "Try again after sometime.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [user, setNational, toast, setProvince]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
    requestClub();
  }, [fetchClubs, navigate, user]);

  return (
    <ErrorBoundary fallback={<p style={{color: "white"}}>Something went wrong</p>} userSelect="none">
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"} width="100%"background="white" position="relative">

        <Box position="fixed" background="Background" zIndex={10} width="100%">
          <UpperNav />
        </Box>
        <Box width={"100%"} mt={{base: "58rem", md: "70rem"}}>
          <Progress userBelt={user?.belt} />
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
                Live Clubs{'\u00A0'}
                <MdOutlineFiberSmartRecord style={{fontSize: "30px"}}/>
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
          bottom={10}
          right={10}
          icon={
            <MdOutlineMarkUnreadChatAlt style={{width: isHovered ? "60px" : "40px",
            transition: "width 0.3s ease-in-out", color: "teal", fontSize: "30px"}} />
          }
          backgroundColor="white"
          border={"1px solid black"}
          _hover={{ backgroundColor: "white" }}
          onClick={() => setChatOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          borderRadius={20}
        />
        <AdComponent/>
    </Box>
   </ErrorBoundary>
  );
};
export default Dashboard;

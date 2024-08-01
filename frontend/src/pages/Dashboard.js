import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
<<<<<<< HEAD
import { Box, Button, IconButton, Image, useToast } from "@chakra-ui/react";
=======
import { Box, IconButton, useToast } from "@chakra-ui/react";
>>>>>>> master
import UpperNav from "../miscellenious/upperNav";
import Progress from "../miscellenious/Progress";
import MyPrograms from "../miscellenious/Myprograms";
import FloatingChat from "../miscellenious/FloatingChat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
<<<<<<< HEAD
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
=======
import axiosInstance from "../components/config/axios";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
//twillio code: S8ZVS4F9BYTUYWM47439RPNR

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
  const toast = useToast();
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);

      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

      socket.on('disconnect', () => {
        setIsSocketConnected(false);
      });
    }
  }, [socket]);

  const requestClub = useCallback(async () => {
    if (!user?.coach) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await axiosInstance.get(`/api/clubs/${user.coach}`, config);
      setClub(response.data);
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user]);

  // Use another useEffect to call requestClub when user is set
  useEffect(() => {
    if (user) {
      requestClub();
    }
  }, [user, requestClub]);

  useEffect(() => {

    if (isSocketConnected) {
>>>>>>> master
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

<<<<<<< HEAD
    socket.on("message received", (newMessageReceived) => {
=======
    const handleMessageReceived = (newMessageReceived) => {
>>>>>>> master
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
<<<<<<< HEAD
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
=======
    };

    const handleProvincialRequest = (request) => {
      setUser((prevUser) => ({
        ...prevUser,
        provinceRequests: [
          ...prevUser.provinceRequests,
          request.provincialCoach,
        ],
      }));
    };

    const handleNationalRequest = (request) => {
      setUser((prevUser) => ({
        ...prevUser,
        nationalRequests: [
          ...prevUser.nationalRequests,
          request.nationalCoach,
        ],
      }));
    };

    const handleCertificates = (certificates) => {
      setUser((prev) => ({
        ...prev,
        certificates: certificates.certificates,
        belt: certificates.belt,
      }));
    };
    socket.on("provincial request", handleProvincialRequest);
    socket.on("national request", handleNationalRequest);
    socket.on("certificates", handleCertificates);
    socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("provincial request", handleProvincialRequest);
      socket.off("national request", handleNationalRequest);
      socket.off("certificates", handleCertificates);
      socket.off("message received", handleMessageReceived);
    };
 }
  }, [socket, navigate, notification, isSocketConnected]);

  // Combine requests and use a stable function reference
  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const [provinceResponse, nationalResponse] = await Promise.all([
        axiosInstance.get(`/api/province/officials/${user.country}/${user.provinces}`, config),
        axiosInstance.get(`/api/national/officials/${user.country}/${user.provinces}`, config)
      ]);

      const provinceData = provinceResponse.data;
      const nationalData = nationalResponse.data;

      if (provinceData.length > 0) {
        setProvince(provinceData);
        console.log(provinceData);
      }

      if (nationalData.length > 0) {
        setNational(nationalData);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast({
          title: "Your session has expired",
          description: "Logging out in 8 seconds",
          duration: 8000,
          status: "loading",
          position: "bottom",
        });
        console.log(error);

        setTimeout(() => {
          localStorage.removeItem("userInfo");
          navigate("/");
        }, 8000);
      } else {
        console.log(error);
        toast({
          title: "An Error Occurred!",
          description: "Try again after sometime.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [user, navigate, toast]);

  // Fetch data on mount and when user changes
  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

  return (
    <ErrorBoundary fallback={<p style={{ color: "white" }}>Something went wrong</p>} userSelect="none">
      <Box display="flex" alignItems="center" justifyContent="center" flexDir="column" width="100%" background="white" position="relative">
        <UpperNav />
        <Box width="100%" mt={20}>
          <Progress userBelt={user?.belt} />
        </Box>
        <MyPrograms courses={courses} user={user} />
        {chatOpen && <FloatingChat onClose={() => setChatOpen(false)} />}
        <IconButton
          display={chatOpen ? "none" : "flex"}
          position="fixed"
          bottom="8%"
          right="10%"
          icon={
            <MdOutlineMarkUnreadChatAlt
              style={{
                width: isHovered ? "60px" : "40px",
                transition: "width 0.3s ease-in-out",
                color: "teal",
                fontSize: "40px",
                border: 'none',
              }}
            />
          }
          backgroundColor="orange"
          p={"2"}
          boxSize={"auto"}
          border="none"
>>>>>>> master
          _hover={{ backgroundColor: "white" }}
          onClick={() => setChatOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
<<<<<<< HEAD
          borderRadius={20}
        />
      </ErrorBoundary>
    </Box>
  );
};
=======
          borderRadius="full"
        />
      </Box>
    </ErrorBoundary>
  );
};
export default Dashboard;
>>>>>>> master

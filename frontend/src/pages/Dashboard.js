import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { Box, IconButton, useToast } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import Progress from "../miscellenious/Progress";
import MyPrograms from "../miscellenious/Myprograms";
import FloatingChat from "../miscellenious/FloatingChat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
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

    const handleMessageReceived = (newMessageReceived) => {
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
          _hover={{ backgroundColor: "white" }}
          onClick={() => setChatOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          borderRadius="full"
        />
      </Box>
    </ErrorBoundary>
  );
};
export default Dashboard;

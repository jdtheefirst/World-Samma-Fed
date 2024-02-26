import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box, Button, IconButton, Image } from '@chakra-ui/react'
import UpperNav from '../miscellenious/upperNav'
import Progress from '../miscellenious/Progress'
import MyPrograms from '../miscellenious/Myprograms'
import FloatingChat from '../miscellenious/FloatingChat'
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../components/Context/ChatProvider'
import { useConnectSocket } from '../components/config/chatlogics'
import axios from 'axios'

export const Dashboard = ({courses}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { user, setUser, setMessages, notification, setNotification} = ChatState();
  const navigate = useNavigate();

  useEffect(() => {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    navigate('/');
    return;
  } else {
    setUser(userInfo);
  }
}, [setUser, navigate]);

const socket = useConnectSocket(user?.token);


useEffect(()=>{
   if (!socket) {
    console.log("Socket not connected");
    return;
  };
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
          showNotification("New Message", {
            body: `New message from ${newMessageReceived.sender.name}`,
            icon: `${newMessageReceived.sender.pic}`,
          },
    () => {
      navigate("/dashboard");
    });
  setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
});

   socket.on("updates", (clubRequests ) => {

 setUser((prevUser) => ({
    ...prevUser,
    clubRequests: clubRequests.clubRequests,
  }));

});

  return () => {
    socket.off("newConnection");
    socket.off('message received');
  };
}, [socket, setUser, user?.token, user])

console.log(user);

  // useEffect(() => {
  //   const fetchClubInfo = async () => {
  //     if(!user) return;
  //     try {
  //       const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const response = await axios.get(`/api/club/${user._id}`, config);
      
  //     if(response.coach){
  //       setClub(response);
  //     }
  //     console.log(response);

  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     }
  //   };

  //   if (user) {
  //     fetchClubInfo();
  //   }
  // }, [user]);



 
  return (
    <Box width="100%" height={"100%"} background={"Background"} position={"relative"}>
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box position={"fixed"} background={"Background"} zIndex={10} width="100%"><UpperNav/></Box>
        <Box mt={20}><Progress userBelt={"Visitor"}/></Box>
        <MyPrograms courses={courses} />
        {chatOpen && <FloatingChat onClose={() => setChatOpen(false)}/>}
        <IconButton display={chatOpen? "none" : "flex"} position="fixed" bottom="0" right={5} icon={<Image src='https://res.cloudinary.com/dvc7i8g1a/image/upload/v1708964780/icons8-facebook-messenger-48_ffq52e.png' alt='Chat' height={"150%"} />} p={0} borderRadius={"50%"} backgroundColor={"white"} onClick={()=> setChatOpen(true)}/>
      </ErrorBoundary>
    </Box>
  )
}

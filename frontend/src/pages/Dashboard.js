import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box, Button } from '@chakra-ui/react'
import UpperNav from '../miscellenious/upperNav'
import Progress from '../miscellenious/Progress'
import MyPrograms from '../miscellenious/Myprograms'
import FloatingChat from '../miscellenious/FloatingChat'
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../components/Context/ChatProvider'
import { useConnectSocket } from '../components/config/chatlogics'

export const Dashboard = ({courses}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { user, setUser, setMessages} = ChatState();
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
  if(!socket) return;
  
  socket.on("message received", (newMessageReceived) => {
  setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
});
})

useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user/info');

        console.log(response);

        // setUser(response);

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);



 
  return (
    <Box width="100%" height={"100%"} background={"Background"} position={"relative"}>
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box position={"fixed"} background={"Background"} zIndex={10} width="100%"><UpperNav/></Box>
        <Box mt={20}><Progress userBelt={"Visitor"}/></Box>
        <MyPrograms courses={courses} />
        {chatOpen && <FloatingChat onClose={() => setChatOpen(false)}/>}
        <Button display={chatOpen? "none" : "flex"} position="fixed" bottom="0" right="1" borderRadius={20}fontSize={"large"} backgroundColor={"orange"} onClick={()=> setChatOpen(true)}>Chat</Button>
      </ErrorBoundary>
    </Box>
  )
}

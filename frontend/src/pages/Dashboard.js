import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box } from '@chakra-ui/react'
import UpperNav from '../miscellenious/upperNav'
import Progress from '../miscellenious/Progress'
import MyPrograms from '../miscellenious/Myprograms'
import FloatingChat from '../miscellenious/FloatingChat'
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../components/Context/ChatProvider'

export const Dashboard = ({courses}) => {
  const [chatOpen, setChatOpen] = useState(true);
  const {user, setUser} = ChatState();
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
 
  return (
    <Box width="100%" height={"100%"} background={"Background"} position={"relative"}>
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box position={"fixed"} background={"Background"} zIndex={10} width="100%"><UpperNav/></Box>
        <Box mt={20}><Progress userBelt={"Member"}/></Box>
         <MyPrograms courses={courses} />
          {chatOpen && user && <FloatingChat onClose={() => setChatOpen(false)}/>}
      </ErrorBoundary>
    </Box>
  )
}

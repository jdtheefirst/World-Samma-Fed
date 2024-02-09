import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Box } from '@chakra-ui/react'
import UpperNav from '../miscellenious/upperNav'
import Progress from '../miscellenious/Progress'
import MyPrograms from '../miscellenious/Myprograms'
import FloatingChat from '../miscellenious/FloatingChat'

export const Dashboard = ({courses}) => {
  const [chatOpen, setChatOpen] = useState(true);
 
  return (
    <Box width="100%" height={"100%"} background={"Background"} position={"relative"}>
      <ErrorBoundary fallback={<p>Something went wrong</p>} userSelect={"none"}>
        <Box position={"fixed"} background={"Background"} zIndex={10} width="100%"><UpperNav/></Box>
        <Box mt={20}><Progress userBelt={"Member"}/></Box>
         <MyPrograms courses={courses} />
          {chatOpen && <FloatingChat onClose={() => setChatOpen(false)}/>}
      </ErrorBoundary>
    </Box>
  )
}

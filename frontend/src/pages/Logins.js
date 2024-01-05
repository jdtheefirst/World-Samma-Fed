import React from 'react'
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import Login from "../Authentication/Login";
  import Signup from "../Authentication/SignUp";
  import "../App.css"

const Logins = () => {
  return (
    <Container maxW="xl" centerContent  css={{
      animation: 'slideInFromRight 0.5s ease-out'
    }}>
         <Box
            display="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
           >
  
            <Text fontWeight={"bold"} fontSize="3xl">Welcome to World Samma</Text>
          </Box>
          <Box bg="black" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
    </Container>
  )
}

export default Logins
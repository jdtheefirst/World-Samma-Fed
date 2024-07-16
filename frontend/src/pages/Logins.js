import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";
import "../App.css";

const Logins = () => {
  return (
    <Container
      display={"flex"}
      maxW="xl"
      centerContent
      css={{
        animation: "slideInFromRight 0.5s ease-out",
      }}
      mt={"1rem"}
    >
      <Box
        background={"whitesmoke"}
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        fontSize={"small"}
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab >Login</Tab>
            <Tab >Sign Up</Tab>
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
  );
};

export default Logins;

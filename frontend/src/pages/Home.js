import {
  Box,
   Button,
   Image,
   Text
  } from "@chakra-ui/react";
  import ErrorBoundary from "../components/ErrorBoundary";
  import "../App.css"
  import Logins from "./Logins"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


  
  function Homepage() {
    const [getStarted, setGetStarted] = useState();
    const navigate = useNavigate();

    useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    navigate('/dashboard');
  }
}, [navigate]);
  
  
    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Box display="flex" flexDir={"column"}  width="100%"> 
        <Box display="flex" justifyContent="flex-end" className="sideDrawer" backgroundColor={"Background"} width="100%">
          <Button background="transparent" _hover={{backgroundColor: "transparent", color: "green"}}>About</Button>
          <Button background="transparent"  _hover={{backgroundColor: "transparent", color: "green"}}>Events</Button>
          <Button background="transparent" _hover={{backgroundColor: "transparent", color: "green"}} onClick={() => setGetStarted(true)}>Login/Sign Up</Button>
        </Box>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={{ base: 'sm', md: 'xl' }} backgroundColor={"Background"}m={1} p={5} borderRadius={3}>Welcome to World-Samma, where discipline meets passion. Begin your path to mastery today.</Text>
       {getStarted ? <Logins/> : <> <Box
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          w="100%"
          height={"50%"}
          p={0}
          m={0}
       
        >
           <Image
          src='https://res.cloudinary.com/dvc7i8g1a/image/upload/v1704379830/samma1_sfkycx.jpg'
          alt=''
          borderRadius='lg'
          height={"90%"}
          _hover={{
            transform: 'scale(1.05)', 
            transition: 'transform 0.2s', 
          }}
          m={2}
        />
        <Image
          src='https://res.cloudinary.com/dvc7i8g1a/image/upload/v1704379830/samma_dm0t2d.jpg'
          alt=''
          borderRadius='lg'
          height={"90%"}
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          }}
          m={2}
        />
        <Image
          src='https://res.cloudinary.com/dvc7i8g1a/image/upload/v1704379830/samma1_sfkycx.jpg'
          alt=''
          borderRadius='lg'
          height={"90%"}
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          }}
          m={2}
        />
       
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><Button borderRadius={20} backgroundColor={"#a432a8"} onClick={() => setGetStarted(true)}>Get Started</Button></Box></>}
      </Box>
    </ErrorBoundary>
    );
  }
  
  export default Homepage;
  
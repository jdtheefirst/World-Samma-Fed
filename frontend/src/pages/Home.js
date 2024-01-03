import {
  Box,
   Button,
   Container,
   Text
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import ErrorBoundary from "../components/ErrorBoundary";

  
  function Homepage() {
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   const user = JSON.parse(localStorage.getItem("userInfo"));
  
    //   if (user) navigate("/chats");
    // }, [navigate]);
  
    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
       <Box display={"flex"} width={"100%"}>
       <Box display={"flex"} justifyContent={"flex-end"} className="sideDrawer" width={"100%"}><Button background={"transparent"} textColor={"white"} _hover={{backgroundColor: "transparent", color: "green"}} onClick={ () => navigate("/login")}>Login/Sign Up</Button></Box> 
       <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="0.2rem"
        >
          Mzeva
        </Box>
       </Box>
      </ErrorBoundary>
    );
  }
  
  export default Homepage;
  
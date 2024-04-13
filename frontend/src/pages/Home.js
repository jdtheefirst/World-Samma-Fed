import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Link,
  IconButton,
  Image,
} from "@chakra-ui/react";
import ErrorBoundary from "../components/ErrorBoundary";
import "../App.css";
import Logins from "./Logins";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../logo1edit.png";
import logo2 from "../logo2.jpg";
import logo3 from "../pilot.jpeg";

import CoffeeModal from "../miscellenious/coffee";

function Homepage() {
  const [getStarted, setGetStarted] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Box display="flex" flexDir={"column"} width="100%">
        <Box
          display="flex"
          justifyContent="flex-end"
          className="sideDrawer"
          backgroundColor={"Background"}
          width="100%"
        >
          <Button
            background="transparent"
            _hover={{ backgroundColor: "transparent", color: "green" }}
            onClick={() => setGetStarted(false)}
          >
            About
          </Button>
          <Button
            background="transparent"
            _hover={{ backgroundColor: "transparent", color: "green" }}
            onClick={() => {
              setShow(true);
              setGetStarted(false);
            }}
          >
            Donate☕️
          </Button>
          <Button
            background="transparent"
            _hover={{ backgroundColor: "transparent", color: "green" }}
            onClick={() => setGetStarted(true)}
          >
            Login/Sign Up
          </Button>
        </Box>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          m={1}
          p={5}
          borderRadius={3}
        >
          WORLD SAMMA FEDERATION
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{ base: "sm", md: "xl" }}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          m={1}
          p={5}
          borderRadius={3}
        >
          Welcome to Worldsamma, where discipline meets passion. Begin your path
          to mastery today.
        </Text>
        {show && <CoffeeModal isOpen={true} onClose={handleCloseModal} />}
        {getStarted ? (
          <Logins />
        ) : (
          <>
            {" "}
            <Box
              display="flex"
              flexWrap={"wrap"}
              justifyContent="center"
              alignItems={"center"}
              width="100%"
              position={"relative"}
              p={0}
              m={0}
            >
              <Image
                src={logo1}
                position={"absolute"}
                zIndex={-10}
                width={"100%"}
                boxSize={{ base: "200px", md: "200px" }}
                alt={`Logo 1*`}
                borderRadius="20"
                left={"25%"}
                top={0}
              />
              <Image
                src={logo2}
                position={"absolute"}
                zIndex={-10}
                width={"100%"}
                boxSize={{ base: "200px", md: "200px" }}
                alt={`Logo 2*`}
                borderRadius="20"
                left={{ base: "25%", md: "50%" }}
                bottom={0}
              />
              <Image
                src={logo3}
                position={"absolute"}
                zIndex={-10}
                width={"100%"}
                boxSize={{ base: "200px", md: "200px" }}
                alt={`Logo 2*`}
                borderRadius="20"
                left={{ base: "25%", md: "70%" }}
                bottom={{ base: "35%", md: "50%" }}
              />
              <Text
                textAlign={"center"}
                textColor={"#f0fff0"}
                border={"1px solid purple"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="dark-lg"
                rounded="md"
              >
                ⭐ Sign up as GUEST (for free) at this WSF Online School so to
                follow your favorite clubs and be enjoying the splendid
                presentations(including live performances).
              </Text>
              <Text
                textAlign={"center"}
                textColor={"#f0fff0"}
                border={"1px solid purple"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="dark-lg"
                rounded="md"
              >
                ⭐ ⭐ Enrol as STUDENT(or enrol your children and/or your other
                dependants) for step by step online training and certification.
              </Text>
              <Text
                textAlign={"center"}
                textColor={"#f0fff0"}
                border={"1px solid purple"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="dark-lg"
                rounded="md"
              >
                ⭐ ⭐ ⭐ Form/register your CLUB(S) so to be enjoying the
                educational, managerial, health, social, financial and other
                benefits.
              </Text>
              <Text
                textAlign={"center"}
                textColor={"#f0fff0"}
                border={"1px solid purple"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="dark-lg"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ Claim the interim leadership of PROVINCIAL SAMMA
                ASSOCIATION so to be enjoying more benefits which includes
                managing a percentage from donations to WSF via the site.
              </Text>
              <Text
                textAlign={"center"}
                textColor={"#f0fff0"}
                border={"1px solid purple"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="dark-lg"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ ⭐Claim the interim leadership of NATIONAL SAMMA
                ASSOCIATION for much more benefits which includes managing an
                increased percentage from donations to WSF via the site.
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                borderRadius={20}
                backgroundColor={"#a432a8"}
                onClick={() => setGetStarted(true)}
                m={1}
              >
                Get Started
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Grid
                width={"100%"}
                height="200px"
                templateRows="repeat(2, 1fr)"
                // templateColumns="repeat(5, 1fr)"
                gap={4}
                m={2}
              >
                <GridItem
                  colSpan={2}
                  background="blackAlpha.400"
                  color={"white"}
                  textAlign={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {" "}
                  <Link href="https://instagram.com/worldsamma">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732068/icons8-instagram-48_otbx6y.png"
                      h={6}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732067/icons8-youtube-47_mzckqt.png"
                      h={6}
                    />
                  </Link>
                  <Link href="https://x.com/worldsamma">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712951829/icons8-x-50_i8gjn3.png"
                      h={6}
                    />
                  </Link>
                  <Link href="https://facebook.com/worldsamma">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732068/icons8-facebook-48_zn7fjx.png"
                      h={6}
                    />
                  </Link>
                  <Link href="https://tiktok.com/worldsamma">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712951829/icons8-tiktok-50_1_sxupbm.png"
                      h={6}
                    />
                  </Link>
                </GridItem>
                <GridItem
                  colSpan={2}
                  background="blackAlpha.600"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  textColor={"whitesmoke"}
                  fontSize={"small"}
                  p={3}
                >
                  Samma is a modern hybrid martial art(from Eastern Africa) with
                  its own training curriculum(cheni 6) and a distintive sparing
                  method that combines the 3 ranges of man to man combat, that
                  is; strike by limb (elbow, fist, knee and foot) and finally
                  grapping.
                </GridItem>
                <GridItem
                  colSpan={4}
                  background="blackAlpha.600"
                  color={"white"}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={"small"}
                    p={3}
                    textColor={"bisque"}
                  >
                    © World Samma Academy 2013. All rights reserved. Terms and
                    conditions apply. For queries and comments email
                    support@worldsamma.org.
                    <Text
                      textAlign={"center"}
                    >{`Copyright © 1999-${new Date().getFullYear()}`}</Text>
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </ErrorBoundary>
  );
}

export default Homepage;

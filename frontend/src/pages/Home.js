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
            onClick={() => setGetStarted(false)}
          >
            Events
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
          fontWeight={"bold"}
          fontSize={{ base: "sm", md: "xl" }}
          backgroundColor={"Background"}
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
              p={0}
              m={0}
            >
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
                ⭐ Student: Learn and elevate your craft to mastery. Join your
                favorite clubs. Create your own club. Become a certified coach
                to mentor others.
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
                ⭐ ⭐ Coach: Earn income from your coaching and activities.
                Apply for provincial interim coaching positions for broader
                impact.
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
                ⭐ ⭐ ⭐ Province Coach: Manage provincial accounts for greater
                financial opportunities. Lead and mentor coaches within your
                province. Apply for national interim coaching positions to
                advance your career.
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
                ⭐ ⭐ ⭐⭐ National Coach: Oversee national club accounts and
                operations. Head all Provincial Associations, guiding policy and
                development. Mentor and empower coaches nationwide for impactful
                leadership. Plan for national and international tournaments,
                representing the nation on a global stage.
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
                templateColumns="repeat(5, 1fr)"
                gap={4}
                m={2}
              >
                <GridItem
                  rowSpan={2}
                  colSpan={1}
                  background="blackAlpha.400"
                  color={"white"}
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {" "}
                  <Link href="">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732068/icons8-instagram-48_otbx6y.png"
                      h={9}
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732067/icons8-youtube-47_mzckqt.png"
                      h={7}
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732068/icons8-twitter-50_sgczrz.png"
                      h={8}
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732068/icons8-facebook-48_zn7fjx.png"
                      h={8}
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712732067/icons8-tiktok-50_vphmj9.png"
                      h={8}
                    />
                  </Link>
                </GridItem>
                <GridItem
                  colSpan={2}
                  background="blackAlpha.600"
                  color={"white"}
                ></GridItem>
                <GridItem
                  colSpan={2}
                  background="blackAlpha.600"
                  color={"white"}
                />
                <GridItem
                  colSpan={4}
                  background="blackAlpha.600"
                  color={"white"}
                >
                  <Text textAlign={"center"} fontSize={"small"}>
                    {" "}
                    {`Copyright © 1999-${new Date().getFullYear()}`}
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

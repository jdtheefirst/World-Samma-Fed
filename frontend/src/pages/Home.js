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
import logo1 from "../final.jpeg";
import logo2 from "../finalLogo2.jpeg";
import logo7 from "../pilot4.png";

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
          width="100%"
          boxShadow="2xl"
          p="6"
          rounded="md"
          bg="white"
        >
          <Button
            background="transparent"
            _hover={{ backgroundColor: "transparent", color: "green" }}
            onClick={() => {
              setGetStarted(null);
              navigate("/about");
            }}
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
        <Box
          position="relative"
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          m={3}
          background={"whitesmoke"}
        >
          <Image
            src={logo1}
            boxSize={{ base: "100px", md: "200px" }}
            alt={`Logo 1*`}
            m={1}
          />
          <Text
            textAlign={"center"}
            fontSize={{
              base: "md",
              lg: "30px",
              md: "40px",
              xl: "60px",
            }}
            textColor={"yellow.400"}
            fontWeight="extrabold"
            borderRadius={3}
            position="absolute"
            bottom={0}
            left="50%"
            width={{ base: "60%", lg: "100%" }}
            transform="translateX(-50%)"
            p={"1"}
            letterSpacing={1}
            textShadow="1px 1px 1px #000"
          >
            WORLD SAMMA FEDERATION
          </Text>

          <Image
            src={logo2}
            boxSize={{ base: "100px", md: "200px" }}
            alt={`Logo 2*`}
          />
        </Box>

        {show && <CoffeeModal isOpen={true} onClose={handleCloseModal} />}
        {getStarted ? (
          <>
            <Logins />
            <Text
              textAlign={"center"}
              bottom={0}
              p={6}
              textColor={"grey"}
              background="blackAlpha.200"
              mt={3}
            >
              <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
              All rights reserved. Terms and conditions apply. For queries and
              comments email support@worldsamma.org.
            </Text>
          </>
        ) : (
          <>
            {" "}
            <Box
              display="flex"
              flexWrap={"wrap"}
              justifyContent="center"
              alignItems={"center"}
              width="100%"
              fontFamily="Arial, sans-serif"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="normal"
              lineHeight="1.5"
              color="black"
              position={"relative"}
              p={0}
              m={0}
            >
              <Image
                src={logo7}
                position={"absolute"}
                zIndex={-1}
                alt={`Logo 2*`}
                mt={30}
              />
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="base"
                rounded="md"
              >
                ⭐ Sign up as GUEST (for free) at this WSF Online School so to
                follow your favorite clubs and be enjoying the splendid
                presentations(including live performances).
              </Text>
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ Enrol as STUDENT(or enrol your children and/or your other
                dependants) for step by step online training and certification.
              </Text>
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ Form/register your CLUB(S) so to be enjoying the
                educational, managerial, health, social, financial and other
                benefits.
              </Text>
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ Claim the interim leadership of PROVINCIAL SAMMA
                ASSOCIATION so to be enjoying more benefits which includes
                managing a percentage from donations to WSF via the site.
              </Text>
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: 0, md: 3 }}
                m={1}
                boxShadow="base"
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
              <Grid width={"100%"} height="200px" templateRows="repeat(2, 1fr)">
                <GridItem
                  background="whitesmoke"
                  textAlign={"center"}
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={2}
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
                      h={5}
                    />
                  </Link>
                  <Link href="https://x.com/worldsamma">
                    <Image
                      src="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1712951829/icons8-x-50_i8gjn3.png"
                      h={5}
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
                  background="whitesmoke"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  textColor={"blackAlpha.800"}
                  px={6}
                  p={6}
                  width={"100%"}
                >
                  Samma is a modern hybrid martial art (from Eastern Africa)
                  with its own training curriculum (cheni 6) and a distinctive
                  sparring method that combines the three ranges of man to man
                  combat, that is; strike by an extension/stick, strike by limb
                  (elbow, fist, knee and foot) and finally grappling.
                </GridItem>
                <GridItem
                  colSpan={4}
                  background="blackAlpha.400"
                  color={"white"}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={"small"}
                    p={1}
                    textColor={"grey"}
                  >
                    <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
                    All rights reserved. Terms and conditions apply. For queries
                    and comments email support@worldsamma.org.
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

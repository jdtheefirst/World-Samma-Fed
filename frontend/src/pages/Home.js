import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import ErrorBoundary from "../components/ErrorBoundary";
import "../App.css";
import Logins from "./Logins";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../final.jpeg";
import logo2 from "../finalLogo2.jpeg";
import logo7 from "../pilot4.png";
import logo9 from "../sammahouse.jpeg";
import logo10 from "../Equity.png";
import { FaArrowCircleRight, FaArrowAltCircleDown, FaRocket, } from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import { BiDonateHeart } from "react-icons/bi";
import { HamburgerIcon } from "@chakra-ui/icons";

import CoffeeModal from "../miscellenious/coffee";
import { CiLocationOn } from "react-icons/ci";
import TestimonialsCarousel from "../components/Carousel";

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
      <Box display="flex" justifyContent="flex-end" alignItems={"center"} width="100%" boxShadow="2xl" background={"#FF416C"} p={{base: "2", md: "4"}} rounded="md" position={"fixed"} zIndex={20}>
        <Text textAlign={"start"} width={"100%" } fontSize={{base: "medium", md: "x-large"}} fontWeight={"bold"} textColor={"white"}>Samma - All in One Martial Arts</Text>
      <FaRocket className="rocket-animation" size={20} />
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" colorScheme="white" />
        <MenuList background={"#FF416C"} border={"none"}>
          <MenuItem
            onClick={() => {
              navigate("/about");
            }}
            _hover={{ backgroundColor: "transparent", color: "yellow", fontSize: "small" }}
            background="transparent"
            color={"white"}
            border={"none"}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              setShow(true);
              setGetStarted(false);
            }}
            _hover={{ backgroundColor: "transparent", color: "yellow", fontSize: "small" }}
            background="transparent"
            color={"white"}
            border={"none"}
          >
            Donate
          </MenuItem>
          <MenuItem
            onClick={() => {
              setShow(false);
              setGetStarted(false);
        
            }}
            _hover={{ backgroundColor: "transparent", color: "yellow", fontSize: "small" }}
            background="transparent"
            color={"white"}
            border={"none"}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => setGetStarted(true)}
            _hover={{ backgroundColor: "transparent", color: "yellow", fontSize: "small" }}
            background="transparent"
            color={"white"}
            border={"none"}
          >
            Get Started
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
        <Box
          position="relative"
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={70}
        >
          <Image
            src={logo1}
            boxSize={{ base: "80px", md: "180px" }}
            width={{ base: "90px", md: "190px" }}
            borderRadius={10}
            alt={`Logo 1*`}
          />
          <Text
            textAlign={"center"}
            fontSize={{
              base: "20px",
              sm: "20px",
              md: "30px",
              lg: "40px",
              xl: "50px",
            }}
            textColor={"yellow.400"}
            fontWeight="extrabold"
            borderRadius={3}
            position="absolute"
            bottom={{base: -5, md: 0}}
            left="50%"
            width={{ base: "60%", lg: "100%" }}
            transform="translateX(-50%)"
            p={"2"}
            letterSpacing={1}
            textShadow={{base: "none", md: "2px 2px 2px #000"}}
          >
            WORLD SAMMA FEDERATION
          </Text>
          <Image
            src={logo2}
            boxSize={{ base: "80px", md: "180px" }}
            width={{ base: "90px", md: "190px" }}
            alt={`Logo 2*`}
            borderRadius={10}
          />
        </Box>
        {show && <CoffeeModal isOpen={true} onClose={handleCloseModal} />}
        {getStarted ? (
          <Box
            display="flex"
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection="column"
          >
            <Logins />
            <Box flex="1" />
            <Text
              textAlign={"center"}
              fontSize={"x-small"}
              position="sticky"
              width="100%"
              zIndex="10"
            >
              <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
              All rights reserved. Terms and conditions apply. For queries and
              comments, email support@worldsamma.org.
            </Text>
          </Box>
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
              position={"relative"}
            >
    

              <Image
                src={logo7}
                position={"absolute"}
                zIndex={-1}
                alt={`Logo 2*`}
                height={{ md: "50%"}}
                opacity={0.5}
                bottom={{base: "50%"}}
              />
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"300px"}
                p={{ base: "2", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                textColor={"#000000"}
                rounded="md"
                mt={"20px"}
              >
                ⭐ Sign up as GUEST (for free) at this WSF Online School so to
                follow your favorite clubs and be enjoying the splendid
                presentations(including live performances).
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"325px"}
                textColor={"#000000"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ Enrol as STUDENT(or enrol your children and/or your other
                dependants) for step by step online training and certification.
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"350px"}
                textColor={"#000000"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ Form/register your CLUB(S) so to be enjoying the
                educational, managerial, health, social, financial and other
                benefits.
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"375px"}
                p={{ base: "3", md: "6" }}
                textColor={"#000000"}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ Claim the interim leadership of PROVINCIAL SAMMA
                ASSOCIATION so to be enjoying more benefits which includes
                managing a percentage from donations to WSF via the site.
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"400px"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                mb={"4"}
                textColor={"#000000"}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ ⭐Claim the interim leadership of NATIONAL SAMMA
                ASSOCIATION for much more benefits which includes managing an
                increased percentage from donations to WSF via the site.
              </Text>
              <TestimonialsCarousel/>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                minH={{ base: "400px", md: "200px" }}
                position={"relative"}
                m={1}
              >
                <Box
                  flex={"1"}
                  position={"relative"}
                  mb={{ base: "20px", md: "0" }}
                  onClick={() => setShow(true)}
                  style={{ cursor: "pointer" }}
                  m={"3"}
                >
                  <Image
                    src={logo9}
                    boxSize={"250px"}
                    borderRadius={2}
                    mx={"auto"}
                    mb={"10px"}
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    bg="blackAlpha.400"
                  />
                  <Text
                   
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CiLocationOn
                      style={{
                        color: "red",
                      }}
                    />
                    Mombasa, Kenya(Current HQs)
                  </Text>
                  <Text
                    textAlign={"center"}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    p={"3"}
                    px={{ base: "10px", md: "0" }}
                  >
                    <FcDonate style={{ fontSize: "6rem" }} />
                    Your donation is crucial in realizing our ambitious vision.
                    We aim to construct a larger training facility to
                    accommodate more individuals, empowering countless lives.
                    <Box
                      display={{ base: "flex", md: "none" }}
                      flexDir={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                     
                        <Image
                          height={20}
                          width={"auto"}
                          src={logo10}
                          alt={""}
                          loading="lazy"
                        />
                        <Text fontSize={"large"}>
                          Equity Bank Account Number: <br />
                          <Text fontWeight={"extrabold"} color={"black"}>
                            0250164349965
                          </Text>
                          <br /> Account Name: <br />{" "}
                          <Text fontWeight={"extrabold"} color={"black"}>
                            World Samma Academy
                          </Text>
                        </Text>
                        <Image
                          height={20}
                          width={"auto"}
                          src={
                            "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1694007922/mpesa_ppfs6p.png"
                          }
                          alt={""}
                          loading="lazy"
                        />{" "}
                        <Text >
                          Mpesa Till Number: <br />
                          <Text fontWeight={"extrabold"} color={"black"}>
                            858447
                          </Text>{" "}
                        </Text>

                     
                      <FaArrowAltCircleDown
                        style={{
                          fontSize: "3rem",
                          color: "orange",
                        }}
                      />
                    </Box>
                  </Text>
                </Box>
                <Box
                  display={{ base: "none", md: "flex" }}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
               
                 
                >
                  <FaArrowCircleRight
                    style={{
                      fontSize: "3rem",
                      color: "orange",
                    }}
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {" "}
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {" "}
                      <Image
                        height={20}
                        width={"auto"}
                        src={logo10}
                        alt={""}
                        loading="lazy"
                      />
                      <Text fontSize={"large"}>
                        Equity Bank Account Number: <br />
                        <Text fontWeight={"extrabold"} color={"black"}>
                          0250164349965
                        </Text>
                        <br /> Account Name: <br />{" "}
                        <Text fontWeight={"extrabold"} color={"black"}>
                          World Samma Academy
                        </Text>
                      </Text>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {" "}
                      <Image
                        height={20}
                        width={"auto"}
                        src={
                          "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1694007922/mpesa_ppfs6p.png"
                        }
                        alt={""}
                        loading="lazy"
                      />{" "}

                      <Text p={"6"} color={"black"}>
                        Mpesa Till Number <br />
                        <Text color={"black"} fontWeight={"extrabold"}>
                          858447
                        </Text>
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  flex={"1"}
                  position={"relative"}
                  onClick={() => setShow(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1716192064/kumbi.jpg"
                    }
                    boxSize={"250px"}
                    borderRadius={2}
                    mx={"auto"}
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    bg="blackAlpha.400"
                  />
                     <Text
                   
                   style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                   }}
                 >
                   <CiLocationOn
                     style={{
                       color: "red",
                     }}
                   />
                   Mombasa, Kenya(Proposed Design)
                 </Text>
                  <Text
                    textAlign={"center"}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    p={"3"}
                    px={{ base: "10px", md: "0" }}
                  >
                    <BiDonateHeart
                      style={{ fontSize: "6rem", color: "green" }}
                    />
                    Your support will help establish our international samma
                    headquarters and build a world-class events facility. This
                    is a crucial step in expanding our global impact of bringing
                    people of nations together in thrilling sporting activities,
                    fostering international friendships, business connections
                    and promoting sports tourism. Thanking you in advance for
                    your generosity.
                  </Text>
                </Box>
              </Box>

              <Button
                borderRadius={20}
                onClick={() => setGetStarted(true)}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                m={{base: "2"}}
                color={"white"}
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
              <Grid width={"100%"} templateRows="repeat(1, 1fr)">
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
                  <Link href="https://www.youtube.com/@worldsammafederation">
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
                  <Link href="https://www.tiktok.com/search?q=worldsamma&t=1713608132427">
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
                 
                  width={"100%"}
                >
                  Samma is a modern hybrid martial art (from Eastern Africa)
                  with its own training curriculum (cheni 6) and a distinctive
                  sparring method that combines the three ranges of man to man
                  combat, that is; strike by an extension/stick, strike by limb
                  (elbow, fist, knee and foot) and finally grappling.
                </GridItem>
                <GridItem
                  colSpan={3}
                  background={"white"}
                  color={"white"}
                  width={"100%"}
                >
                  <Text
                    textAlign={"center"}
                     fontSize={"small"}
                    background={"white"}
                    textColor={"grey"}
                    width={"100%"}
                  >
                    <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
                    All rights reserved. Terms and conditions apply. For queries
                    and comments, email support@worldsamma.org.
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
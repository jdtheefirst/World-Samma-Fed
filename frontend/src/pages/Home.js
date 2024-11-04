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
  LinkOverlay,
  LinkBox,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorBoundary from "../components/ErrorBoundary";
import "../App.css";
import Logins from "./Logins";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/images/final.jpeg";
import logo2 from "../assets/images/finalLogo2.jpeg";
import logo7 from "../assets/images/reduced.jpg";
import logo9 from "../assets/images/sammahouse.jpeg";
import logo10 from "../assets/images/Equity.png";
import {
  FaArrowCircleRight,
  FaArrowAltCircleDown,
  FaRocket,
  FaTiktok,
} from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import { BiDonateHeart } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { TbCloudDownload } from "react-icons/tb";
import { RxDownload } from "react-icons/rx";
import CoffeeModal from "../miscellenious/coffee";
import {
  CiFacebook,
  CiInstagram,
  CiLocationOn,
  CiYoutube,
} from "react-icons/ci";
import TestimonialsCarousel from "../components/Carousel";
import PollComponent from "../components/Polls";
import { MdMenuOpen } from "react-icons/md";
import axios from "axios";
import { ChatState } from "../components/Context/ChatProvider";
import CoursesGrid from "../components/Courses";

function Homepage() {
  const [getStarted, setGetStarted] = useState(false);
  const { setUser } = ChatState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = useState(Number);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleCloseModal = () => {
    setShow(false);
  };
  useEffect(() => {
    const fetchInitialCount = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/download/count");
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching initial count:", error);
      }
    };

    fetchInitialCount();
  }, []);

  // Function to handle download and increment count
  const handleDownload = async () => {
    try {
      const { data } = await axios.post("/api/download/increment");
      setCount(data.count);
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred while downloading."
      );
    }
  };
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Box
        display="flex"
        flexDir={"column"}
        justifyContent="start"
        fontFamily="Arial, sans-serif"
        lineHeight="1.6"
        alignItems={"center"}
        minH={"100vh"}
        width="100%"
        padding="4"
        pt={0}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems={"center"}
          width="100%"
          boxShadow="2xl"
          background={"#003366"}
          p="4"
          position={"fixed"}
          zIndex={20}
        >
          <Text
            display={"flex"}
            textColor={"whitesmoke"}
            textAlign={"start"}
            width={"100%"}
            fontSize={{ base: "small", md: "x-large" }}
            fontWeight={"bold"}
          >
            <strong
              style={{
                fontWeight: "extrabold",
                fontFamily: "fantacy",
                textEmphasis: "GrayText",
              }}
            >
              SAMMA:
            </strong>
            {"\u00A0"} All-In-One Martial Art
          </Text>
          <FaRocket className="rocket-animation" size={20} />
          <Menu>
            <MenuButton
              as={IconButton}
              border="none"
              icon={<MdMenuOpen style={{ color: "white", fontSize: "30px" }} />}
              variant="outline"
              colorScheme="#2d1950"
            />
            <MenuList borderRadius={"none"}>
              <MenuItem
                onClick={() => {
                  navigate("/about");
                  setGetStarted(false);
                }}
                _hover={{ backgroundColor: "transparent", fontSize: "small" }}
                background="transparent"
                border={"none"}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setShow(true);
                  setGetStarted(false);
                }}
                _hover={{ backgroundColor: "transparent", fontSize: "small" }}
                background="transparent"
                border={"none"}
              >
                Donate
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setShow(false);
                  setGetStarted(false);
                }}
                _hover={{ backgroundColor: "transparent", fontSize: "small" }}
                background="transparent"
                border={"none"}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => setGetStarted(true)}
                _hover={{ backgroundColor: "transparent", fontSize: "small" }}
                background="transparent"
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
          width={"100%"}
        >
          <Image
            src={logo1}
            boxSize={{ base: "60px", md: "120px" }}
            width={{ base: "65px", md: "130px" }}
            loading="lazy"
            alt={`Logo 1*`}
          />
          <Text
            textAlign={"center"}
            fontSize={{
              base: "xl",
              md: "30px",
              lg: "40px",
              xl: "50px",
            }}
            textColor={"yellow.400"}
            fontWeight="extrabold"
            borderRadius={3}
            position="absolute"
            bottom={{ base: -14, md: 0 }}
            left="50%"
            width={{ base: "60%", lg: "100%" }}
            transform="translateX(-50%)"
            p={"2"}
            letterSpacing={1}
            textShadow={{ base: "1px 1px 1px #000", md: "2px 2px 2px #000" }}
          >
            WORLD SAMMA FEDERATION
          </Text>
          <Image
            src={logo2}
            boxSize={{ base: "60px", md: "120px" }}
            width={{ base: "70px", md: "140px" }}
            alt={`Logo 2*`}
            loading="lazy"
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
            mt={{ base: "60px", md: "20px" }}
          >
            <Logins />
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              width={"80"}
              mt={"6"}
              fontSize={"small"}
            >
              <Link
                href="https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847"
                target="_blank"
                rel="noopener noreferrer"
                p={1}
              >
                Privacy Policy
              </Link>
              <Link
                href="https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7"
                target="_blank"
                rel="noopener noreferrer"
                p={1}
              >
                Terms and Conditions
              </Link>
            </Box>
            <Box
              textAlign={"center"}
              fontSize={"small"}
              position="sticky"
              width="100%"
              mt={"6"}
            >
              <Text
                mb={"3"}
              >{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
              All rights reserved. Terms and conditions apply. For queries and
              comments Email: support@worldsamma.org
            </Box>
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
              fontSize="small"
              fontWeight="normal"
              position={"relative"}
            >
              <Image
                src={logo7}
                position={"absolute"}
                zIndex={-1}
                alt={`Logo 2*`}
                height={"auto"}
                opacity={0.5}
                loading="lazy"
                rounded="md"
                bg="blackAlpha.400"
                borderRadius={"full"}
                top={{ base: "1%", md: "0" }}
              />
              <Text
                textAlign={"center"}
                width={"300px"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                textColor={"#000000"}
                rounded="md"
                mt={{ base: "60px", md: "20px" }}
              >
                ⭐ Sign up as a GUEST for free at the WSF Online School to
                follow your favorite clubs and enjoy splendid presentations,
                including live performances.
              </Text>
              <Text
                textAlign={"center"}
                width={"325px"}
                textColor={"#000000"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ Enroll as a STUDENT or enroll your children and other
                dependents for step-by-step online training and certification.
              </Text>
              <Text
                textAlign={"center"}
                width={"350px"}
                textColor={"#000000"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ Register your CLUBS to enjoy educational, managerial,
                health, social, financial, and other benefits.
              </Text>
              <Text
                textAlign={"center"}
                width={"375px"}
                p={{ base: "3", md: "6" }}
                textColor={"#000000"}
                m={{ base: "4", md: "1" }}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ Claim interim leadership of a PROVINCIAL SAMMA
                ASSOCIATION to enjoy more benefits, including managing a
                percentage of donations to WSF via the site.
              </Text>
              <Text
                textAlign={"center"}
                width={"400px"}
                p={{ base: "3", md: "6" }}
                m={{ base: "4", md: "1" }}
                mb={"4"}
                textColor={"#000000"}
                boxShadow="base"
                rounded="md"
              >
                ⭐ ⭐ ⭐ ⭐ ⭐ Claim interim leadership of a NATIONAL SAMMA
                ASSOCIATION for even more benefits, including managing an
                increased percentage of donations to WSF via the site.
              </Text>
              <CoursesGrid setGetStarted={setGetStarted} />
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"100%"}
                p={6}
                bg={"whitesmoke"}
              >
                <LinkBox
                  as="article"
                  maxW="sm"
                  borderWidth="1px"
                  rounded="md"
                  width={"100%"}
                  background={"green"}
                  textAlign={"center"}
                  textColor={"white"}
                  p={"2"}
                  border={"3px solid black"}
                  onClick={handleDownload}
                >
                  <LinkOverlay
                    userSelect={"none"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    href="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1730722401/sammaV5.pdf"
                    target="_blank"
                    download
                    fontSize={"xl"}
                    fontWeight={"bold"}
                  >
                    <RxDownload />
                    <Text pl={"4"}>Download Samma Book V5</Text>
                  </LinkOverlay>
                </LinkBox>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  fontSize={"small"}
                  textColor={"black"}
                  p={"6"}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <TbCloudDownload fontSize={"2rem"} />{" "}
                      <Text pl={"4"}>
                        {Intl.NumberFormat().format(count)} &nbsp; DOWNLOADS
                      </Text>
                    </>
                  )}
                </Box>
                <Button
                  borderRadius={20}
                  onClick={() => setGetStarted(true)}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  m={{ base: "2" }}
                  mt={"5"}
                  color={"white"}
                >
                  Get Started Now!
                </Button>
              </Box>
              <TestimonialsCarousel />
              <PollComponent />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text mb={"6"}>Donations and Support</Text>
              <Box
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                position={"relative"}
                fontSize={"small"}
              >
                <Box margintop={0} flex={"1"} mb={{ base: "20px", md: "0" }}>
                  <Image
                    src={logo9}
                    width={{ base: "250px", md: "300px", lg: "350px" }}
                    height={"auto"}
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
                    mx={"auto"}
                    mb={"10px"}
                    loading="lazy"
                    boxShadow="dark-lg"
                    p="6"
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
                    m={1}
                    px={{ base: "10px", md: "0" }}
                  >
                    <FcDonate style={{ fontSize: "3rem" }} />
                    Your donation is crucial in realizing our ambitious vision.
                    <br /> <br />
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
                      <Text>
                        Mpesa Till Number:
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
                  marginTop="-3rem"
                  fontSize={"small"}
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
                        Mpesa Till Number: <br />
                        <Text color={"black"} fontWeight={"extrabold"}>
                          858447
                        </Text>
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box flex={"1"} position={"relative"} m={1} fontSize={"small"}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1716192064/kumbi.jpg"
                    }
                    width={"250px"}
                    height={"auto"}
                    borderRadius={2}
                    mx={"auto"}
                    boxShadow="dark-lg"
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
                    p="6"
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
                    Proposed Design
                  </Text>
                  <Text
                    textAlign={"center"}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    p={"3"}
                    fontSize={"small"}
                    m={1}
                    px={{ base: "10px", md: "0" }}
                  >
                    <BiDonateHeart
                      style={{ fontSize: "3rem", color: "green" }}
                    />
                    Your support will help establish our international samma
                    headquarters and build a world-class events facility. <br />{" "}
                    <br />
                    Expanding our global impact of bringing people of nations
                    together in thrilling sporting activities, fostering
                    international friendships, business connections and
                    promoting sports tourism.
                    <br /> <br /> Thanking you in advance for your generosity.
                  </Text>
                </Box>
              </Box>

              <Button
                borderRadius={20}
                onClick={() => setGetStarted(true)}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                m={{ base: "2" }}
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
                  <Link
                    href="https://instagram.com/worldsamma"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    <CiInstagram />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@worldsammafederation"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    <CiYoutube />
                  </Link>
                  <Link
                    href="https://x.com/worldsamma"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    <FaXTwitter />
                  </Link>
                  <Link
                    href="https://facebook.com/worldsamma"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    <CiFacebook />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@worldsamma"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    <FaTiktok />
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
                  fontSize={"small"}
                  width={"100%"}
                >
                  Samma is a modern hybrid martial art from Eastern Africa with
                  its own training curriculum (cheni 6) and a distinctive
                  sparring method that combines the three ranges of man to man
                  combat, that is; strike by an extension/stick, strike by limb
                  (elbow, fist, knee and foot) and finally grappling.
                </GridItem>
                <GridItem
                  colSpan={3}
                  width={"100%"}
                  mt={"6"}
                  fontSize={"small"}
                >
                  <Link
                    href="https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7"
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                  >
                    Terms and Conditions
                  </Link>
                </GridItem>
                <GridItem colSpan={3} width={"100%"}>
                  <Box
                    textAlign={"center"}
                    fontSize={"small"}
                    textColor={"grey"}
                    width={"100%"}
                    mt={"3"}
                  >
                    <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
                    All rights reserved. Terms and conditions apply. For queries
                    and comments Email: support@worldsamma.org
                  </Box>
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

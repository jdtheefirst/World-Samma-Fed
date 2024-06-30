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
  chakra,
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
import brushImage from "../brushImage.jpg"
import { FaArrowCircleRight, FaArrowAltCircleDown, FaRocket, FaTiktok, } from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import { BiDonateHeart } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";



import CoffeeModal from "../miscellenious/coffee";
import { CiFacebook, CiInstagram, CiLocationOn, CiYoutube } from "react-icons/ci";
import TestimonialsCarousel from "../components/Carousel";
import PollComponent from "../components/Polls";

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

const BrushText = ({ children }) => (
  <chakra.span
    backgroundImage={`url(${brushImage})`}
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
    backgroundPosition="center"
    display="inline-block"
    padding="0 5px"
    fontSize="x-large" fontWeight="extrabold" fontFamily="sans-serif"
    p={"6"}
  >
    {children}
  </chakra.span>
);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Box display="flex" flexDir={"column"} width="100%">
      <Box display="flex" justifyContent="flex-end" alignItems={"center"} width="100%" boxShadow="2xl" background={"#2d1950"} p={{base: "2", md: "4"}} position={"fixed"} zIndex={20}>
      <Text
  display={"flex"}
  textColor={"whitesmoke"}
  textAlign={"start"}
  width={"100%"}
  fontSize={{ base: "medium", md: "x-large" }}
  fontWeight={"bold"}
>
  <strong style={{ fontWeight: "extrabold", fontFamily: "fantacy", textEmphasis: "GrayText" }}>
    SAMMA
  </strong>
  {'\u00A0'}- All-In-One Martial Art
</Text>
      <FaRocket className="rocket-animation" size={20} />
      <Menu>
        <MenuButton as={IconButton} icon={<GiHamburgerMenu style={{color: "white", fontSize: "30px"}} />} variant="outline" colorScheme="#2d1950"/>
        <MenuList borderRadius={"none"}>
          <MenuItem
            onClick={() => {
              navigate("/about");
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
        >
          <Image
            src={logo1}
            boxSize={{ base: "60px", md: "120px" }}
            width={{ base: "65px", md: "130px" }}
            borderRadius={10}
            loading="lazy"
            alt={`Logo 1*`}
          />
          <Text
            textAlign={"center"}
            fontSize={{
              base: "21px",
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
            textShadow={{base: "1px 1px 1px #000", md: "2px 2px 2px #000"}}
          >
            WORLD SAMMA FEDERATION
          </Text>
          <Image
            src={logo2}
            boxSize={{ base: "60px", md: "120px" }}
            width={{ base: "70px", md: "140px" }}
            alt={`Logo 2*`}
            loading="lazy"
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
            <Box display={"flex"} justifyContent={"space-around"} width={"80"}><Link href="https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847" target="_blank" rel="noopener noreferrer" p={1}>
                  Privacy Policy
                  </Link>
                  <Link href="https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7" target="_blank" rel="noopener noreferrer" p={1}>
                  Terms and Conditions
                  </Link>
            </Box>
            <Text
              textAlign={"center"}
              fontSize={"small"}
              position="sticky"
              width="100%"
              mt={'6'}
            >
              <Text mb={'3'}>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
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
                height={{base: "15%", md: "25%"}}
                opacity={0.5}
                loading="lazy"
                border={"2px solid #2d1950"}
                rounded="md"
                bg="blackAlpha.400"
                borderRadius={"full"}
                bottom={"70%"}
              />
              <Text
                textAlign={"center"}
                fontSize={"md"}
                width={"300px"}
                p={{ base: "3", md: "6" }}
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
              <PollComponent/>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
               <BrushText>Donations and Support</BrushText>
              <Box
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                minH={{ base: "400px", md: "200px" }}
                position={"relative"}
              
              >
                <Box
                  flex={"1"}
                  position={"relative"}
                  mb={{ base: "20px", md: "0" }}
                >
                  <Image
                    src={logo9}
                    boxSize={"250px"}
                    borderRadius={2}
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
                    mx={"auto"}
                    mb={"10px"}
                    loading="lazy"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    bg="blackAlpha.400"
                  />
                  <Text
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
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
                    <br/> <br/> 
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
                  marginTop= "-3rem"
                 
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
                <Box
                  flex={"1"}
                  position={"relative"}
                  m={1}
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1716192064/kumbi.jpg"
                    }
                    boxSize={"250px"}
                    borderRadius={2}
                    mx={"auto"}
                    boxShadow="dark-lg"
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
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
                    m={1}
                    px={{ base: "10px", md: "0" }}
                  >
                    <BiDonateHeart
                      style={{ fontSize: "3rem", color: "green" }}
                    />
                    Your support will help establish our international samma
                    headquarters and build a world-class events facility. <br/> <br/> 
                    Expanding our global impact of bringing
                    people of nations together in thrilling sporting activities,
                    fostering international friendships, business connections
                    and promoting sports tourism.
                    <br/> <br/>  Thanking you in advance for
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
                  <Link href="https://instagram.com/worldsamma" target="_blank" rel="noopener noreferrer"  p={2}>
                  <CiInstagram />
                  </Link>
                  <Link href="https://www.youtube.com/@worldsammafederation"  target="_blank" rel="noopener noreferrer" p={2}>
                  <CiYoutube />
                  </Link>
                  <Link href="https://x.com/worldsamma" target="_blank" rel="noopener noreferrer" p={2}>
                 <FaXTwitter />
                 </Link>
                  <Link href="https://facebook.com/worldsamma" target="_blank" rel="noopener noreferrer" p={2}>
                  <CiFacebook />
                  </Link>
                  <Link href="https://www.tiktok.com/@worldsamma" target="_blank" rel="noopener noreferrer" p={2}>
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
                  width={"100%"}
                >
                  <Link href="https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847" target="_blank" rel="noopener noreferrer" p={2} >
                  Privacy Policy
                  </Link>
                  <Link href="https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7" target="_blank" rel="noopener noreferrer" p={2}>
                  Terms and Conditions
                  </Link>
                </GridItem> 
                <GridItem
                  colSpan={3}
                  width={"100%"}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={"small"}
                    textColor={"grey"}
                    width={"100%"}
                    mt={"3"}
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
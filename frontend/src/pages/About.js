import React, { useState } from "react";
import { Box, Text, Center, Image } from "@chakra-ui/react";
import logo8 from "../assets/images/Mombasa.jpg";
import logo9 from "../assets/images/Nairobi.jpg";
import { CiLocationOn } from "react-icons/ci";
import CoffeeModal from "../miscellenious/coffee";

const AboutPage = () => {
  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <Center
      display={"flex"}
      flexDir={"column"}
      w="100%"
      background={"whitesmoke"}
      overflow={"auto"}
    >
      {show && <CoffeeModal isOpen={true} onClose={handleCloseModal} />}
      <Box
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          backgroundColor: "#f4f4f4",
          color: "#333",
          margin: 0,
          padding: 4,
        }}
      >
        <div id="root">
          <header
            style={{
              backgroundColor: "#003366",
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h1 style={{ fontSize: "2.5em" }}>
              Welcome to the World Samma Federation
            </h1>
            <p style={{ fontSize: "1.2em", marginTop: "10px" }}>
              Your global community for martial arts and other sports
              enthusiasts. Join us to connect, learn, and grow in your martial
              arts journey.
            </p>
          </header>
          <main style={{ padding: "20px" }}>
            <section>
              <a href="/">Back</a>
            </section>
            <section
              id="about"
              style={{ marginBottom: "30px", textAlign: "start" }}
            >
              <h1 style={{ color: "#003366" }}>About Us</h1>
              <p>
                The World Samma Federation is dedicated to promoting the art of
                Samma and supporting martial artists worldwide. Our community
                provides resources, training, and events for all skill levels.
              </p>
            </section>
            <section
              id="features"
              style={{ marginBottom: "30px", textAlign: "start" }}
            >
              <h1 style={{ color: "#003366" }}>Features</h1>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>Comprehensive training programs</li>
                <li>Global competitions and events</li>
                <li>Exclusive member resources</li>
                <li>Community forums and support</li>
              </ul>
            </section>
            <section style={{ marginBottom: "30px", textAlign: "start" }}>
              <h1 style={{ color: "#003366" }}>Archives</h1>
              <Text fontFamily="Arial, sans-serif" mb={4}>
                <strong
                  style={{
                    fontWeight: "extrabold",
                    fontFamily: "fantacy",
                    textEmphasis: "GrayText",
                  }}
                >
                  15th March 2011 (in Mombasa City Centre):
                </strong>
                {"\u00A0"}
                Formation of the Society of African Mixed Martial Arts and use
                of SAMMA as its acronym (acronym inspired by east African street
                slang word for a flip, "sama"). Then making of cheni 6
                curriculum began with "designing" of the tamati (sign out)
                pattern.
              </Text>
              <Text fontFamily="Arial, sans-serif" mb={4}>
                <strong
                  style={{
                    fontWeight: "extrabold",
                    fontFamily: "fantacy",
                    textEmphasis: "GrayText",
                  }}
                >
                  1st August 2013 (in Mombasa North Coast):
                </strong>
                {"\u00A0"}
                Transformation of SAMMA to a martial art after the completion of
                the main contents of cheni 6 curriculum. Immediate formation of
                the World Samma Federation (WSF) to unify and voice for wasamma
                (samma exponents) worldwide.
              </Text>
              <Text fontFamily="Arial, sans-serif" mb={4}>
                <strong
                  style={{
                    fontWeight: "extrabold",
                    fontFamily: "fantacy",
                    textEmphasis: "GrayText",
                  }}
                >
                  March 2021:
                </strong>
                {"\u00A0"}
                Introduction of samma pigano (sparring) method at Kenya Coast,
                that is; THREE ranges of man to man combat (stick, elbow, punch,
                knee, kick and finally grappling).
              </Text>
              <a
                href="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1730722401/sammaV5.pdf"
                download
                style={{ textDecoration: "none", color: "blue" }} // Adjust color as needed
              >
                Download Our Curriculum (PDF)
              </a>
              <Text fontSize={"md"} textAlign={"center"} mb={"6"}>
                ℹ️ Help us translate the curriculum booklet into other world
                languages by sending an editable draft to the Email:
                support@worldsamma.org. Include your name, country, and province
                for a credit/mention. Thanking you in advance.
              </Text>
            </section>
            <Box
              display="flex"
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
            >
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={{ base: "20px", md: "0" }}
                onClick={() => setShow(true)}
                cursor="pointer"
                textAlign="center"
              >
                <Image
                  src={logo9}
                  boxSize={{ base: "300px", md: "400px" }}
                  borderRadius={2}
                  mx="auto"
                  mb="10px"
                  boxShadow="dark-lg"
                  p="6"
                  rounded="md"
                  bg="white"
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textColor="goldenrod"
                >
                  <CiLocationOn style={{ color: "red", marginRight: "5px" }} />
                  Nairobi, Kenya
                </Box>
              </Box>

              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={{ base: "20px", md: "0" }}
                onClick={() => setShow(true)}
                cursor="pointer"
              >
                <Image
                  src={logo8}
                  boxSize={{ base: "300px", md: "400px" }}
                  borderRadius={2}
                  mx="auto"
                  mb="10px"
                  boxShadow="dark-lg"
                  p="6"
                  rounded="md"
                  bg="white"
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textColor="goldenrod"
                >
                  <CiLocationOn style={{ color: "red", marginRight: "5px" }} />
                  Mombasa, Kenya
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={{ base: "20px", md: "0" }}
                onClick={() => setShow(true)}
                cursor="pointer"
                textAlign="center"
              >
                <Image
                  src={
                    "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720940066/training_dmljwp.jpg"
                  }
                  boxSize={{ base: "300px", md: "400px" }}
                  borderRadius={2}
                  mx="auto"
                  mb="10px"
                  boxShadow="dark-lg"
                  p="6"
                  rounded="md"
                  bg="white"
                  loading="lazy"
                />
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textColor="goldenrod"
                >
                  <CiLocationOn style={{ color: "red", marginRight: "5px" }} />
                  Nairobi, Kenya
                </Box>
              </Box>
            </Box>
          </main>
          <footer
            style={{
              backgroundColor: "#003366",
              color: "white",
              textAlign: "center",
              padding: "10px",
              width: "100%",
            }}
          >
            <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
            All rights reserved. Terms and conditions apply. For queries and
            comments Email: support@worldsamma.org
          </footer>
        </div>
      </Box>
    </Center>
  );
};

export default AboutPage;

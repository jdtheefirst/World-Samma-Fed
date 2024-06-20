import React from "react";
import { Box, Text, Center, Link, Image, Button } from "@chakra-ui/react";
import logo8 from "../Mombasa.jpg";
import logo9 from "../Nairobi.jpg";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate()
  return (
    <Center
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w="100%"
      h="100vh"
      background={"whitesmoke"}
    >
      <Box p={4} m={0} background={"green.400"} width={"100%"}>
        {" "}
        <Text textColor={"white"}>About Us</Text>
        <text fontSize={"sm"}>
          Welcome to our website. Learn more about us!
        </text>
      </Box>
      <Button  onClick={() => {
              navigate("/")
            }}
            _hover={{ backgroundColor: "transparent", color: "gold", fontSize: "small" }}
            background="transparent"
            color={"blue"}
            border={"none"}>Go back</Button>

      <Box
        textAlign="center"
        overflow={"auto"}
        background={"whitesmoke"}
        width={"100%"}
        p={5}
      >
        <Text fontSize="xl" mb={4}>
          15th March 2011 (in Mombasa City Centre): Formation of the Society of
          African Mixed Martial Arts and use of SAMMA as its acronym (acronym
          inspired by east African street slang word for a flip, "sama"). Then
          making of cheni 6 curriculum begun with "designing" of the tamati
          (sign out) pattern.
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mb={4}>
          Society of African Mixed Martial Arts(SAMMA)
        </Text>
        <Text fontSize="xl" mb={4}>
          1st August 2013 (in Mombasa North Coast): Transformation of SAMMA to a
          martial art after the completion of the main contents of cheni 6
          curriculum. Immediate formation of the World Samma Federation (WSF) to
          unify and voice for wasamma (samma exponents) worldwide.
        </Text>
        <Text fontSize="xl" mb={4}>
          March 2021: Introduction of samma pigano (sparring) method at Kenya
          Coast, that is; THREE ranges of man to man combat (stick, elbow,
          punch, knee, kick and finally grappling).
        </Text>
        <a
          href="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1715025413/sammaV3_cnof4v.pdf"
          download
          style={{ textDecoration: "none", color: "blue" }} // Adjust color as needed
        >
          Download Our Curriculum (PDF)
        </a>
        <Text fontSize={"sm"} textAlign={"center"}>
          ℹ️ Help us translate the curriculum booklet into other world languages
          by sending an editable draft to support@worldsamma.org Include your
          name, country, and province for a credit/mention. Thanking you in
          advance.
        </Text>
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
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={logo9}
              boxSize={{ base: "300px", md: "400px" }}
              borderRadius={2}
              mx={"auto"}
              mb={"10px"}
              boxShadow="dark-lg"
              p="6"
              rounded="md"
              bg="white"
            />
            <Text
              textAlign={"center"}
              textColor={"goldenrod"}
              px={{ base: "20px", md: "0" }}
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
              />{" "}
              Nairobi, Kenya
            </Text>
          </Box>
          <Box
            flex={"1"}
            position={"relative"}
            mb={{ base: "20px", md: "0" }}
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={logo8}
              boxSize={{ base: "300px", md: "400px" }}
              borderRadius={2}
              mx={"auto"}
              mb={"10px"}
              boxShadow="dark-lg"
              p="6"
              rounded="md"
              bg="white"
            />
            <Text
              textColor={"goldenrod"}
              px={{ base: "20px", md: "0" }}
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
              Mombasa, Kenya
            </Text>
          </Box>
        </Box>
      </Box>

      <Text
        textAlign={"center"}
        fontSize={"small"}
        p={"6"}
        px={"6"}
        textColor={"grey"}
        background="blackAlpha.200"
        width={"100%"}
      >
        <Text>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
        All rights reserved. Terms and conditions apply. For queries and
        comments email support@worldsamma.org.
      </Text>
    </Center>
  );
};

export default AboutPage;

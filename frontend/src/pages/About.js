import React from "react";
import { Box, Text, Center, Link } from "@chakra-ui/react";

const AboutPage = () => {
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
          href="https://res.cloudinary.com/dsdlgmgwi/image/upload/v1713249048/Samma_1_aprej8.pdf"
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

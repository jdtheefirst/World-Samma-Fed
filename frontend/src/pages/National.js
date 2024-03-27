import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import UpperNav from "../miscellenious/upperNav";
import formatMessageTime from "../components/config/formatTime";
import { getCountryFlag, getStatesOfCountry } from "../assets/state";
import NationalInterim from "../Authentication/NationalInterim";

const National = () => {
  const { user, national } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const flag = getCountryFlag(user?.country);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user) navigate("/dashboard");

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user?.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user]);

  const handleInterim = () => {
    if (user.belt !== "Black") {
      toast({
        title: `Your highest rank is ${user.belt}`,
        description:
          "Head of all National Associations must have attained Black.",
        status: "info",
        isClosable: true,
        duration: 5000,
      });
    } else {
      setShow(true);
    }
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      backgroundColor="white"
      overflowY={"auto"}
      width="100%"
    >
      <UpperNav />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        mt={20}
      >
        <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
          {user?.country} Samma Association {flag}
        </Text>
        <Text textAlign={""}>States</Text>
        <Box
          height={"200px"}
          width={{ base: "97%", md: "70%" }}
          overflowY={"scroll"}
          m={1}
          boxShadow="2xl"
          p="6"
          rounded="md"
          bg="white"
        >
          {" "}
          {subdivisions &&
            subdivisions.map((subdivision) => (
              <Button key={subdivision._id} m={1}>
                {subdivision.name}
              </Button>
            ))}
        </Box>

        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow="dark-lg"
          m={2}
          p={4}
          rounded="md"
          bg="white"
          fontStyle={"italic"}
        >
          {" "}
          Officials: {!national && "Viable position"}
          {national !== null ? (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow="dark-lg"
              p="6"
              rounded="md"
              bg="white"
              fontStyle={"italic"}
            >
              <Text>
                Coach: {national?.nationalCoach?.name}{" "}
                {national?.nationalCoach?.otherName}{" "}
                {national?.nationalCoach?.belt}
              </Text>
              <Text>Chairperson: {national?.chairman} </Text>
              <Text>Secretary: {national?.secretary} </Text>
              <Text>viceChairperson: {national?.viceChairman} </Text>
              <Text>
                Interim commencement: {formatMessageTime(national?.updatedAt)}{" "}
              </Text>
            </Box>
          ) : (
            <>
              {" "}
              {!show && (
                <Button
                  bg={"purple"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  borderRadius={20}
                  onClick={() => {
                    handleInterim();
                  }}
                >
                  Interim
                </Button>
              )}
              {show && <NationalInterim states={subdivisions.length} />}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default National;

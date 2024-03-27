import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import ProvincialCoachForm from "../Authentication/ProvinceInterim";
import formatMessageTime from "../components/config/formatTime";
import { getCountryFlag } from "../assets/state";

const Provience = () => {
  const { user, province } = ChatState();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const flag = getCountryFlag(user?.country);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/clubs/${user.country}/${user.provinces}`,
        config
      );

      setClubs(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching or creating clubs:", error);
    }
  }, [user, setClubs, toast, setLoading]);
  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

  const handleInterim = () => {
    if (user.belt !== "Black") {
      toast({
        title: `Your highest rank is ${user.belt}`,
        description:
          "Head of a Provincial Association must have attained Black.",
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
          Country: {user?.country} {flag}
        </Text>
        <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
          {user?.provinces} Samma Association
        </Text>

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
          {loading && <Spinner />}
          {clubs &&
            clubs.map((subdivision) => (
              <Button
                border={"1px solid #e803fc"}
                m={1}
                key={subdivision._id}
                onClick={() =>
                  navigate(`/showclub/${subdivision._id}/${false}`)
                }
              >
                {subdivision.name}
                <Text
                  fontSize={"xm"}
                  bg={useColorModeValue("green.50", "green.900")}
                  color={"green.500"}
                  rounded={"full"}
                >
                  (*
                  {subdivision.registration ? "Registered" : "Unregistered"})
                </Text>
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
          {loading && <Spinner />}
          Officials: {!province && "Viable position"}
          {province !== null ? (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow="2xl"
              p="6"
              rounded="md"
              bg="white"
              fontStyle={"italic"}
            >
              <Text>
                Coach: {province?.provincialCoach?.name}{" "}
                {province?.provincialCoach?.otherName}{" "}
                {province?.provincialCoach?.belt}
              </Text>
              <Text>Chairperson: {province?.chairman} </Text>
              <Text>Secretary: {province?.secretary} </Text>
              <Text>viceChairperson: {province?.viceChairman} </Text>
              <Text>
                Interim commencement: {formatMessageTime(province?.updatedAt)}{" "}
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
              {show && <ProvincialCoachForm />}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Provience;

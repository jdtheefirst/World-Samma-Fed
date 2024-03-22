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

const Provience = () => {
  const { user } = ChatState();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [province, setProvince] = useState(undefined);
  const navigate = useNavigate();
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
        `/api/province/officials/${user.country}/${user.provinces}`,
        config
      );
      if (data.length === 0) {
      } else {
        setProvince(data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "An Error Occurred!",
        description: "Try again after sometime.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
  }, [user, setClubs, setProvince, toast, setLoading]);
  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

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
          Country: {user?.country}
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
          <Text textAlign={"start"} fontWeight={"bold"}>
            Registered clubs
          </Text>
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
        <Box>
          Officials: {province && "Viable position"}
          {province === undefined ? (
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
            <ProvincialCoachForm />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Provience;

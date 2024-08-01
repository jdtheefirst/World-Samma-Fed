import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
<<<<<<< HEAD
  Center,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { getStatesOfCountry } from "../assets/state";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import ProvincialCoachForm from "../Authentication/ProvinceInterim";

const Provience = () => {
  const { user } = ChatState();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  console.log(user);
  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
=======
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import ProvincialCoachForm from "../Authentication/ProvinceInterim";
import formatMessageTime from "../components/config/formatTime";
import { getCountryFlag } from "../assets/state";
import EventBox from "../components/EventBoxz"
import FooterAchieves from "../components/FooterAchieves";

const Provience = () => {
  const { user, province } = ChatState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const flag = getCountryFlag(user?.country);
  const [donation, setDonation] = useState(undefined);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const getDonations = useCallback(async () => {
>>>>>>> master
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
<<<<<<< HEAD

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
  }, [user, setClubs]);
  console.log(clubs);
  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);
=======
      const { data } = await axios.get(`/api/donate/province`, config);
      setDonation(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "An Error Occurred!",
        description: "Please try again later",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      getDonations();
    }else{
      navigate("/dashboard");
    }
  }, [getDonations, navigate, user]);

  const handleInterim = () => {
    if (user.belt !== "Black") {
      toast({
        title: `Your highest rank is ${user.belt}`,
        description:
          "Head of a provincial association must have attained at least black belt 1.",
        status: "info",
        isClosable: true,
        duration: 10000,
      });
    } else {
      setShow(true);
    }
  };
>>>>>>> master

  return (
    <Box
      display="flex"
      flexDir="column"
<<<<<<< HEAD
      backgroundColor="Background"
      overflowY={"auto"}
      width="100%"
=======
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor="whitesmoke"
      overflowY={"auto"}
      width="100%"
      minH={"100vh"}
      p={"6"}
>>>>>>> master
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
<<<<<<< HEAD
          Country: {user?.country}
=======
          Country: {user?.country} {flag}
>>>>>>> master
        </Text>
        <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
          {user?.provinces} Samma Association
        </Text>
<<<<<<< HEAD

        <Box
          height={"200px"}
          width={{ base: "97%", md: "70%" }}
          overflowY={"scroll"}
          m={1}
        >
          <Text textAlign={"start"}>Registered clubs</Text>
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
          <Text>Officials: Viable Seat</Text>
          <ProvincialCoachForm />
        </Box>
=======
        <Box textAlign={"center"}>
          {loading ? (
            <Spinner size={"sm"} />
          ) : (
            <Text>
              Account: $
              {donation && donation.length > 0 ? donation[0].fund : "0"}
            </Text>
          )}
        </Box>
        <EventBox provincePage={true}/>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow="base"
          p={4}
          rounded="md"
          bg="whitesmoke"
          fontStyle={"italic"}
          width={"100%"}
        >
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
                  border={"none"}
                  fontSize={"small"}
                >
                  Claim Interim Leadership
                </Button>
              )}
              {show && <ProvincialCoachForm />}
            </>
          )}
        </Box>
        <FooterAchieves/>
>>>>>>> master
      </Box>
    </Box>
  );
};

export default Provience;

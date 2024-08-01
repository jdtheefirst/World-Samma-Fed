import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Text, useToast, Link, useColorModeValue } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import UpperNav from "../miscellenious/upperNav";
import formatMessageTime from "../components/config/formatTime";
import { getCountryFlag, getStatesOfCountry } from "../assets/state";
import NationalInterim from "../Authentication/NationalInterim";
import axios from "axios";
import EventBox from "../components/EventBoxz";
import FooterAchieves from "../components/FooterAchieves";

const National = () => {
  const { user, national } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const flag = getCountryFlag(user?.country);
  const [donation, setDonation] = useState(undefined);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const toast = useToast();
  const getDonations = useCallback(async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/donate/national`, config);
      
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
  }, [toast, user]);

  const fetchAllClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/national/all/${user.country}`,
        config
      );

      setClubs(data);

    } catch (error) {
      console.error("Error fetching or creating clubs:", error);
    }
  }, [user, toast]);

  useEffect(()=>{
  if(user){
  fetchAllClubs();
  }
  }, [fetchAllClubs, user]);

  useEffect(() => {
    if (!user) navigate("/dashboard");

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user?.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
    getDonations();
  }, [user]);

  const handleInterim = () => {
    if (user.belt !== "Black") {
      toast({
        title: `Your highest rank is ${user.belt}!`,
        description:
          "Head of a National Association must have attained at least black belt 3.",
        status: "info",
        isClosable: true,
        duration: 10000,
      });
    } else {
      setShow(true);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent={"start"}
      alignItems={"center"}
      flexDir="column"
      backgroundColor="whitesmoke"
      overflowY={"auto"}
      width="100%"
      minH={"100vh"}
    >
      <UpperNav />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        width={"100%"}
        mt={20}
      >
        <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
          {user?.country} Samma Association {flag}
        </Text>

        <Box textAlign={"center"}>
          {loading ? (
            <Spinner size={"sm"} />
          ) : (
            <Text>
              Account Balance: $
              {donation && donation.length > 0 ? donation[0].fund : "0"}
            </Text>
          )}
        </Box>
        <Text textAlign={"center"} p={"6"}> States: {subdivisions &&
       subdivisions.length}</Text>
        <Box
          maxH={"20rem"}
          width={"100%"}
          overflowY={"scroll"}
          p="6"
          bg="whitesmoke"
          fontSize={"small"}
          mb={'6'}
        >
          {clubs.length === 0 && (
            <>
              <Text fontWeight={"bold"}>
                No clubs available in this region yet 🚫
              </Text>
              <Link href="/clubs" textDecoration={"underline"}>
                Start your own club and lead the way!
              </Link>
            </>
          )}
          {clubs.length > 0 &&
            clubs.map((subdivision, index) => (
              <Button
                border={"none"}
                display={"flex"}
                justifyContent={"space-around"}
                key={index}
                onClick={() =>
                  navigate(`/showclub/${subdivision._id}/${false}`)
                }
                width={"100%"}
                mb={"2"}
              >
                <Text fontSize={"xs"}>{subdivision.name}</Text>
                <Text
                  fontSize={"xs"}
                  bg={useColorModeValue("green.50", "green.900")}
                  color={"green.500"}
                  rounded={"full"}
                  p={"2"}
                >
                  {subdivision.registered ? "Registered" : "Unregistered"}
                </Text>
              </Button>
            ))}
        </Box>
        <EventBox nationalPage={true}/>
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
          {" "}
          Officials: {!national && "Viable position"}
          {national !== null ? (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow="base"
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
                  border={"none"}
                  fontSize={"small"}
                >
                  Claim Interim leadership
                </Button>
              )}
              {show && <NationalInterim states={subdivisions.length} />}
            </>
          )}
        </Box>
        <FooterAchieves />
      </Box>
    </Box>
  );
};

export default National;

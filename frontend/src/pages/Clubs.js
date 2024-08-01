import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { RxEyeNone } from "react-icons/rx";
import { ChatState } from "../components/Context/ChatProvider";
import { getStatesOfCountry, getCountryFlag } from "../assets/state";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { ClubRegistration } from "../Authentication/club";
import FooterAchieves from "../components/FooterAchieves";

const Clubs = () => {
  const { user, club } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [province, setProvince] = useState(user?.provinces);
  const [fillForm, setFillForm] = useState(false);
  const navigate = useNavigate();
  const flag = getCountryFlag(user?.country);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    setLoading(true);
    setClubs([]);
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/${user.country}/${province}`,
        config
      );
      setClubs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setClubs([]);
      setLoading(false);
    }
  }, [user, setClubs, province ]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

  useEffect(() => {

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user?.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user?.country]);

  const handleCreateClub = () => {
    const belts = [
      "Guest",
      "Yellow",
      "Orange",
      "Red",
      "Purple",
      "Green",
      "Blue",
      "Brown",
      "Black",
    ];

    if (user && belts.indexOf(user.belt) >= belts.indexOf("Orange")) {
      setFillForm(true);
    } else {
      toast({
        title: "You need to elevate your craft to at least Orange Belt!",
        description: "Requirements not attained yet",
        status: "info",
        duration: 5000,
        position: "bottom",
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      backgroundColor="whitesmoke"
      width="100%"
      overflowX={"auto"}
      justifyContent={"start"}
      alignItems={"center"}
      minH={"100vh"}
    >
        <UpperNav />
      <Text
        textAlign="center"
        fontSize={"large"}
        fontWeight={"bold"}
        p={3}
        mt={20}
      >
        Country: {user?.country} {flag}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={{ base: "97%", md: "70%" }}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
        fontStyle={"italic"}
        mb={"6"}
      >
        <FormControl
          id="provinces"
          isRequired
          textAlign={"center"}
          width={{ base: "100%", md: "60%" }}
          p={3}
        >
          <FormLabel textAlign={"center"}>Select State</FormLabel>
          <Select
            placeholder="Select your province"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            isDisabled={loading}
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              fetchClubs(e.target.value);
            }}
          >
            {subdivisions &&
              subdivisions.map((subdivision, index) => (
                <option
                  key={index}
                  value={subdivision.value}
                  style={{ color: "black" }}
                >
                  {subdivision.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <Text fontSize={"larger"} fontWeight={"bold"} textColor={"darkgreen"}>
          Available Clubs in {province}
        </Text>

        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"10rem"}
          m={1}
          p={0}
          borderRadius={3}
          width={{ base: "100%", md: "80%" }}
         >
          {" "}
          {loading ? (
            <Spinner size={"xl"} speed="0.65s" />
          ) : (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              maxH={"300px"}
              width={"100%"}
            >
              {clubs.length > 0 ? (
                clubs.map((club, index) => (
                  <Button
                    key={index}
                    width={"100%"}
                    border={"none"}
                    onClick={() => navigate(`/showclub/${club._id}/${false}`)}
                    mb={"2"}
                    justifyContent={"space-around"}
                  >
                <Text fontSize={"xs"}>{club.name}</Text>
                <Text
                  fontSize={"xs"}
                  bg={useColorModeValue("green.50", "green.900")}
                  color={"green.500"}
                  rounded={"full"}
                  p={"2"}
                >
                  {club?.registered ? "Registered" : "Unregistered"}
                </Text>
                  </Button>
                ))
              ) : (
                <>
                  <Text textAlign={"center"}>
                  <RxEyeNone />
                  </Text>

                  <Text fontWeight={"bold"}>
                    No clubs available in this region yet.
                  </Text>
                  <Text>Start your own club below and lead the way!</Text>
                </>
              )}
            </Box>
          )}
        </Box>

        {user?.couch ? (
          <Box m={2}>Your Club</Box>
        ) : (
          <Button
            display={"flex"}
            backgroundColor={"#c255ed"}
            borderRadius={20}
            fontSize={"small"}
            border={"none"}
            onClick={() => {
              handleCreateClub();
            }}
            m={2}
          >
              {club && club.registered
                ? "Continue Registering"
                : "Register Club"}
          </Button>
        )}
      </Box>
      {fillForm && <ClubRegistration onClose={() => setFillForm(false)} />}
      <FooterAchieves/>
    </Box>
  );
};

export default Clubs;

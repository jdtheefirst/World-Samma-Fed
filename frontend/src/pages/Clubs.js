import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { getStatesOfCountry, getCountryFlag } from "../assets/state";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { ClubRegistration } from "../Authentication/club";

export default function Clubs(){
  const { user, club } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [provience, setProvience] = useState(user?.provinces);
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
        `/api/clubs/${user.country}/${provience}`,
        config
      );
      setClubs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching or creating clubs:", error);
      setClubs([]);
      setLoading(false);
    }
  }, [user, setClubs, provience]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

  useEffect(() => {
    if (!user) navigate("/dashboard");

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user?.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user]);
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
        backgroundColor="Background"
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
        fontStyle={"italic"}
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
            value={provience}
            onChange={(e) => {
              setProvience(e.target.value);
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
          Available Clubs in {provience}
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
            <Spinner />
          ) : (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              maxH={"300px"}
              width={"100%"}
            >
              {clubs && clubs.length > 0 ? (
                clubs.map((club, index) => (
                  <Button
                    key={index}
                    width={"100%"}
                    onClick={() => navigate(`/showclub/${club._id}/${false}`)}
                    m={1}
                  >
                    {index + 1}. {club.name}
                  </Button>
                ))
              ) : (
                <>
                  <Text textAlign={"center"}>
                    <Image
                      src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1708443842/icons8-here-80_oa8vme.png"
                      width={7}
                    />
                  </Text>

                  <Text fontWeight={"bold"}>
                    No clubs available in this region yet 🚫
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
            onClick={() => {
              handleCreateClub();
            }}
            m={2}
          >
            <Text>
              {club && club.registered
                ? "Continue Registering"
                : "Register Club"}
            </Text>
          </Button>
        )}
      </Box>
      {fillForm && <ClubRegistration onClose={() => setFillForm(false)} />}
    </Box>
  );
};

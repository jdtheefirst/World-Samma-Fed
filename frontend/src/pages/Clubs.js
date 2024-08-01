import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
<<<<<<< HEAD
  Image,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
=======
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { RxEyeNone } from "react-icons/rx";
>>>>>>> master
import { ChatState } from "../components/Context/ChatProvider";
import { getStatesOfCountry, getCountryFlag } from "../assets/state";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { ClubRegistration } from "../Authentication/club";
<<<<<<< HEAD

export const Clubs = () => {
  const { user, club } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [provience, setProvience] = useState(user?.provinces);
=======
import FooterAchieves from "../components/FooterAchieves";

const Clubs = () => {
  const { user, club } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [province, setProvince] = useState(user?.provinces);
>>>>>>> master
  const [fillForm, setFillForm] = useState(false);
  const navigate = useNavigate();
  const flag = getCountryFlag(user?.country);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const toast = useToast();
>>>>>>> master

  const fetchClubs = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    setLoading(true);
<<<<<<< HEAD
=======
    setClubs([])
   
>>>>>>> master
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
<<<<<<< HEAD
        `/api/clubs/${user.country}/${provience}`,
=======
        `/api/clubs/${user.country}/${province}`,
>>>>>>> master
        config
      );
      setClubs(data);
      setLoading(false);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error fetching or creating clubs:", error);
    }
  }, [user, setClubs, provience]);
=======
      setClubs([]);
      setLoading(false);
    }
  }, [user, setClubs, province]);
>>>>>>> master

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    fetchClubs();
  }, [fetchClubs, navigate, user]);

  useEffect(() => {
<<<<<<< HEAD
    if (!user) navigate("/dashboard");
=======
>>>>>>> master

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user?.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
<<<<<<< HEAD
  }, [user]);
=======
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
>>>>>>> master

  return (
    <Box
      display="flex"
      flexDir="column"
<<<<<<< HEAD
      backgroundColor="white"
      width="100%"
      height={"100%"}
      position={"relative"}
    >
      <Box
        position={"fixed"}
        background={"Background"}
        zIndex={10}
        width="100%"
      >
        <UpperNav />
      </Box>
=======
      backgroundColor="whitesmoke"
      width="100%"
      overflowX={"auto"}
      justifyContent={"start"}
      alignItems={"center"}
      minH={"100vh"}
    >
        <UpperNav />
>>>>>>> master
      <Text
        textAlign="center"
        fontSize={"large"}
        fontWeight={"bold"}
        p={3}
<<<<<<< HEAD
        mt={14}
=======
        mt={20}
>>>>>>> master
      >
        Country: {user?.country} {flag}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
<<<<<<< HEAD
        width={"100%"}
        backgroundColor="Background"
=======
        width={{ base: "97%", md: "70%" }}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
        fontStyle={"italic"}
        mb={"6"}
>>>>>>> master
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
<<<<<<< HEAD
            value={provience}
            onChange={(e) => {
              setProvience(e.target.value);
=======
            isDisabled={loading}
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
>>>>>>> master
              fetchClubs(e.target.value);
            }}
          >
            {subdivisions &&
<<<<<<< HEAD
              subdivisions.map((subdivision) => (
                <option
                  key={subdivision.value}
=======
              subdivisions.map((subdivision, index) => (
                <option
                  key={index}
>>>>>>> master
                  value={subdivision.value}
                  style={{ color: "black" }}
                >
                  {subdivision.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <Text fontSize={"larger"} fontWeight={"bold"} textColor={"darkgreen"}>
<<<<<<< HEAD
          Available Clubs in {provience}
        </Text>
=======
          Available Clubs in {province}
        </Text>

>>>>>>> master
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
<<<<<<< HEAD
        >
          {" "}
          {loading && <Spinner />}
          {clubs && clubs.length > 0 ? (
            clubs.map((club, index) => (
              <Button
                key={club.code}
                width={"90%"}
                onClick={() => navigate(`/showclub/${club._id}/${false}`)}
              >
                {index + 1}. Club: {club.name}, Reg no: {club.code}
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
              <Text>No Clubs in this region</Text>
            </>
=======
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
>>>>>>> master
          )}
        </Box>

        {user?.couch ? (
          <Box m={2}>Your Club</Box>
        ) : (
          <Button
            display={"flex"}
            backgroundColor={"#c255ed"}
            borderRadius={20}
<<<<<<< HEAD
            onClick={() => {
              setFillForm(true);
            }}
            m={2}
          >
            <Text>
              {club && club.registered
                ? "Continue Registering"
                : "Register Club"}
            </Text>
=======
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
>>>>>>> master
          </Button>
        )}
      </Box>
      {fillForm && <ClubRegistration onClose={() => setFillForm(false)} />}
<<<<<<< HEAD
    </Box>
  );
};
=======
      <FooterAchieves/>
    </Box>
  );
};

export default Clubs;
>>>>>>> master

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ChatState } from "../components/Context/ChatProvider";
import { countries } from "countries-list";
import { getStatesOfCountry } from "../assets/state";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useConnectSocket } from "../components/config/chatlogics";

export const ClubRegistration = ({ onClose }) => {
  const { user, club, setClub, setRequests, setUser } = ChatState();
  const [name, setName] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(user?.country);
  const [provience, setProvience] = useState(user.provinces);
  const [chairperson, setChairperson] = useState("");
  const [viceChair, setViceChair] = useState("");
  const [secretary, setSecretary] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    if (socket) {
      socket.on("sent request", (club) => {
        setUser((prevUser) => ({
          ...prevUser,
          clubRequests: [...prevUser.clubRequests, club._id],
        }));

        setRequests((prev) => ({ ...prev, club }));
      });
    }
  }, [socket, setRequests, setUser]);

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));

  const getUsersWithNoClub = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user/${user.country}/${provience}`,
        config
      );

      setSuggest(data);
    } catch (error) {
      console.error("Error fetching users with no clubs:", error);
    }
  }, [user.token, user._id, setSuggest, provience]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    getUsersWithNoClub();
  }, [getUsersWithNoClub, navigate, user]);

  useEffect(() => {
    if (!user) navigate("/dashboard");

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user]);

  const handleFormClose = () => {
    onClose();
  };

  const requestClubRequest = useCallback(
    async (userId, event) => {
      if (event) {
        event.preventDefault();
      }
      if (!name) {
        toast({
          title: "Give your Club a name please",
        });
        return;
      }
      if (!user) {
        navigate("/dashboard");
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `/api/user/${user.country}/${user.provinces}/${name}/${userId}`,
          config
        );
        setClub(data);
      } catch (error) {
        console.error("Error fetching Club:", error);
      }
    },
    [user.token, user._id, setClub]
  );
  const handleCreateClub = async (e) => {
    e.preventDefault();
    if (!chairperson || !secretary || !viceChair || !user) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const info = { chairperson, secretary, viceChair };
      const { data } = await axios.post(`/api/club/register`, info, config);
      console.log(data);
      setClub(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack
      backgroundColor={"whitesmoke"}
      width={"100%"}
      boxShadow="dark-lg"
      p="6"
      rounded="md"
      bg="white"
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"large"}
        width={"100%"}
        mt={20}
      >
        <Button fontSize={"x-large"} onClick={handleFormClose} width={"10px"}>
          X
        </Button>
        <Text fontWeight={"bold"} m={1}>
          Club Form
        </Text>
        <Text
          fontSize={"sm"}
          fontWeight={500}
          bg={useColorModeValue("green.50", "green.900")}
          p={2}
          px={3}
          color={"green.500"}
          rounded={"full"}
        >
          Status (*{club && club.registration ? "Registered" : "Not registered"}
          )
        </Text>
      </Box>
      <Box
        m={3}
        p={3}
        borderRadius={3}
        width={{ base: "97%", md: "60%" }}
        border={"1px solid #c255ed"}
      >
        <FormControl id="first-name" isRequired>
          <FormLabel textColor={"#c255ed"}>Club name</FormLabel>
          <Input
            placeholder="Enter Club Name"
            value={name || (club && club.name) || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel textColor="#c255ed">Country</FormLabel>
          <Select
            placeholder="Select Club country"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            value={user?.country}
            isDisabled={true}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countryOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ color: "black" }}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
        {selectedCountry && subdivisions ? (
          <FormControl id="provinces" isRequired>
            <FormLabel textColor={"#c255ed"}>County/Province</FormLabel>
            <Select
              placeholder="Select Club province"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              value={provience}
              isDisabled={true}
              onChange={(e) => setProvience(e.target.value)}
            >
              {subdivisions &&
                subdivisions.map((subdivision) => (
                  <option
                    key={subdivision.value}
                    value={subdivision.value}
                    style={{ color: "black" }}
                  >
                    {subdivision.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl id="provinces" isRequired>
            <FormLabel textColor={"#c255ed"}>County/Province</FormLabel>
            <Input
              type="text"
              placeholder="Province"
              onChange={(e) => setProvience(e.target.value)}
            />
          </FormControl>
        )}
        <FormControl id="first-name" isRequired>
          <FormLabel textColor={"#c255ed"}>
            Make requests to members around you.
          </FormLabel>
        </FormControl>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={3}
          width={"100%"}
          height={"200px"}
          overflow="auto"
        >
          {!suggest && (
            <Text textAlign={"center"}>
              No student without a club in this region.
            </Text>
          )}
          {suggest.length > 0 &&
            suggest.map((suggestion) => (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                key={suggestion._id}
                style={{ color: "black" }}
                width={"90%"}
                m={1}
              >
                <Text fontSize={"small"} fontWeight={"bold"}>
                  Name: {suggestion.name}, Adm: {suggestion.admission}
                </Text>
                <Button
                  borderRadius={20}
                  isDisabled={
                    club && club.clubRequests.includes(suggestion._id)
                  }
                  onClick={(event) => requestClubRequest(suggestion._id, event)}
                  backgroundColor={"#c255ed"}
                >
                  {club && club.clubRequests.includes(suggestion._id)
                    ? "Request sent"
                    : "Send Request"}
                </Button>
              </Box>
            ))}
        </Box>
        <FormControl id="members" isRequired>
          <FormLabel textColor={"#c255ed"}>
            Students enrolled {club && club.members.length}/20
          </FormLabel>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={3}
            width={"100%"}
            height={"100px"}
            overflow="auto"
            borderTop={"1px solid #c255ed"}
            borderBottom={"1px solid #c255ed"}
          >
            {club && club.members.length === 0 && (
              <Text textAlign={"center"}>
                No members available for this club.
              </Text>
            )}
            {club &&
              club.members.length > 0 &&
              club.members.map((member) => (
                <Button fontSize={"small"} fontWeight={"bold"} m={1}>
                  Adm: {member.admission}
                </Button>
              ))}
          </Box>
        </FormControl>
        <FormControl id="chairman" isRequired>
          <FormLabel>Chairperson</FormLabel>
          <Input
            type="text"
            name="chairman"
            value={chairperson}
            onChange={(e) => setChairperson(e.target.chairperson)}
            placeholder="Input valid adm of the party"
            isInvalid={
              !club?.members.some((adm) => adm.admission === chairperson)
            }
          />
        </FormControl>
        <FormControl id="secretary" isRequired>
          <FormLabel>Secretary</FormLabel>
          <Input
            type="text"
            name="secretary"
            value={secretary}
            placeholder="Input valid adm of the party"
            isInvalid={
              !club?.members.some((adm) => adm.admission === secretary)
            }
            onChange={(e) => setSecretary(e.target.secretary)}
          />
        </FormControl>
        <FormControl id="vice-chairman" isRequired>
          <FormLabel>Vice Chairperson</FormLabel>
          <Input
            type="text"
            name="viceChairman"
            value={viceChair}
            placeholder="Input valid adm of the party"
            isInvalid={
              !club?.members.some((adm) => adm.admission === viceChair)
            }
            onChange={(e) => setViceChair(e.target.viceChair)}
          />
        </FormControl>
        <FormControl id="provincial-coach">
          <FormLabel>Coach</FormLabel>
          <Input
            type="text"
            name="provincialCoach"
            value={user?.admission}
            isDisabled={true}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          isDisabled={
            club?.members.length < 20 ||
            !chairperson ||
            !secretary ||
            !viceChair
          }
          onClick={() => handleCreateClub()}
        >
          <Text> Register Club </Text>
        </Button>{" "}
      </Box>
    </VStack>
  );
};

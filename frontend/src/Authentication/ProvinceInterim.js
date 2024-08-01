import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, VStack } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useState } from "react";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const ProvincialCoachForm = () => {
  const [coaches, setCoaches] = useState([]);
  const { user } = ChatState();
  const [province, setProvince] = useState();
  const [chairperson, setChairperson] = useState("");
  const [viceChair, setViceChair] = useState("");
  const [secretary, setSecretary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      const { data } = await axios.post(`/api/province/register`, info, config);
      console.log(data);
      setProvince(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendRequest = async (coachId) => {
    console.log(coachId);
    if (!coachId || !user) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const body = { country: user.country, province: user.provinces };
      const { data } = await axios.get(
        `/api/province/${coachId}`,
        body,
        config
      );
      console.log(data);
      setProvince(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCoaches = useCallback(async () => {
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
      const { data } = await axios.get("/api/province/my/province", config);
      setProvince(data);
    } catch (error) {
      console.log(error);
    }
    try {
      const { data } = await axios.get("/api/province/get/coaches", config);
      setCoaches(data);
    } catch (error) {
      console.log(error);
    }
  }, [user, navigate, setCoaches, setProvince]);

  useEffect(() => {
    if (user) {
      getCoaches();
    }
  }, [getCoaches, user]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack
        spacing={4}
        align="stretch"
        width={"100%"}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        {" "}
        <Text
          fontSize={"sm"}
          fontWeight={500}
          bg={useColorModeValue("green.50", "green.900")}
          p={2}
          px={3}
          color={"green.500"}
          rounded={"full"}
        >
          Status (*
          {province && province.registered ? "Registered ✔️" : "Not registered"}
          )
        </Text>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"200px"}
        >
          <Text
            textAlign={"center"}
            fontSize={"large"}
            fontWeight={"bold"}
            color={"cornflowerblue"}
          >
            Send Requests to Coaches around {user?.provinces}
          </Text>
          {coaches.length === 0 && (
            <Text textAlign={"center"}>No clubs in this region yet.</Text>
          )}
          <Box
            display={"flex"}
            height={"200px"}
            overflowY={"auto"}
            width={"100%"}
            boxShadow="base"
            p="6"
            rounded="md"
            bg="white"
          >
            {" "}
            {coaches.length > 0 &&
              coaches.map((coach, index) => (
                <Text
                  key={coach._id}
                  display={"flex"}
                  width={"100%"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                  p={1}
                >
                  {coach.coach.name} {coach.coach.admission}
                  <Button
                    onClick={() => handleSendRequest(coach?.coach._id)}
                    borderRadius={20}
                    background={"#A020F0"}
                    color={"white"}
                    _hover={{ color: "black" }}
                    isDisabled={province?.requests.includes(coach.coach._id)}
                  >
                    {province?.requests.includes(coach.coach._id)
                      ? "Request Sent"
                      : "Send Request"}
                  </Button>
                </Text>
              ))}
          </Box>

          <FormControl id="approvals" isRequired>
            <FormLabel>Required Approvals</FormLabel>
            {province?.approvals.length}/20
          </FormControl>
        </Box>
        <FormControl id="chairman">
          <FormLabel>Chairperson</FormLabel>
          <Input
            type="text"
            name="chairman"
            value={chairperson}
            onChange={(e) => setChairperson(e.target.chairperson)}
            placeholder="Input valid adm of the party"
            isInvalid={
              !province?.approvals.some((adm) => adm.admission === chairperson)
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
              !province?.approvals.some((adm) => adm.admission === secretary)
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
              !province?.approvals.some((adm) => adm.admission === viceChair)
            }
            onChange={(e) => setViceChair(e.target.viceChair)}
          />
        </FormControl>
        <FormControl id="provincial-coach">
          <FormLabel>Provincial Coach</FormLabel>
          <Input
            type="text"
            name="provincialCoach"
            value={user?.admission}
            isDisabled={true}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={province?.approvals.length < 20}
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default ProvincialCoachForm;

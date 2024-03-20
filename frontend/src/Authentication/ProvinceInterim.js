import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Text, VStack } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProvincialCoachForm = () => {
  const [coaches, setCoaches] = useState([
    { _id: 1, name: "George Maina", admission: "U0000001A" },
  ]);
  const { user } = ChatState();
  const [province, setProvince] = useState();
  const [chairperson, setChairperson] = useState("");
  const [viceChair, setViceChair] = useState("");
  const [secretary, setSecretary] = useState("");
  const navigate = useNavigate();
  console.log(coaches);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
      const { data } = await axios.get(`/api/province/${coachId}`, config);
      console.log(data);
      setProvince(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCoaches = useCallback(async () => {
    if (!user) {
      console.log("returning!!");
      navigate("/dashboard");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/province/get/coaches", config);
      console.log(data);
      setCoaches(data);
    } catch (error) {
      console.log(error);
    }
  }, [user, navigate, setCoaches]);

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
                  {coach.name}
                  <Button
                    onClick={() => handleSendRequest(coach?._id)}
                    borderRadius={20}
                    background={"#A020F0"}
                    color={"white"}
                    _hover={{ color: "black" }}
                    isDisabled={province?.requests.includes(coach._id)}
                  >
                    {province?.requests.includes(coach._id)
                      ? "Request Sent"
                      : "Send Request"}
                  </Button>
                </Text>
              ))}
          </Box>

          <FormControl id="approvals">
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
          />
        </FormControl>
        <FormControl id="secretary">
          <FormLabel>Secretary</FormLabel>
          <Input
            type="text"
            name="secretary"
            value={secretary}
            onChange={(e) => setSecretary(e.target.secretary)}
          />
        </FormControl>
        <FormControl id="vice-chairman">
          <FormLabel>Vice Chairperson</FormLabel>
          <Input
            type="text"
            name="viceChairman"
            value={viceChair}
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
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default ProvincialCoachForm;

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

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

  return (
    <Box
      display="flex"
      flexDir="column"
      backgroundColor="Background"
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
      </Box>
    </Box>
  );
};

export default Provience;

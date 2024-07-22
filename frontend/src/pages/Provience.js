import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
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

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor="whitesmoke"
      overflowY={"auto"}
      width="100%"
      minH={"100vh"}
      p={"6"}
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
          Country: {user?.country} {flag}
        </Text>
        <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
          {user?.provinces} Samma Association
        </Text>
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
      </Box>
    </Box>
  );
};

export default Provience;

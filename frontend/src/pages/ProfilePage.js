import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axiosInstance from "../components/config/axios";
import axios from "axios";

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();
  const [club, setClub] = useState();
  const toast = useToast();
  const [showFollowers, setShowFollowers] = useState(false);
  const handleMembers = () => {
    setShowFollowers(!showFollowers);
  };

  const requestClub = useCallback(async () => {
    if (!user.coach) {
      return;
    }

    try {
      const clubId = user.coach;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosInstance
        .get(`/api/clubs/${clubId}`, config)
        .then(async (response) => {
          setClub(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast({
              title: "Your session has expired",
              description: "Logging out in less than 8 seconds",
              duration: 8000,
              status: "loading",
              position: "bottom",
            });

            setTimeout(() => {
              localStorage.removeItem("userInfo");
              navigate("/");
            }, 8000);
          }
        });
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub]);

  useEffect(() => {
    if (user) {
      requestClub();
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const handleAcceptDecline = async (provinceId, accept) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/province/accept/decline/${provinceId}?accept=${accept}`,
        config
      );

      setUser((prevUser) => ({
        ...prevUser,
        provinceRequests: data.provinceRequests,
      }));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Try again after sometime.",
        status: "error",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
      flexDir={"column"}
      overflow={"auto"}
      alignItems={"center"}
      background={"white"}
    >
      <UpperNav />{" "}
      <Image
        src={user?.pic}
        alt={`Profile*`}
        borderRadius="full"
        boxSize={{ base: "100px", md: "200px" }}
        border="4px solid white"
        mt={{ base: 350, md: 0 }}
      />
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        width={{ base: "100%", md: "80%" }}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box
          textAlign={"start"}
          fontSize={"medium"}
          fontWeight={"bold"}
          m={2}
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
        >
          <Heading mb={4}>Profile</Heading>
          <Text>
            Name: {user?.name} {user?.otherName}
          </Text>
          <Text>Email: {user?.email}</Text>
          <Text>Country: {user?.country}</Text>
          <Text>Coach: {user?.coach ? user.coach : "Not a coach"}</Text>
          <Text>Highest Level Attained: {user?.belt}</Text>
          {user?.admin && (
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => navigate("/admin-work-slot")}
            >
              Admin Work Slot
            </Button>
          )}
        </Box>
        {user?.provinceRequests?.length > 0 && (
          <Box
            textAlign={"start"}
            fontSize={"medium"}
            fontWeight={"bold"}
            background={"white"}
            overflow={"auto"}
            boxShadow="base"
            p="4"
            height={"200px"}
            rounded="md"
            bg="white"
            width={"100%"}
          >
            <Heading mb={4}>Province Requests</Heading>
            {user?.provinceRequests.map((member, index) => (
              <Text
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                key={member._id}
                width={"100%"}
              >
                <Text
                  p={1}
                  fontStyle={"italic"}
                  width={"100%"}
                  fontSize={"x-small"}
                >
                  {" "}
                  {index + 1}.{member.provincialCoach.name} Adm:
                  {member.provincialCoach.admission} Approvals:{" "}
                  {member.approvals.length}
                </Text>
                <Button
                  borderRadius={20}
                  background={"#A020F0"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  fontSize={"x-small"}
                  onClick={() => handleAcceptDecline(member._id, true)}
                >
                  Approve✔️
                </Button>
                <Button
                  borderRadius={20}
                  fontSize={"x-small"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  background={"#A020F0"}
                  m={1}
                  onClick={() => handleAcceptDecline(member._id, false)}
                >
                  Decline
                </Button>
              </Text>
            ))}
          </Box>
        )}
        {user?.coach && club && (
          <>
            <Box
              textAlign={"center"}
              fontSize={"small"}
              fontWeight={"bold"}
              m={2}
              background={"white"}
              boxShadow="base"
              p="6"
              rounded="md"
              bg="white"
            >
              <Heading mb={4}>Club Details</Heading>
              <Text>Club Name: {club.name}</Text>
              <Button
                background={"transparent"}
                _hover={{ background: "transparent", color: "green" }}
                onClick={handleMembers}
              >
                Members: {club.members.length}
              </Button>
              <Text>Followers: {club.followers.length}</Text>
              <Text>Received Likes: {club.likes.length}</Text>
            </Box>
            {showFollowers && (
              <Box
                textAlign={"start"}
                fontSize={"medium"}
                fontWeight={"bold"}
                m={4}
                background={"white"}
                overflow={"auto"}
                boxShadow="base"
                p="6"
                rounded="md"
                bg="white"
              >
                <Heading mb={4}>Members List</Heading>
                {club.members.length > 0 &&
                  club.members.map((member, index) => (
                    <Text fontSize={"small"} key={member._id}>
                      {index + 1}. Name: {member.name} Adm: {member.admission}
                    </Text>
                  ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;

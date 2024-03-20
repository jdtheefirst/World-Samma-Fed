import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axiosInstance from "../components/config/axios";

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

  console.log(club);

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
      <UpperNav />
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        p={10}
        mt={40}
        width={{ base: "100%", md: "80%" }}
      >
        <Image
          src={user?.pic}
          alt={`Profile*`}
          borderRadius="full"
          boxSize={{ base: "100px", md: "200px" }}
          border="4px solid white"
          marginBottom={4}
        />
        <Box textAlign={"start"} fontSize={"medium"} fontWeight={"bold"} m={2}>
          <Heading mb={4}>Profile</Heading>
          <Text>
            Name: {user?.name} {user?.otherName}
          </Text>
          <Text>Email: {user?.email}</Text>
          <Text>Country: {user?.country}</Text>
          <Text>Coach: {user?.coach ? user.coach : "Not a coach"}</Text>
          <Text>Highest Level Attained: {user?.belt}</Text>
          {user.admin && (
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => navigate("/admin-work-slot")}
            >
              Admin Work Slot
            </Button>
          )}
        </Box>
        {user?.coach && club && (
          <>
            <Box
              textAlign={"center"}
              fontSize={"small"}
              fontWeight={"bold"}
              m={2}
              background={"white"}
              p={2}
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

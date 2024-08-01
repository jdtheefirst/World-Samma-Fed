import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  IconButton,
  Flex,
  Image,
  Text,
  Textarea,
  Icon,
  useToast,
  useColorModeValue,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import axios from "axios";
import UpperNav from "../miscellenious/upperNav";
import formatMessageTime from "../components/config/formatTime";
import { FaRankingStar } from "react-icons/fa6";

const ClubDetails = ({ user }) => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcast, setBroadcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const clubData = {
    profilePicture: "",
    backgroundPicture:
      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1713518908/Samma_pkmq5v.png",
  };

  const getClub = useCallback(async () => {
    if (!user || !clubId) {
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

      const { data } = await axios.get(`/api/clubs/${clubId}`, config);
      setClub(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub, clubId]);

  const handleBroadcast = useCallback(async () => {
    if (!clubId) {
      navigate("/dashboard");
      return;
    }
    setLoading(true);

    try {
      const userId = user._id;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/broadcast/${clubId}/${userId}`,
        config
      );

      setBroadcast(data);
      setBroadcastMessage("");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching BroadcastMessages:", error);
      console.log(error);
    }
  }, [user, user?.token, clubId, setBroadcastMessage]);

  useEffect(() => {
    if (user) {
      getClub();
      handleBroadcast();
    }
  }, [user, getClub, handleBroadcast]);

  const handleFollow = async () => {
    if (!user || !clubId) {
      navigate("/dashboard");
      return;
    }

    try {
      const userId = user._id;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/follow/${clubId}/${userId}`,
        config
      );

      setClub(data);
    } catch (error) {
      console.error("Error fetching Club:", error);
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!user || !clubId) {
      navigate("/dashboard");
      return;
    }

    try {
      const userId = user._id;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/likes/${clubId}/${userId}`,
        config
      );

      setClub(data);
    } catch (error) {
      console.error("Error fetching Club:", error);
      console.log(error);
    }
  };

  const handleBroadcastMessage = async () => {
    if (!user || !clubId) {
      navigate("/clubs");
      return;
    }

    if (!broadcastMessage) {
      toast({
        title: "Please include a message in the text area.",
      });
      return;
    }

    try {
      const userId = user._id;

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/clubs/message/${clubId}/${userId}`,
        { broadcastMessage },
        config
      );

      setBroadcast((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error fetching Club:", error);
      console.log(error);
    }
  };
  const handleAcceptRequest = async (memberId) => {
    if (!user || !clubId) {
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
        `/api/clubs/accept/${clubId}/${memberId}`,
        config
      );

      setClub(data);
    } catch (error) {
      console.error("Error accepting request:", error);
      console.log(error);
    }
  };

  const handleJoin = async () => {
    if (!user || !clubId) {
      navigate("/dashboard");
      return;
    }
    if (club?.membersRequests.some((member) => member._id === user?._id)) {
      toast({
        title: "Request to join already sent.",
        description: "Please wait for Coach to reply.",
      });
      return;
    }
    try {
      const userId = user._id;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/join/${clubId}/${userId}`,
        config
      );

      setClub(data);
    } catch (error) {
      console.error("Error accepting join request:", error);
      console.log(error);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
      background={"whitesmoke"}
      minH={"100vh"}
      overflow={"auto"}
    >
      <UpperNav />
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        mt={20}
        background={"whitesmoke"}
      >
        <Image
          src={clubData.backgroundPicture}
          alt="Background"
          top={0}
          borderRadius="20"
          width={"100%"}
        />

        <Box
          display={"flex"}
          top={10}
          left={{ base: "0", md: "30%" }}
          textAlign="center"
          width={"100%"}
          p={4}
        >
          <Image
            src={club?.coach.pic}
            marginTop={-10}
            alt="*Coach profile pic"
            borderRadius="full"
            boxSize={{ base: "100px", md: "200px" }}
            border="4px solid white"
          />
          <Box
            display={"flex"}
            flexDir={"column"}
            textAlign={"start"}
            boxShadow="base"
            width={{ base: "100%", md: "50%" }}
            p="4"
            rounded="md"
            fontSize={"small"}
            bg="whitesmoke"
          >
            {" "}
            <Heading as="h2" size="sm" textAlign={"center"}>
              {club && club.name}
            </Heading>
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              p={2}
              px={3}
              color={"green.500"}
              rounded={"full"}
              margin={1}
            >
              Club Status (*
              {club && club.registered ? "Registered" : "Not registered"})
            </Text>
            <Text>Coach Name: <strong>{club?.coach.name}</strong></Text>
            <Box display={"flex"}>Coach Highest Rank: <strong>{'\u00A0'}{club?.coach.belt}</strong><FaRankingStar style={{color: "red", padding: "2", fontSize: "22px"}} /></Box>
            <Text>Coach Code : <strong>{club?.coach.admission}</strong></Text>
            <Text>Club Unique Identifier: <strong>{club?.code}</strong></Text>
          </Box>
        </Box>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        spacing={4}
        width={"100%"}
        background={"whitesmoke"}
      >
        {loading && !club ? (
          <Stack width={"100%"} p={"6"}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={0}
              m={1}
            >
              <Button colorScheme="teal" size="sm" fontSize={"small"} onClick={handleFollow}>
                {club && club.followers?.find((member) => member === user?._id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
              <Text fontSize={"small"}>{club && club.followers?.length}</Text>
            </Box>

            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"small"}
              p={0}
              m={1}
            >
              <IconButton
                icon={<Icon as={FaHeart} />}
                colorScheme={
                  club && club.likes.some((member) => member === user?._id)
                    ? "green"
                    : "red"
                }
                size="sm"
                onClick={handleLike}
              />
              {club && club.likes?.length}
            </Box>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"small"}
              p={0}
              m={1}
            >
                <IconButton
                  icon={<Icon as={SlUserFollow} />}
                  colorScheme={
                    club &&
                    club.clubRequests.some((member) => member === user?._id)
                      ? "green"
                      : "blue"
                  }
                  size="sm"
                  m={1}
                  isDisabled={
                    club &&
                    (club.members.some((member) => member === user?._id) ||
                      club.coach._id === user._id)
                  }
                  onClick={handleJoin}
                />
              <Text textAlign={"center"} fontSize={"small"} mt={-1}>
                {club?.membersRequests.some((member) => member._id === user?._id) ? "Sent": "Join"}
              </Text>
            </Box>
          </>
        )}
      </Flex>
      <Box
        display={"flex"}
        width={"100%"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "100%", md: "60%" }}
          borderColor="#d142f5"
          overflow="auto"
          mt={2}
          p="4"
        >
          <Heading as="h3" size="sm" mb={2}>
            Broadcast Board
          </Heading>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            overflowY="auto"
            minH={"150px"}
            maxH={"300px"}
            borderRadius={20}
            width={"100%"}
            overflow="auto"
            border={"2px solid grey"}
            fontSize={"small"}
            p="6"
            rounded="md"
          >
            {broadcast && broadcast.length === 0 && (
              <Text textAlign={"center"}> No message here.</Text>
            )}
            {broadcast &&
              broadcast.map((message) => (
                <Box
                  key={message._id}
                  background={"#92e0a5"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  width={{ base: "90%", md: "70%" }}
                  borderRadius={20}
                  m={2}
                  p={1}
                >
                  <Text
                    fontSize={"small"}
                    textDecor={"underline"}
                    textColor={"#aa33b0"}
                  >
                    {formatMessageTime(message.createdAt)}
                  </Text>
                  {message.content}
                </Box>
              ))}
          </Box>
          {club && user && club.coach._id === user._id && (
            <Box
              display={"flex"}
              flexDir={"column"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"auto"}
            >
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                overflowY="auto"
                borderRadius={20}
                height={"150px"}
                width={"100%"}
                p={2}
              >
                <Heading as="h3" size="sm" m={2}>
                  Number of Requests received
                </Heading>
                {club && club.membersRequests.length === 0 && (
                  <Text textAlign={"center"} fontSize={"small"}>
                    {" "}
                    All requests have received responses.
                  </Text>
                )}

                {club &&
                  club.membersRequests.map((request, index) => (
                    <Button
                      fontSize={"small"}
                      fontWeight={"bold"}
                      onClick={() => handleAcceptRequest(request._id)}
                      width={"90%"}
                      m={1}
                    >
                      {index + 1}. Accept {request.name}, Adm:{" "}
                      {request.admission} ✔️
                    </Button>
                  ))}
              </Box>
              <Textarea
                width={{ base: "80%", md: "60%" }}
                placeholder="Leave a message for club members..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
              />
              <Button
                colorScheme="blue"
                size="sm"
                mt={2}
                width={"30%"}
                onClick={handleBroadcastMessage}
              >
                Post Message
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClubDetails;

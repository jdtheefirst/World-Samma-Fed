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
  Container,
  useToast,
} from "@chakra-ui/react";
import { FaHeart, FaVideo } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import axios from "axios";
import UpperNav from "../miscellenious/upperNav";
import formatMessageTime from "../components/config/formatTime";

const ClubDetails = ({ user }) => {
  const { clubId } = useParams();
  const [club, setClub] = useState();
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcast, setBroadcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  console.log(user);

  const clubData = {
    name: "Club Name",
    description: "A brief description of the club.",
    profilePicture:
      "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1709221154/wsf_prl49r.jpg", // Sample image URL
    backgroundPicture: "https://placekitten.com/800/400", // Sample image URL
  };
  const getClub = useCallback(async () => {
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

      const { data } = await axios.get(`/api/clubs/${clubId}`, config);
      setClub(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub, clubId]);

  const handleBroadcast = useCallback(async () => {
    if (!user || !clubId) {
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
      console.log(data);

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

      console.log(data);
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

      console.log(data);
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

      console.log(data);
    } catch (error) {
      console.error("Error accepting request:", error);
      console.log(error);
    }
  };

  const handleLiveCall = async () => {};

  const handleJoin = async () => {
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
        `/api/clubs/join/${clubId}/${userId}`,
        config
      );

      setClub(data);

      console.log(data);
    } catch (error) {
      console.error("Error accepting join request:", error);
      console.log(error);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      width={"100%"}
      background={"Background"}
      p={0}
      mt={50}
    >
      <Flex zIndex={10} width="100%" top={0} position={"fixed"}>
        <UpperNav />
      </Flex>
      <Image
        src={clubData.backgroundPicture}
        alt="Background"
        position="absolute"
        top={0}
        left="50%"
        right={20}
        bottom={0}
        m={2}
        transform="translateX(-50%)"
        height={"50%"}
        borderRadius="20"
        width={{ base: "100%", md: "80%" }}
      />
      <Flex align="center" mt={200}>
        <Image
          src={clubData.profilePicture}
          alt={`Profile*`}
          borderRadius="full"
          boxSize="100px"
          border="4px solid white"
          zIndex={1}
          mt={200}
        />
        <Box zIndex={1} mt={200}>
          <Heading as="h2" size="lg" color="white">
            {club && club.name}
          </Heading>
          <Text color="white">
            {club && club.description ? club.description : "Club description"}
          </Text>
        </Box>
      </Flex>
      <Container maxW={{ base: "100%", md: "80%" }} mt={100}>
        <Flex
          justifyContent="center"
          alignItems="center"
          spacing={4}
          zIndex={1}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space between"}
            alignItems={"center"}
            p={0}
            m={1}
            zIndex={1}
          >
            <Button
              colorScheme="teal"
              size="md"
              onClick={handleFollow}
              isDisabled={club && club.coach === user._id}
            >
              {club && club.followers?.includes(user?._id)
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
              isDisabled={club && club.coach === user._id}
              colorScheme={
                club && club.likes?.includes(user?._id) ? "green" : "red"
              }
              size="md"
              onClick={handleLike}
            />
            {club && club.likes?.length}
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0}
            fontSize={"small"}
          >
            {club && club.coach === user._id ? (
              <IconButton
                icon={<Icon as={FaVideo} />}
                colorScheme="purple"
                size="md"
                onClick={handleLiveCall}
              />
            ) : (
              <IconButton
                icon={<Icon as={SlUserFollow} />}
                colorScheme={
                  club && club.clubRequest.includes(user?._id)
                    ? "green"
                    : "blue"
                }
                size="md"
                isDisabled={club && club.members.includes(user?._id)}
                onClick={handleJoin}
              />
            )}
            {club && club.coach === user?._id ? "live" : "Join"}
          </Box>
        </Flex>
      </Container>
      <Box
        display={"flex"}
        width={"100%"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        background={"Background"}
        m={1}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "100%", md: "60%" }}
          borderX="1px"
          borderColor="#d142f5"
        >
          <Heading as="h3" size="md" mb={2}>
            Broadcast Board
          </Heading>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            overflowY="auto"
            height={"150px"}
            borderRadius={20}
            width={"100%"}
            p={2}
          >
            {broadcast &&
              broadcast.map((message) => (
                <Text
                  key={message._id}
                  background={"#92e0a5"}
                  textAlign={"center"}
                  width={{ base: "90%", md: "70%" }}
                  borderRadius={20}
                  m={2}
                  p={1}
                >
                  {broadcast && broadcast.length === 0 && (
                    <Text textAlign={"center"}> No message here.</Text>
                  )}
                  {message.content}
                  <Text fontSize={"small"}>
                    {formatMessageTime(message.createdAt)}
                  </Text>
                </Text>
              ))}
          </Box>
          {club && user && club.coach === user._id && (
            <Box
              display={"flex"}
              flexDir={"column"}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading as="h3" size="md" m={2}>
                No of Requests received
              </Heading>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                overflowY="auto"
                borderRadius={20}
                height={"150px"}
                width={"100%"}
                m={2}
                p={2}
              >
                {club && club.membersRequests.length === 0 && (
                  <Text textAlign={"center"}> No requests made yet.</Text>
                )}

                {club &&
                  club.membersRequests.map((request) => (
                    <Button
                      fontSize={"small"}
                      fontWeight={"bold"}
                      onClick={handleAcceptRequest(request._id)}
                      width={"90%"}
                      m={1}
                    >
                      Accept {request.name}, Adm: {request.admission} ✔️
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

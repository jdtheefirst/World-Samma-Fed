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
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import axios from "axios";
import UpperNav from "../miscellenious/upperNav";
import formatMessageTime from "../components/config/formatTime";
import Live from "../miscellenious/Live";

const ClubDetails = ({ user }) => {
  const { clubId } = useParams();
  const [club, setClub] = useState();
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcast, setBroadcast] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

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

  const handleJoin = async () => {
    if (!user || !clubId) {
      navigate("/dashboard");
      return;
    }
    if (club.membersRequests.includes(user._id)) {
      toast({
        title: "Request already sent.",
        description: "Please wait for coach to reply.",
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
      width={"100%"}
      background={"white"}
      p={0}
    >
      <Flex zIndex={10} width="100%" top={0} position={"fixed"}>
        <UpperNav />
      </Flex>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        mt={{ base: "50", md: "150" }}
        position="relative"
      >
        <Image
          src={clubData.backgroundPicture}
          alt="Background"
          top={0}
          borderRadius="20"
          width={{ base: "100%", md: "80%" }}
        />

        <Box
          display={"flex"}
          position="absolute"
          top={0}
          mt={{ base: "0", md: "20%" }}
          left={{ base: "0", md: "30%" }}
          textAlign="center"
          width={"100%"}
          p={4}
          color="white"
          zIndex={1}
        >
          <Image
            src={clubData.profilePicture}
            alt={`Profile*`}
            borderRadius="full"
            boxSize="100px"
            border="4px solid white"
            marginBottom={4}
          />
          <Box>
            {" "}
            <Heading as="h2" size="lg">
              {club && club.name}
            </Heading>
            <Text>
              {club && club.description
                ? club.description
                : "Club description not available"}
            </Text>
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              p={2}
              px={3}
              color={"green.500"}
              rounded={"full"}
              marginTop={2}
            >
              Status (*
              {club && club.registration ? "Registered" : "Not registered"})
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        spacing={4}
        width={"100%"}
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
          <Live user={user} club={club} />
          <IconButton
            icon={<Icon as={SlUserFollow} />}
            colorScheme={
              club && club.clubRequests.includes(user?._id) ? "green" : "blue"
            }
            size="md"
            isDisabled={
              club &&
              (club.members.includes(user?._id) || club.coach === user._id)
            }
            onClick={handleJoin}
          >
            Join
          </IconButton>
        </Box>
      </Flex>
      <Box
        display={"flex"}
        width={"100%"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        background={"white"}
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
            {broadcast && broadcast.length === 0 && (
              <Text textAlign={"center"}> No message here.</Text>
            )}
            {broadcast &&
              broadcast.map((message) => (
                <Text
                  key={message._id}
                  background={"#92e0a5"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  width={{ base: "90%", md: "70%" }}
                  borderRadius={20}
                  m={2}
                  p={1}
                >
                  {message.content}
                  <Text fontSize={"small"} textDecor={"underline"}>
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
                Number of Requests received
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

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
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaHeart, FaVideo } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { ChatState } from "../components/Context/ChatProvider";

const ClubDetails = ({ user }) => {
  const { clubId } = useParams();
  const [club, setClub] = useState();
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const navigate = useNavigate();

  console.log(user);

  const clubData = {
    name: "Club Name",
    description: "A brief description of the club.",
    profilePicture: "https://placekitten.com/200/200", // Sample image URL
    backgroundPicture: "https://placekitten.com/800/400", // Sample image URL
  };
  const getClub = useCallback(async () => {
    console.log(user, clubId);
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
  }, [user?.token, setClub]);

  useEffect(() => {
    if (user) {
      getClub();
    }
  }, [user]);

  const handleFollow = () => {
    console.log("Follow club:", clubId);
  };

  const handleLike = () => {
    console.log("Like club:", clubId);
  };

  const handleLiveCall = () => {
    console.log("Initiate live call for club:", clubId);
  };

  const handleBroadcastMessage = () => {
    console.log("Broadcast message:", broadcastMessage);
  };
  const handleJoin = () => {
    console.log("Join Club");
  };

  return (
    <Box
      p={4}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      width={"100%"}
      background={"Background"}
    >
      {" "}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        objectFit={"cover"}
        width={"100%"}
        m={2}
      >
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
      </Box>
      <Box>
        <Flex align="center" mb={40}>
          <Image
            src={clubData.profilePicture}
            alt={`Profile*`}
            borderRadius="full"
            boxSize="100px"
            border="4px solid white"
            zIndex={1}
            mr={4}
          />
          <Box zIndex={1}>
            <Heading as="h2" size="lg" color="white">
              {club && club.name}
            </Heading>
            <Text color="white">
              {club && club.description ? club.description : "Club description"}
            </Text>
          </Box>
        </Flex>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <Button
            colorScheme="teal"
            size="md"
            mr={4}
            mb={4}
            onClick={handleFollow}
          >
            Follow
          </Button>
          <IconButton
            icon={<Icon as={FaHeart} />}
            colorScheme="red"
            size="md"
            mr={4}
            mb={4}
            onClick={handleLike}
          />
          {club && club.coach === user._id ? (
            <IconButton
              icon={<Icon as={FaVideo} />}
              colorScheme="purple"
              size="md"
              mb={4}
              onClick={handleLiveCall}
            />
          ) : (
            <IconButton
              icon={<Icon as={SlUserFollow} />}
              colorScheme="green"
              size="md"
              mb={4}
              onClick={handleJoin}
            />
          )}
        </Box>
      </Box>
      <VStack align="start" spacing={4} color="white">
        <Box>
          <Heading as="h3" size="md" mb={2}>
            Broadcast Board
          </Heading>
          <Textarea
            placeholder="Leave a message for club members..."
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
          />
          <Button
            colorScheme="blue"
            size="sm"
            mt={2}
            onClick={handleBroadcastMessage}
          >
            Post Message
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ClubDetails;

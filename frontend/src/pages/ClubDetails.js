import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

const ClubDetails = () => {
  const { clubId } = useParams();
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const clubData = {
    name: "Club Name",
    description: "A brief description of the club.",
    profilePicture: "https://placekitten.com/200/200", // Sample image URL
    backgroundPicture: "https://placekitten.com/800/400", // Sample image URL
  };

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

  return (
    <Box
      p={4}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      width={"100%"}
    >
      <Image
        src={clubData.backgroundPicture}
        alt="Background"
        position="absolute"
        top={0}
        left={0}
        right={20}
        bottom={0}
        height={"50%"}
        width={"100%"}
        zIndex={-1}
      />
      <Box margintop={200}>
        <Flex align="center" mb={40}>
          <Image
            src={clubData.profilePicture}
            alt={`${clubData.name} Profile`}
            borderRadius="full"
            boxSize="100px"
            border="4px solid white"
            zIndex={1}
            mr={4}
            top={20}
          />
          <Box>
            <Heading as="h2" size="lg" color="white">
              {clubData.name}
            </Heading>
            <Text color="white">{clubData.description}</Text>
          </Box>
        </Flex>

        <Button
          colorScheme="teal"
          size="md"
          mr={4}
          mb={4}
          onClick={handleFollow}
        >
          Follow Club
        </Button>

        <IconButton
          icon={<Icon as={FaHeart} />}
          colorScheme="red"
          size="md"
          mr={4}
          mb={4}
          onClick={handleLike}
        />

        <IconButton
          icon={<Icon as={FaVideo} />}
          colorScheme="purple"
          size="md"
          mb={4}
          onClick={handleLiveCall}
        />
      </Box>

      {/* Broadcast Board */}
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

        {/* Add more sections as needed */}
      </VStack>
    </Box>
  );
};

export default ClubDetails;

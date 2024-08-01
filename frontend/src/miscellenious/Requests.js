import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
<<<<<<< HEAD
  Image,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
=======
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiTeamLine } from "react-icons/ri";
>>>>>>> master

const Requests = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clubRequests, setClubRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();

  const fetchClubRequests = useCallback(async () => {
    if (!user) {
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> master
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/github/something/${user._id}`,
        config
      );
      setClubRequests(data);
    } catch (error) {
      console.error("Error fetching club requests:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchClubRequests();
    }
  }, [user, fetchClubRequests]);
<<<<<<< HEAD
=======

>>>>>>> master
  const declineRequest = async (clubId) => {
    if (!user || !clubId) {
      return;
    }
<<<<<<< HEAD
=======
    setLoading(true);
>>>>>>> master
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/clubs/decline/request/${clubId}/${user._id}`,
        config
      );
      setClubRequests(data);
<<<<<<< HEAD
    } catch (error) {
=======
      setLoading(false);
    } catch (error) {
      setLoading(false);
>>>>>>> master
      console.error("Error fetching club requests/decline:", error);
    }
  };
  return (
    <>
      <Button
        backgroundColor={"white"}
        _hover={{ backgroundColor: "transparent" }}
        onClick={onOpen}
<<<<<<< HEAD
      >
        <Image
          src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1709643622/icons8-group-48_asymxw.png"
          height={5}
        />
=======
        border={"none"}
      >
        <RiTeamLine fontSize={"20px"} border={"none"}/>
>>>>>>> master
        {clubRequests && clubRequests.length > 0 && (
          <Text
            position="absolute"
            bottom="70%"
            right="70%"
            transform="translate(50%, 0)"
            bg="red.500"
            borderRadius="50%"
            width="2px"
            height="2px"
            p={1.5}
          ></Text>
        )}
        <Text />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
<<<<<<< HEAD
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Clubs Requests</ModalHeader>
          <ModalCloseButton />
=======
      <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Clubs Requests</ModalHeader>
          <ModalCloseButton border={"none"} />
>>>>>>> master
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            maxH={"300px"}
          >
            {clubRequests && clubRequests.length > 0 ? (
              clubRequests.map((club, index) => (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
<<<<<<< HEAD
=======
                  key={index}
>>>>>>> master
                >
                  <Button
                    key={club._id}
                    justifyContent={"space-between"}
                    onClick={() => navigate(`/showclub/${club._id}`)}
<<<<<<< HEAD
=======
                    border={"none"}
>>>>>>> master
                  >
                    {index + 1}. Club Name: {club.name}
                  </Button>
                  <Button
                    background={"#f05e56"}
                    onClick={() => declineRequest(club._id)}
<<<<<<< HEAD
                  >
                    Decline
=======
                    border={"none"}
                  >
                    {loading ? <Spinner size={"small"} /> : `Decline`}
>>>>>>> master
                  </Button>
                </Box>
              ))
            ) : (
              <>
                <Text>All club requests have been replied to.</Text>
              </>
            )}
          </ModalBody>

          <ModalFooter fontSize={"small"} textDecor={"underline"}>
            These requests were made by club coaches.
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Requests;

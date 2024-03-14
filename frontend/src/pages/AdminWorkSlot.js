import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminWorkSlot = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleApprove = (submissionId) => {
    console.log(`Approved submission with ID: ${submissionId}`);
  };

  const handleReject = (submissionId) => {
    console.log(`Rejected submission with ID: ${submissionId}`);
  };
  const submitHandler = useCallback(async () => {
    if (!user) {
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
        `/api/submit`,

        config
      );
      console.log(data);
      setSubmissions(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, [toast, user]);

  useEffect(() => {
    submitHandler();
  }, [submitHandler]);

  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
      flexDir={"column"}
      overflow={"auto"}
      background={"white"}
    >
      {" "}
      <UpperNav />
      <Heading mt={20}>Admin Work Slot</Heading>
      {submissions.length > 0 &&
        submissions.map((submission) => (
          <VStack key={submission.id} m={6} spacing={4}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              ml={2}
              width={{ base: "90%", md: "60%" }}
            >
              <Image
                src={submission.passport}
                alt="Passport"
                width="100"
                height="100"
              />
              <Box justifyContent={"start"} ml={2} textAlign={"start"}>
                <Heading size="md">
                  Name: {submission.student.name} {submission.student.otherName}
                </Heading>
                <Text>Admission: {submission.student.admission}</Text>
                <Text>Current Rank: {submission.student.belt}</Text>
              </Box>
            </Box>{" "}
            <Box>
              <video controls width="300" height="200">
                <source src={submission.video} type="video/mp4" />
              </video>
            </Box>
            <Box
              display={"flex"}
              width={{ base: "90%", md: "60%" }}
              justifyContent={"space-between"}
            >
              {" "}
              <Button
                onClick={() => handleApprove(submission.id)}
                colorScheme="green"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleReject(submission.id)}
                colorScheme="red"
              >
                Reject
              </Button>
            </Box>
          </VStack>
        ))}
    </Box>
  );
};

export default AdminWorkSlot;

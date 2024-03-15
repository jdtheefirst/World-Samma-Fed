import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/config/axios";
import { ChatState } from "../components/Context/ChatProvider";

const AdminWorkSlot = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);
  const [reject, setReject] = useState(false);
  const [approaved, setApproaved] = useState(false);
  const [certificate, setCertificate] = useState(undefined);
  const [sendCertificate, setSendCertificate] = useState(undefined);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { setMessages } = ChatState();

  const handleReject = (submissionId, passport, video) => {
    console.log(`Rejected submission with ID: ${submissionId}`);
    setLoading(true);
    if (!submissionId || !user) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const publicPassportId = passport.split("/").pop().split(".")[0];
      const publicVideoId = video.split("/").pop().split(".")[0];

      const data = {
        publicIds: [publicPassportId, publicVideoId],
      };

      axiosInstance
        .post(`/api/submit/delete/${submissionId}`, data, config)
        .then(async (response) => {
          setSubmissions(response.data);
          setLoading(true);
        })
        .catch((error) => {
          setLoading(false);
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
      setLoading(false);
      console.error("Error fetching Club:", error);
    }
  };

  const submitHandler = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (sendCertificate && receiver) {
      try {
        const { data } = await axios.get(
          `/api/user/certificate/${receiver}`,
          { sendCertificate },
          config
        );
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      const { data } = await axios.get(`/api/submit`, config);
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
  }, [toast, user, receiver, sendCertificate]);

  useEffect(() => {
    submitHandler();
  }, [submitHandler]);

  const handleCertificate = () => {
    if (!certificate) {
      toast({
        title: "Select a certificate please.",
        status: "info",
      });
    }
    setCertificateLoading(true);

    let data = new FormData();
    data.append("file", certificate);
    data.append("upload_preset", "worldsamma");

    fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setSendCertificate(data.url);
        setCertificateLoading(false);
      })
      .catch((err) => {
        setCertificateLoading(false);
        toast({
          title: "Error Occurred uploading your passport photo.",
          description: "Please try again later.",
          duration: 5000,
          status: "error",
        });
      });
  };
  const sendMessage = async () => {
    if (!message || !user || !receiver) {
      return;
    }
    try {
      const userId = user._id;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/message",
        { sender: receiver, content: message, userId },
        config
      );
      setMessage("");
      setMessages((prevMessages) => [...prevMessages, data]);

      socket.emit("new message", data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to send the Message",
        description: "Please try again after some time",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      overflowY={"auto"}
      background={"white"}
    >
      {" "}
      <UpperNav />
      <Heading mt={300}>Admin Work Slot</Heading>
      <Text
        textAlign={"center"}
        fontSize={"sm"}
        fontWeight={500}
        bg={useColorModeValue("green.50", "green.900")}
        p={2}
        width={"60%"}
        color={"green.500"}
        rounded={"full"}
        marginTop={2}
      >
        {submissions.length} submissions.
      </Text>
      {submissions.length === 0 && <Text>Work will be posted here.</Text>}
      {submissions.length > 0 &&
        submissions.map((submission) => (
          <VStack key={submission._id} m={3} spacing={4}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              ml={2}
              width={"100%"}
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
                isDisabled={reject}
                onClick={() => {
                  setApproaved(true);
                }}
                colorScheme="green"
              >
                Approve
              </Button>
              <Button
                isDisabled={approaved}
                onClick={() => {
                  setReject(true);
                }}
                colorScheme="red"
              >
                {loading && <Spinner size={"sm"} />}
                Reject
              </Button>
            </Box>
            {reject && (
              <>
                <Textarea
                  placeholder="Please leave a message for student..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  onClick={() => {
                    sendMessage();
                    handleReject(
                      submission._id,
                      submission.passport,
                      submission.video
                    );
                    setReceiver(submission.student._id);
                  }}
                >
                  Send Message
                </Button>
              </>
            )}
            {approaved && (
              <>
                {" "}
                <FormControl isInvalid={!certificate}>
                  <FormLabel>Certificate</FormLabel>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setCertificate(e.target.files[0])}
                  />
                  {certificateLoading && <p>Uploading passport photo...</p>}
                  <FormErrorMessage>
                    Please select a passport photo.
                  </FormErrorMessage>
                </FormControl>
                <Button
                  onClick={() => {
                    handleCertificate();
                    handleReject(
                      submission._id,
                      submission.passport,
                      submission.video
                    );
                    setReceiver(submission.student._id);
                  }}
                >
                  Submit
                </Button>
              </>
            )}
          </VStack>
        ))}
    </Box>
  );
};

export default AdminWorkSlot;

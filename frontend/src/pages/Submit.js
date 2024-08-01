import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Image,
  useToast,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SubmissionPage = ({ user }) => {
  const [video, setVideo] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [saveVideo, setSaveVideo] = useState("");
  const [savePhoto, setSavePhoto] = useState("");
  const toast = useToast();
  const { title } = useParams();
  const navigate = useNavigate();

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handlePhotoChange = (event) => {
    setPassportPhoto(event.target.files[0]);
  };
  const submitHandler = useCallback(async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/submit/${user._id}`,
        {
          savePhoto,
          saveVideo,
        },
        config
      );
      navigate("/dashboard");
      toast({
        title: "Submission successful!",
        description: "Wait for your results under 24hrs",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occurred trying to send your work!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, [toast, navigate, user, savePhoto, savePhoto]);

  useEffect(() => {
    if (savePhoto && saveVideo) {
      submitHandler();
    }
  }, [savePhoto, saveVideo]);

  const submitDetails = () => {
    if (!video) {
      toast({
        title: "Your recorded video please.",
        description: "No file selected.",
        status: "info",
        duration: 5000,
      });
      return;
    }
    if (!passportPhoto) {
      toast({
        title: "Your passport photo please.",
        description: "No file selected.",
        status: "info",
        duration: 5000,
      });
      return;
    }
    if (video) {
      setVideoLoading(true);

      let data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "worldsamma");

      fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSaveVideo(data.url);
          setVideoLoading(false);
        })
        .catch((err) => {
          setVideoLoading(false);
          toast({
            title: "Error Occurred uploading your video.",
            description: "Please try again later.",
            duration: 5000,
            status: "error",
          });
        });
    }
    if (passportPhoto) {
      setPhotoLoading(true);

      let data = new FormData();
      data.append("file", passportPhoto);
      data.append("upload_preset", "worldsamma");

      fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSavePhoto(data.url);
          setPhotoLoading(false);
        })
        .catch((err) => {
          setPhotoLoading(false);
          toast({
            title: "Error Occurred uploading your passport photo.",
            description: "Please try again later.",
            duration: 5000,
            status: "error",
          });
        });
    }
  };

  return (
    <VStack
      align="center"
      justify={"center"}
      width={"100%"}
      background={"white"}
      p={2}
    >
      <UpperNav />
      <Text
        fontSize={"sm"}
        fontWeight={500}
        bg={useColorModeValue("green.50", "green.900")}
        p={2}
        px={3}
        color={"green.500"}
        rounded={"full"}
        margin={1}
        width={{ base: "90%", md: "60%" }}
      >
        {title}
      </Text>
      <Text textAlign={"center"} fontSize={"large"} fontWeight={"bold"}>
        Submit your work for grading(*Passport picture as proof of identity)
      </Text>
      <Box width={{ base: "100%", md: "50%" }}>
        {" "}
        <FormControl isInvalid={!video}>
          <FormLabel>Video</FormLabel>
          <Input type="file" accept="video/*" onChange={handleVideoChange} />
          {videoLoading && <p>Uploading video...</p>}
          <FormErrorMessage>Please select a video file.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!passportPhoto}>
          <FormLabel>Passport Photo</FormLabel>
          <Input type="file" accept="image/*" onChange={handlePhotoChange} />
          {photoLoading && <p>Uploading passport photo...</p>}
          <FormErrorMessage>Please select a passport photo.</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" onClick={submitDetails}>
          Submit
        </Button>
      </Box>
    </VStack>
  );
};

export default SubmissionPage;

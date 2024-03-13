import React, { useState } from "react";
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
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";

const SubmissionPage = () => {
  const [video, setVideo] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const toast = useToast();

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handlePhotoChange = (event) => {
    setPassportPhoto(event.target.files[0]);
  };

  const submitDetails = () => {
    if (video) {
      setVideoLoading(true);

      let data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "RocketChat");

      fetch("https://api.cloudinary.com/v1_1/dvc7i8g1a/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Video URL:", data.url);
          setVideoLoading(false);
        })
        .catch((err) => {
          setVideoLoading(false);
          console.error("Error uploading video:", err);
        });
    }
    if (passportPhoto) {
      setPhotoLoading(true);

      let data = new FormData();
      data.append("file", passportPhoto);
      data.append("upload_preset", "RocketChat");

      fetch("https://api.cloudinary.com/v1_1/dvc7i8g1a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Passport Photo URL:", data.url);
          setPhotoLoading(false);
        })
        .catch((err) => {
          setPhotoLoading(false);
          console.error("Error uploading passport photo:", err);
        });
    }
    toast({
      title: "Submission successful!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
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

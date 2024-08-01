<<<<<<< HEAD
import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import UpperNav from "../miscellenious/upperNav";

const CourseDetails = ({ courses }) => {
=======
import React, { useEffect, useState } from "react";
import { Box, Text, Button, useToast, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";

const CourseDetails = ({ courses, user }) => {
>>>>>>> master
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const course = courses.find((course) => course.id === courseId);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
<<<<<<< HEAD

  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousLesson = () => {
=======
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const goToNextLesson = () => {
    setTranslatedText("");
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    }
    if (currentLessonIndex + 1 === course.lessons.length) {
      navigate(`/courses/${id}/submit/${course.title}`);
    }
  };
  const currentLesson = course.lessons[currentLessonIndex];

  const goToPreviousLesson = () => {
    setTranslatedText("");

>>>>>>> master
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prevIndex) => prevIndex - 1);
    }
  };

<<<<<<< HEAD
  const currentLesson = course.lessons[currentLessonIndex];

  return (
    <Box backgroundColor={"white"} width={"100%"}>
      <UpperNav />
      <Text fontSize="24px" fontWeight="bold" mb={4} mt={55}>
=======
  const translateText = async (text) => {
    if (!user || !text) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/translate?text=${text}&target=${user.language}`,
        config
      );

      setTranslatedText(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // useEffect(() => {
  //   if (
  //     user &&
  //     user.belt &&
  //     user.belt.trim() + " Belt" !== course.title.trim()
  //   ) {
  //     navigate("/dashboard");
  //   }
  // }, [user, course, navigate]);

  return (
    <Box backgroundColor={"white"}
     width={"100%"} display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} >
      <UpperNav />
      <Text fontSize="24px" fontWeight="bold" mb={4} mt={20}>
>>>>>>> master
        {course.title}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        background={"white"}
      >
        <Box mb={4}>
<<<<<<< HEAD
          <Text fontSize="20px" fontWeight="medium">
            {currentLesson.title}
=======
          <Text fontSize="large" fontWeight="medium">
            {currentLesson.title}/{course.lessons.length}
            <Text fontSize={"small"}>
              {" "}
              *Optimize Your Viewing: Switch to Fullscreen
            </Text>
>>>>>>> master
          </Text>
          <iframe
            title={`Lesson ${currentLesson.id}`}
            width="100%"
            height="315"
            src={currentLesson.video}
            allowFullScreen
            style={{ maxWidth: "800px", margin: "0 auto" }}
          ></iframe>
<<<<<<< HEAD
          <Text mt={2}>{currentLesson.notes}</Text>
=======
          <Text mt={2} textAlign={"center"} p={2} width={"100%"}>
            <Button
              background="transparent"
              _hover={{ backgroundColor: "transparent", color: "green" }}
              color={"purple"}
              onClick={() => translateText(currentLesson.notes)}
              textDecoration={"underline"}
            >
              Translate{loading && <Spinner size={"sm"} />}
            </Button>
            {translatedText ? translatedText : currentLesson.notes}
          </Text>
>>>>>>> master
        </Box>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="space-evenly"
          width={"100%"}
        >
          <Button
            onClick={goToPreviousLesson}
            disabled={currentLessonIndex === 0}
<<<<<<< HEAD
=======
            borderRadius={20}
>>>>>>> master
          >
            Previous Lesson
          </Button>
          <Button
            onClick={goToNextLesson}
            disabled={currentLessonIndex === course.lessons.length - 1}
<<<<<<< HEAD
=======
            borderRadius={20}
>>>>>>> master
          >
            Next Lesson
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails;

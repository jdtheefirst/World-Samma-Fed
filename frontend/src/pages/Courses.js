import React, { useEffect, useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import UpperNav from "../miscellenious/upperNav";
import axios from "axios";

const CourseDetails = ({ courses, user }) => {
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const course = courses.find((course) => course.id === courseId);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentLesson = course.lessons[currentLessonIndex];

  const translateText = async (text) => {
    console.log(text);
    if (!user || !text) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/translate?text=${text}&target=${"en"}`,
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
  useEffect(() => {
    if (
      user &&
      user.belt &&
      user.belt.trim() + " Belt" !== course.title.trim()
    ) {
      navigate("/dashboard");
    }
  }, [user, course, navigate]);

  return (
    <Box backgroundColor={"white"} width={"100%"}>
      <UpperNav />
      <Text fontSize="24px" fontWeight="bold" mb={4} mt={55}>
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
          <Text fontSize="20px" fontWeight="medium">
            {currentLesson.title}
          </Text>
          <iframe
            title={`Lesson ${currentLesson.id}`}
            width="100%"
            height="315"
            src={currentLesson.video}
            allowFullScreen
            style={{ maxWidth: "800px", margin: "0 auto" }}
          ></iframe>
          <Text mt={2} textAlign={"center"}>
            <Button
              background="transparent"
              _hover={{ backgroundColor: "transparent", color: "green" }}
              color={"purple"}
              onClick={() => translateText(currentLesson.notes)}
            >
              translate
            </Button>
            {translatedText ? translatedText : currentLesson.notes}
          </Text>
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
          >
            Previous Lesson
          </Button>
          <Button
            onClick={goToNextLesson}
            disabled={currentLessonIndex === course.lessons.length - 1}
          >
            Next Lesson
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails;

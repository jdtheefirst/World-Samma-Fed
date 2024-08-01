import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
<<<<<<< HEAD
  Image,
} from "@chakra-ui/react";
import black from "../blackBelt.png";
import blue from "../blueBelt.png";
import brown from "../brownBelt.png";
import green from "../greenBelt.png";
import orange from "../orangeBelt.png";
import purple from "../pupleBelt.png";
import red from "../redBelt.png";
import yellow from "../yellowBelt.png";
=======
} from "@chakra-ui/react";

import Paycheck from "./Payments";
import { GiBlackBelt } from "react-icons/gi";
>>>>>>> master

const MyPrograms = ({ courses, user }) => {
  const handleDownload = (title, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}BeltCertificate.pdf`;
    a.click();
  };
<<<<<<< HEAD
  const progressLevels = [
    yellow,
    orange,
    red,
    purple,
    green,
    blue,
    brown,
    black,
  ];
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems="center"
      justifyContent="space-between"
=======

  const progressLevels = [
    `#baba30`,
    `orange`,
    `red`,
    `purple`,
    `green`,
    `blue`,
    `brown`,
    `black`,
  ];
  return (
    <Box 
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
>>>>>>> master
      width="100%"
      p={4}
      backgroundColor={"white"}
    >
      <Text fontSize="20px" fontWeight="medium">
        My Programs
      </Text>
      {courses.map((course, index) => (
        <Flex
          key={course.id}
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          m={4}
          p={{ base: "1", md: "4" }}
          width={{ base: "90%", md: "70%" }}
          border={"1px"}
          borderRadius={5}
        >
          <Box>
<<<<<<< HEAD
            <Text fontSize={"larger"} fontWeight={"medium"}>
              <Text>{course.title}</Text>
              <Image src={progressLevels[index]} alt="Belt" />
            </Text>
=======
            <Box fontSize={"larger"} fontWeight={"medium"}>
              <Text>{course.title}</Text>
              <GiBlackBelt
                style={{ color: progressLevels[index], fontSize: "3rem" }}
              />
            </Box>
>>>>>>> master
            {course.title === user?.belt && (
              <Link
                href={`/courses/${course.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                p={0}
                m={0}
              >
                Continue
              </Link>
            )}
          </Box>

          {user && user.certificates && user.certificates[index] ? (
            <Button
              onClick={handleDownload(course.title, user.certificates[index])}
              borderRadius={20}
              fontSize={"small"}
<<<<<<< HEAD
=======
              border={"none"}
>>>>>>> master
            >
              Download Certificate
            </Button>
          ) : (
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
<<<<<<< HEAD
              <Button
                borderRadius={20}
                fontSize={"small"}
                background={"#a432a8"}
                textColor={"white"}
                _hover={{ color: "black" }}
                m={1}
              >
                Enroll
              </Button>
=======
              <Paycheck course={course} />
>>>>>>> master
              <Text
                fontSize={"sm"}
                fontWeight={400}
                bg={useColorModeValue("green.50", "green.900")}
<<<<<<< HEAD
                p={1}
=======
                p={3}
>>>>>>> master
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
<<<<<<< HEAD
                $100(*Best)
=======
                $12.00 only
>>>>>>> master
              </Text>
            </Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MyPrograms;

import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import Paycheck from "./Payments";
import { GiBlackBelt } from "react-icons/gi";

const MyPrograms = ({ courses, user }) => {
  const handleDownload = (title, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}BeltCertificate.pdf`;
    a.click();
  };

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
            <Box fontSize={"larger"} fontWeight={"medium"}>
              <Text>{course.title}</Text>
              <GiBlackBelt
                style={{ color: progressLevels[index], fontSize: "3rem" }}
              />
            </Box>
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
              border={"none"}
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
              <Paycheck course={course} />
              <Text
                fontSize={"sm"}
                fontWeight={400}
                bg={useColorModeValue("green.50", "green.900")}
                p={3}
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
                $12.00 only
              </Text>
            </Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MyPrograms;

import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
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

const MyPrograms = ({ courses, user }) => {
  const handleDownload = (title, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}BeltCertificate.pdf`;
    a.click();
  };
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
            <Text fontSize={"larger"} fontWeight={"medium"}>
              <Text>{course.title}</Text>
              <Image src={progressLevels[index]} alt="Belt" />
            </Text>
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
              <Text
                fontSize={"sm"}
                fontWeight={400}
                bg={useColorModeValue("green.50", "green.900")}
                p={1}
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
                $100(*Best)
              </Text>
            </Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MyPrograms;

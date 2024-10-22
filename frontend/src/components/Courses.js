import {
  Box,
  Text,
  Image,
  SimpleGrid,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import AdvancedTraining from "../assets/images/Advanced.jpg";
import Certified from "../assets/images/Uniform_Blue.jpg";

const courses = [
  {
    id: 1,
    title: "Introduction to Martial Arts",
    description:
      "A beginner's guide to martial arts, covering the basics and fundamental techniques.",
    directive: "Free Course",
    thumbnail:
      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720940066/training_dmljwp.jpg",
  },
  {
    id: 2,
    title: "Advanced Training",
    description:
      "In-depth training on advanced martial arts techniques and strategies.",
    directive: "Sign In",
    thumbnail: AdvancedTraining,
  },
  {
    id: 3,
    title: "Vying for Leadership Positions",
    description:
      "From coaching commissions to provincial, national, and international positions.",
    directive: "Sign In",
    thumbnail: Certified,
  },
];

const CoursesGrid = ({ setGetStarted }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.800", "white");

  return (
    <Box overflowY="auto" height="auto" p={"4"} bg={"whitesmoke"}>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        mb={8}
        color={useColorModeValue("gray.700", "white")}
      >
        Check Out Our Free & World Graded Courses
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {courses.map((course) => (
          <Box
            key={course.id}
            bg={cardBg}
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            cursor={"pointer"}
            alignItems="center"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image
              boxSize="240px"
              src={course.thumbnail}
              alt={course.title}
              width={"100%"}
              p={"4"}
            />
            <Text fontSize="xl" fontWeight="bold" p={"4"} color={cardTextColor}>
              {course.title}
            </Text>
            <Text fontSize="small" color={cardTextColor} p={"4"}>
              {course.description}
            </Text>
            <Button
              mb={"4"}
              colorScheme="blue"
              onClick={() => {
                setGetStarted(true);
              }}
            >
              {course.directive}
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CoursesGrid;

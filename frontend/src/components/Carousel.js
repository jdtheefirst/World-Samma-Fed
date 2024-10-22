import {
  Box,
  Text,
  Image,
  Divider,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Grace from "../assets/images/ReducedABit.jpg";

const testimonials = [
  {
    id: 1,
    name: "Instructor Geoffrey Onyango",
    role: "Certified Instructor - 3rd degree black belt",
    comment:
      "Achieving 3rd degree black belt has been a remarkable journey. The discipline and perseverance required to reach this level have not only honed my martial arts skills but also shaped my character. The World Samma Federation provides an unparalleled platform for continuous growth and excellence.",
    image:
      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/geoffrey.jpg",
  },
  {
    id: 2,
    name: "Stephen Munyoki",
    role: "Certified Instructor - 5th degree black belt",
    comment:
      "Earning 5th degree black belt has been one of the most rewarding experiences of my life. The rigorous training and the support from the World Samma Federation have been instrumental in my development as a martial artist. I am proud to be part of such a prestigious organization.",
    image:
      "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/stephen.jpg",
  },
  {
    id: 3,
    name: "Grace Wachira",
    role: "Student - Purple Belt and 2011 ASMAT Champion",
    comment:
      "Kukamilisha mikanda yangu ya awali katika Shirikisho la Dunia la Samma imekuwa mwanzo wa ajabu wa safari yangu ya sanaa za kivita. Mafunzo ni makali lakini yenye thawabu, na waalimu wanatoa msaada mkubwa. Nina hamu ya kuendelea kusonga mbele na kulenga mikanda ya juu zaidi.",
    image: Grace,
  },
];

const TestimonialsGrid = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.800", "white");

  return (
    <Box overflowY="auto" height="auto" p={6} bg={"whitesmoke"}>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        mb={8}
        color={useColorModeValue("gray.700", "white")}
      >
        Testimonials
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            bg={cardBg}
            borderRadius="lg"
            boxShadow="lg"
            p={6}
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Box position="relative" mb={4}>
              <Image
                borderRadius="full"
                boxSize="180px"
                src={testimonial.image}
                alt={"picture was not provided"}
                mb={4}
              />
              <Box
                position="absolute"
                bottom="1rem"
                boxSize={"180px"}
                left="0"
                right="0"
                background="linear-gradient(to bottom, rgba(244,244,244,0) 75%, rgba(244,244,244,1) 100%)"
                borderBottomRadius="full"
              />
            </Box>
            <Text fontSize="xl" fontWeight="bold" mb={1} color={cardTextColor}>
              {testimonial.name}
            </Text>
            <Text
              fontSize="md"
              fontWeight="medium"
              mb={2}
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {testimonial.role}
            </Text>
            <Divider
              borderColor={useColorModeValue("gray.200", "gray.600")}
              mb={4}
            />
            <Text fontSize="small" color={cardTextColor}>
              {testimonial.comment}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TestimonialsGrid;

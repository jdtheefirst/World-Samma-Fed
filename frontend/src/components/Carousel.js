import React from "react";
import { Box, Text, Image, Divider, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

const testimonials = [
  {
    id: 1,
    name: "Instructor Geoffrey Onyango",
    role: "Certified Instructor - 3rd degree black belt",
    comment: "Achieving 3rd degree black belt has been a remarkable journey. The discipline and perseverance required to reach this level have not only honed my martial arts skills but also shaped my character. The World Samma Federation provides an unparalleled platform for continuous growth and excellence.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/geoffrey.jpg",
  },
  {
    id: 2,
    name: "Stephen Munyoki",
    role: "Certified Instructor - 5th degree black belt",
    comment: "Earning 5th degree black belt has been one of the most rewarding experiences of my life. The rigorous training and the support from the World Samma Federation have been instrumental in my development as a martial artist. I am proud to be part of such a prestigious organization.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/stephen.jpg",
  },
  {
    id: 3,
    name: "Abu Bakar",
    role: "Student - Yellow Belt",
    comment: "Completing my initial belts in the World Samma Federation has been an incredible start to my martial arts journey. The training is intense yet rewarding, and the instructors are incredibly supportive. I am excited to continue progressing and aim for higher belts.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/Abu%20Bakar.jpg",
  },
  {
    id: 4,
    name: "Vincent Sanya",
    role: "Student - Yellow Belt",
    comment: "Starting my training with the World Samma Federation has been a transformative experience. The foundational skills I have acquired have given me confidence and motivation to push further. I look forward to advancing through the ranks and achieving my goals.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/IMG-20240605-WA0000_1_ffblei.jpg",
  },
  {
    id: 5,
    name: "Caleb Wambua",
    role: "Novice instructor - Brown Belt",
    comment: "The World Samma Federation's online courses are fantastic. I've been able to enhance my skills and knowledge at my own pace, and the certification has opened up new opportunities for me.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721903067/Caleb.jpg",
  },
  {
    id: 6,
    name: "Peter Mugo",
    role: "Novice instructor - Green Belt",
    comment: "The support from the instructors at World Samma Federation is unmatched. The courses are well-structured and easy to follow, making my learning experience both enjoyable and rewarding.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721903067/peter.jpg",
  },
  // {
  //   id: 7,
  //   name: "Emily Clark",
  //   role: "Novice Instructor - Orange Belt",
  //   comment: "Being a part of the World Samma Federation has been a game-changer for me. The community is supportive, and the opportunities for growth are endless. I'm proud to be an instructor here.",
  //   image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/emily.jpg",
  // },
  // {
  //   id: 8,
  //   name: "Nicholas",
  //   role: "Certified Instructor - 5th degree black belt",
  //   comment: "From the moment I started my training with the World Samma Federation, I knew I was in the right place. The courses are challenging yet achievable, and the certification process is straightforward.",
  //   image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/michael.jpg",
  // },
  // {
  //   id: 9,
  //   name: "Sarah Lee",
  //   role: "Certified Instructor - 1st degree black belt",
  //   comment: "Becoming a coach with the World Samma Federation has allowed me to turn my passion into a profession. The training and certification programs are top-notch, and the community support is invaluable.",
  //   image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/sarah.jpg",
  // },
];

const TestimonialsGrid = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardTextColor = useColorModeValue('gray.800', 'white');

  return (
    <Box overflowY="auto" height="auto" p={6} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8} color={useColorModeValue('gray.700', 'white')}>
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
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Box position="relative" mb={4}>
              <Image
                borderRadius="full"
                boxSize="120px"
                src={testimonial.image}
                alt={"picture was not provided"}
                mb={4}
              />
              <Box
                position="absolute"
                bottom="1rem"
                left="0"
                right="0"
                height={{ base: '1rem', md: '3rem' }}
                background="linear-gradient(to bottom, rgba(244,244,244,0) 0%, rgba(244,244,244,1) 100%)"
                borderBottomLeftRadius="full"
                borderBottomRightRadius="full"
              />
            </Box>
            <Text fontSize="xl" fontWeight="bold" mb={1} color={cardTextColor}>
              {testimonial.name}
            </Text>
            <Text fontSize="md" fontWeight="medium" mb={2} color={useColorModeValue('gray.500', 'gray.300')}>
              {testimonial.role}
            </Text>
            <Divider borderColor={useColorModeValue('gray.200', 'gray.600')} mb={4} />
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

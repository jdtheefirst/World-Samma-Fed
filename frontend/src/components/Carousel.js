import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    id: 1,
    name: "Instructor Geoffrey Onyango",
    comment: "Achieving the Black 3 belt has been a remarkable journey. The discipline and perseverance required to reach this level have not only honed my martial arts skills but also shaped my character. The World Samma Federation provides an unparalleled platform for continuous growth and excellence.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/geoffrey.jpg",
  },
  {
    id: 2,
    name: "Instructor Stephen Munyoki",
    comment: "Earning the Black 3 belt has been one of the most rewarding experiences of my life. The rigorous training and the support from the World Samma Federation have been instrumental in my development as a martial artist. I am proud to be part of such a prestigious organization.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/stephen.jpg",
  },
  {
    id: 3,
    name: "Student Abu Bakar",
    comment: "Completing my initial belts in the World Samma Federation has been an incredible start to my martial arts journey. The training is intense yet rewarding, and the instructors are incredibly supportive. I am excited to continue progressing and aim for higher belts.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/Abu%20Bakar.jpg",
  },
  {
    id: 4,
    name: "Student Vincent Sanya",
    comment: "Starting my training with the World Samma Federation has been a transformative experience. The foundational skills I have acquired have given me confidence and motivation to push further. I look forward to advancing through the ranks and achieving my goals.",
    image: "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721137384/IMG-20240605-WA0000_1_ffblei.jpg", // Change to the actual image URL
  },
];


const TestimonialsCarousel = () => {
  return (
    <Box overflow={"hidden"}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={2000}
      >
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} display="flex" flexDir={"column"} justifyContent="center" alignItems="center" mb={6}  mt={{base: '6', md: '6', lg: "6%"}}>
            <Box position="relative" width={{ base: "50%", md: "30%", lg: "30%", xl: "20%" }} p={4} borderRadius="md" textAlign="center">
            <Box position="relative" mb={4}>
  <Image
    borderRadius="full"
    src={testimonial.image}
    alt={testimonial.name}
    loading="lazy"
    width="100%"
    height="auto"
  />
  <Box
    position="absolute"
    bottom="0"
    left="0"
    right="0"
    height={{ base: "3rem", md: "5rem" }}
    background="linear-gradient(to bottom, rgba(244,244,244,0) 0%, rgba(244,244,244,1) 100%)"
    borderBottomLeftRadius="full"
    borderBottomRightRadius="full"
  />
</Box>
</Box>
            <Box textAlign={"center"} width={{ base: "80%", md: "50%" }}>
              <Text width={"100%"} fontSize="xl" fontWeight="bold" mb={2} mt={-8}>
                {testimonial.name}
              </Text>
              <Text mt={2} p={'3'}>{testimonial.comment}</Text>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default TestimonialsCarousel;

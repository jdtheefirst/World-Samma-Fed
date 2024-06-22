import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    comment: "Studying here has transformed my physical fitness and mental health!",
    image: "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1716375455/fjxeh3icjkthsg6srcih.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "The courses are well-structured and very informative.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Bob Johnson",
    comment: "I've gained so much confidence in my skills.",
    image: "https://via.placeholder.com/150", 
  },
];

const TestimonialsCarousel = () => {
  return (
    <Carousel
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={2000}
    >
         {testimonials.map((testimonial) => (
      <Box key={testimonial.id} display="flex" flexDir={"column"} justifyContent="center" alignItems="center" mb={6}>
        <Box position="relative" width="30%" p={4} borderRadius="md" textAlign="center">
          <Box position="relative" mb={4}>
            <Image
              borderRadius="full"
              src={testimonial.image}
              alt={testimonial.name}
              width="100%"
              height="auto"
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              height="5rem"
              background="linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
              borderBottomLeftRadius="full"
              borderBottomRightRadius="full"
            />
          </Box>
        </Box>
        <Box textAlign={"center"} width={{base: "100%", md: "50%"}}> <Text width={"100%"} fontSize="xl" fontWeight="bold" mb={2} mt={-8}>
            {testimonial.name}
          </Text>
          <Text mt={2} p={'3'}>{testimonial.comment}</Text></Box>
      </Box>
    ))}

    </Carousel>
  );
};

export default TestimonialsCarousel;

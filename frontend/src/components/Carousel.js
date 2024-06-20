import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    comment: "Studying here has transformed my career!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "The courses are well-structured and very informative.",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Bob Johnson",
    comment: "I've gained so much confidence in my skills.",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const TestimonialsCarousel = () => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={2000}
    >
      {testimonials.map((testimonial) => (
        <Box key={testimonial.id} textAlign="center">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={testimonial.image}
            alt={testimonial.name}
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold">
            {testimonial.name}
          </Text>
          <Text mt={2}>{testimonial.comment}</Text>
        </Box>
      ))}
    </Carousel>
  );
};

export default TestimonialsCarousel;

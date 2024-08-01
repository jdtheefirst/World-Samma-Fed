import React from 'react';
import { Box, Spinner, Text, VStack, Heading } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      background="linear-gradient(135deg, #e0eafc, #cfdef3)"
      textAlign="center"
      p={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text mt={4} fontSize="xl" color="blue.500">
        Loading...
      </Text>
      <VStack spacing={4} mt={6}>
        <Heading fontSize="2xl" color="blue.800">
          Welcome to World Samma Federation
        </Heading>
        <Text fontSize="lg" color="blue.600">
          Discover a global arena for martial arts and enthusiastic sports.
        </Text>
        <Text fontSize="md" color="blue.600">
          Join now and be the first lighting candle of your country!
        </Text>
        <Text fontSize="md" color="blue.600">
          Unlock big opportunities now and in the future.
        </Text>
        <Text fontSize="md" color="blue.600">
          Achieve excellence and become a recognized coach on an international platform.
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;
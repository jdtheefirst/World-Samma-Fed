// LoadingSpinner.js
import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      height="100vh"
      background="rgba(255, 255, 255, 0.8)"
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
    </Box>
  );
};

export default LoadingSpinner;

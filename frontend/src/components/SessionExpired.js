// SessionExpirationMessage.js
import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SessionExpirationMessage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" background={"whitesmoke"}>
      <Text fontSize="xl" mb={4}>Your session expired, please log back in.</Text>
      <Button colorScheme="blue" onClick={handleLogin}>Log In</Button>
    </Box>
  );
};

export default SessionExpirationMessage;

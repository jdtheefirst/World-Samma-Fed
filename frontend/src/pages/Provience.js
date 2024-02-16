import React from 'react'
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Box, Button, Text } from '@chakra-ui/react';
import { ChatState } from '../components/Context/ChatProvider';
import { getStatesOfCountry } from '../assets/state';
import UpperNav from '../miscellenious/upperNav';

const Provience = () => {
const { user } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate('/dashboard');

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(user.country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user]);

  return (
    <Box display="flex" flexDir="column" backgroundColor="Background" width="100%">
      <UpperNav/>
      <Text textAlign="center" fontSize={"large"} fontWeight={"bold"} p={3}>
        Country: {user.country}
      </Text>
      <Box height={"200px"} width={"100%"} overflowY={"scroll"} m={1}>
        {subdivisions.map((subdivision) => (
          <Button width={"100%"} border={"1px solid #e803fc"}key={subdivision.isoCode}>{subdivision.name}</Button>
        ))}
      </Box>
      <Box>
        <Text>Available Clubs(show clubs available in every state when clicked)</Text>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Provience
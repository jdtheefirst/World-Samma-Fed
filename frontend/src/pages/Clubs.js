import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatState } from '../components/Context/ChatProvider';
import { getStatesOfCountry } from '../assets/state';

export const Clubs = () => {
  const { user } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);

  console.log(user);
  const testStates = getStatesOfCountry('Curaçao');
  console.log('Test States:', testStates);
  useEffect(() => {

    const states = getStatesOfCountry(user.country);

    setSubdivisions(states);
  }, [user]);
 console.log(subdivisions, user.country);
  return (
    <Box display="flex" flexDir="column" backgroundColor="red" width="100%">
      <Text textAlign="center" p={3}>
        {/* Country: {user.country} */}
      </Text>
      <Box>
        {subdivisions.map((subdivision) => (
          <Text key={subdivision.isoCode}>{subdivision.name}</Text>
        ))}
      </Box>
    </Box>
  );
};

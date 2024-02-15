import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatState } from '../components/Context/ChatProvider';
import axios from 'axios';
import { getStatesOfCountry } from '../assets/state';

export const Clubs = () => {
  const { user } = ChatState();
  const [subdivisions, setSubdivisions] = useState([]);
  const countryName = 'India'; // Replace with the desired country

  useEffect(() => {
    const fetchSubdivisions = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/name/${countryName}?fullText=true`);

        if (response.data.length === 0) {
          throw new Error('Country not found');
        }

        const countryData = response.data[0];

        if (countryData.subdivisions) {
          const subdivisionsData = await axios.get(`https://countrystateapi.com/v1/${countryData.subdivisions}`);

          if (subdivisionsData.data.length === 0) {
            throw new Error('Subdivisions not available for the specified country');
          }

          setSubdivisions(subdivisionsData.data);
        } else {
          throw new Error('Subdivisions not available for the specified country');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSubdivisions();
  }, [countryName]);

  return (
    <Box display="flex" flexDir="column" backgroundColor="red" width="100%">
      <Text textAlign="center" p={3}>
        Country: {countryName}
      </Text>
      <Box>
        {/* Render subdivisions or use the data as needed */}
        {subdivisions.map((subdivision) => (
          <Text key={subdivision.isoCode}>{subdivision.name}</Text>
        ))}
      </Box>
    </Box>
  );
};

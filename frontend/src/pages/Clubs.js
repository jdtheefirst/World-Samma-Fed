import React, { useCallback, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Box, Button, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import { ChatState } from '../components/Context/ChatProvider';
import { getStatesOfCountry } from '../assets/state';
import UpperNav from '../miscellenious/upperNav';
import axios from 'axios';

export const Clubs = () => {
  const { user } = ChatState();
  console.log(user);
  const [subdivisions, setSubdivisions] = useState([]);
  const [clubs, setClubs] =useState(undefined);
  const [provience, setProvince] = useState(user?.provience);
  const navigate = useNavigate();

    const fetchClubs = useCallback(async () => {
      if(!user){
        console.log("No user")
        return;} 
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/clubs/${user.country}/${provience}`, config);
      setClubs(data);
      console.log(clubs);
    } catch (error) {
      console.error('Error fetching or creating chat:', error);
    }
  }, [user.token, user._id, setClubs, provience]);

    useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

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
      <Box>
  <FormControl id="provinces" isRequired>
    <FormLabel>State</FormLabel>
    <Select
      placeholder="Select your province"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      value={provience}
      onChange={(e) => {
        setProvince(e.target.value);
        fetchClubs(e.target.value);
      }}
    >
      {subdivisions && subdivisions.map((subdivision) => (
        <option key={subdivision.value} value={subdivision.value} style={{ color: "black" }}>
          {subdivision.name}
        </option>
      ))}
    </Select>
  </FormControl>
</Box>

      <Box height={"200px"} width={"100%"} overflowY={"scroll"} m={1}>
        {clubs && clubs.map((clubs) => (
          <Button width={"100%"} border={"1px solid #e803fc"}key={clubs.code}>{clubs.name}</Button>
        ))}
      </Box>
      <Box>
        <Text>Available Clubs</Text>
        <Box></Box>
      </Box>
    </Box>
  );
};

import { Box, Button, FormControl, FormLabel, Image, Input, Select, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import { ChatState } from '../components/Context/ChatProvider';
import {countries} from 'countries-list';
import { getStatesOfCountry } from '../assets/state';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ClubRegistration = ({onClose}) => {
    const {user} = ChatState();
    const [name, setName] = useState();
    const [selectedCountry, setSelectedCountry] = useState(user.country);
    const [provience, setProvience] = useState(user.provinces);
    const [subdivisions, setSubdivisions] = useState([]);
    const [suggest, setSuggest] = useState([{name: "Joseph", admission: "U000000006C"}, {name: "Martin", admission: "U000000007B"}, {name: "Joseph", admission: "U000000006C"}, {name: "Joseph", admission: "U000000006C"}, {name: "Joseph", admission: "U000000006C"},]);
    const navigate = useNavigate();
    
    const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: country.name,
  label: country.name,
}));
    const getUsersWithNoClub = useCallback(async () => {
      if(!user){
        navigate('/dashboard');
        return
      }; 
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user/${user.country}/${provience}`, config);
      setSuggest(data);

    } catch (error) {
      console.error('Error fetching users with no clubs:', error);
    }
  }, [user.token, user._id, setSuggest, provience]);

   useEffect(() => {
      if(!user) {
        navigate('/dashboard');
        return;
      }
    getUsersWithNoClub();

  }, [getUsersWithNoClub, navigate, user]);

    useEffect(() => {
    if(!user) navigate('/dashboard');

    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [user]);

   const handleFormClose = () => {
    onClose();
  };


  return (
     <VStack spacing="3px" backgroundColor={"whitesmoke"} p={1}>
    <Button fontSize={"x-large"} marginRight={"90%"} onClick={handleFormClose} width={"10px"}>X</Button>
     <Text fontSize={"larger"} fontWeight={"bold"} textColor="#c255ed">Club Form</Text> 
     <Box m={3} p={3} borderRadius={3} width={{base: "97%", md: "70%"}} border={"1px solid #c255ed"}><FormControl id="first-name" isRequired>
        <FormLabel textColor={"#c255ed"}>Club name</FormLabel>
        <Input
          placeholder="Enter Club Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="country" isRequired>
  <FormLabel textColor="#c255ed">Country</FormLabel>
  <Select
    placeholder="Select Club country"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100%"}
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.target.value)}
  >
    {countryOptions.map((option) => (
      <option key={option.value} value={option.value} style={{color: "black"}}>
        {option.label}
      </option>
    ))}
  </Select>
</FormControl>
    {selectedCountry && subdivisions ? <FormControl id="provinces" isRequired>
  <FormLabel textColor={"#c255ed"}>County/Province</FormLabel>
  <Select
    placeholder="Select Club province"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100%"}
    value={provience}
    onChange={(e) => setProvience(e.target.value)}>
    {subdivisions && subdivisions.map((subdivision) => (
      <option key={subdivision.value} value={subdivision.value} style={{color: "black"}}>
        {subdivision.name}
      </option>
    ))}
  </Select>
</FormControl> : 
      <FormControl id="provinces" isRequired>
        <FormLabel textColor={"#c255ed"}>County/Province</FormLabel>
        <Input
          type="text"
          placeholder="Province"
          onChange={(e) => setProvience(e.target.value)}
        />
        
      </FormControl>}
      <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} m={3} borderRadius={3} width={"100%"} height={"200px"} overflow="auto">
       {suggest.length > 0 && suggest.map((suggestion) => (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} key={suggestion._id} style={{ color: "black" }} width={"90%"} m={3}>
      <Text fontSize={"small"} fontWeight={"bold"} >Name: {suggestion.name}, Adm: {suggestion.admission}</Text>
      <Button borderRadius={20} onClick={() => requestClubRequest(suggestion._id)} backgroundColor={"#c255ed"}>
        Send Request
      </Button>
    </Box>
  ))}
  </Box> 
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
      >
          <Text> Register Club </Text>
      </Button> </Box>
      
    </VStack>
  )
}

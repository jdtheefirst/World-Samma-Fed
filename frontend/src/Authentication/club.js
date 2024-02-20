import { Box, Button, FormControl, FormLabel, Input, Select, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../components/Context/ChatProvider';
import {countries} from 'countries-list';
import { getStatesOfCountry } from '../assets/state';

export const ClubRegistration = ({onClose}) => {
    const {user} = ChatState();
    const [name, setName] = useState();
    const [selectedCountry, setSelectedCountry] = useState(user.country);
    const [provience, setProvience] = useState(user.provinces);
    const [subdivisions, setSubdivisions] = useState([]);
    
    const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: country.name,
  label: country.name,
}));

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
    <Button fontSize={"x-large"} display={"flex"} marginRight={"90%"} onClick={handleFormClose} width={"10px"}>X</Button>
     <Text fontSize={"larger"} fontWeight={"bold"} textColor="#c255ed">Club Form</Text> 
     <Box m={3} width={{base: "97%", md: "80%"}}><FormControl id="first-name" isRequired>
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

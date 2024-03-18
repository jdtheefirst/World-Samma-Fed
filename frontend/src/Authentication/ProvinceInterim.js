import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";

const ProvincialCoachForm = () => {
  const [formData, setFormData] = useState({
    chairman: "",
    secretary: "",
    viceChairman: "",
    provincialCoach: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      chairman: "",
      secretary: "",
      viceChairman: "",
      provincialCoach: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" width={"100%"}>
        <Box></Box>
        <FormControl id="chairman">
          <FormLabel>Chairman</FormLabel>
          <Input
            type="text"
            name="chairman"
            value={formData.chairman}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="secretary">
          <FormLabel>Secretary</FormLabel>
          <Input
            type="text"
            name="secretary"
            value={formData.secretary}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="vice-chairman">
          <FormLabel>Vice Chairman</FormLabel>
          <Input
            type="text"
            name="viceChairman"
            value={formData.viceChairman}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="provincial-coach">
          <FormLabel>Provincial Coach</FormLabel>
          <Input
            type="text"
            name="provincialCoach"
            value={formData.provincialCoach}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default ProvincialCoachForm;

import React from 'react';
import { Box, Button, Flex, Grid, GridItem, Text,useToast, VStack } from '@chakra-ui/react';
import { ChatState } from './Context/ChatProvider';

const EventBox = ({nationalPage, provincePage}) => {
  const events = []; // Replace with your event data
  const seminars = []; // Replace with your seminar data
  const tournaments = []; // Replace with your tournament data
  const toast = useToast();
  const {user, province, national} = ChatState();

  const handleCreateEvent = () => {
    if(user._id !== province?.provincialCoach && provincePage){
        toast({
            title: "Only state coaches can publish events",
        })
    }else if(user._id !== national?.nationalCoach && nationalPage){
        toast({
            title: "Only national coaches can publish events!"
        })
    }else{
        toast({
            title: "This feature is under development!"
        })
    }
  } 

  return (
    <Flex direction="column" align="center" p={5} bg="gray.100" borderRadius="md" boxShadow="md" mb={"6"} w={{base: "97vw", md: "80vw"}}>
      <Button colorScheme="blue" border={"none"} mb={4} onClick={handleCreateEvent}>Create Event</Button>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={4}
        w="100%"
      >
        <GridItem>
          <Box bg="blue.50" p={4} borderRadius="md" boxShadow="sm" _hover={{ bg: 'blue.100' }} cursor={"pointer"}>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.700">Graduation Ceremonies</Text>
            <Text textAlign={"center"}>Stay updated with the latest events happening around you.</Text>
            <VStack spacing={2} maxH="40vh" overflowY="auto">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <Box key={index} p={3} bg="blue.100" w="100%" borderRadius="md" boxShadow="xs">
                    {event}
                  </Box>
                ))
              ) : (
                <Text background={"beige"}>No events available</Text>
              )}
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg="green.50" p={4} borderRadius="md" boxShadow="sm" _hover={{ bg: 'green.100' }} cursor={"pointer"}>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="green.700">Seminars</Text>
            <Text textAlign={"center"}>Join our seminars to enhance your knowledge and skills.</Text>
            <VStack spacing={2} maxH="40vh" overflowY="auto">
              {seminars.length > 0 ? (
                seminars.map((seminar, index) => (
                  <Box key={index} p={3} bg="green.100" w="100%" borderRadius="md" boxShadow="xs">
                    {seminar}
                  </Box>
                ))
              ) : (
                <Text background={"beige"}>No seminars available</Text>
              )}
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg="red.50" p={4} borderRadius="md" boxShadow="sm" _hover={{ bg: 'red.100' }} cursor={"pointer"}>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="red.700">Tournaments</Text>
            <Text> Participate in exciting tournaments and showcase your talent.</Text>
            <VStack spacing={2} maxH="40vh" overflowY="auto">
              {tournaments.length > 0 ? (
                tournaments.map((tournament, index) => (
                  <Box key={index} p={3} bg="red.100" w="100%" borderRadius="md" boxShadow="xs">
                    {tournament}
                  </Box>
                ))
              ) : (
                <Text background={"beige"}>No tournaments available</Text>
              )}
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default EventBox;

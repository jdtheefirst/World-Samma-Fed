import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, Stack, Spinner } from '@chakra-ui/react';
import { CiCircleQuestion } from "react-icons/ci";
import axios from 'axios';

const PollComponent = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchPoll = useCallback(async () => {
    try {
      const response = await axios.get('/api/poll');
      setPoll(response.data);
      setVotes(response.data.options.map(option => option.votes));
      setTotalVotes(response.data.options.reduce((acc, option) => acc + option.votes, 0));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  const handleVote = async (index) => {
    if (selectedOption !== null) return;

    try {
      await axios.post('/api/poll/vote', { option: poll.options[index].option });
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
      setTotalVotes(totalVotes + 1);
      setSelectedOption(index);
      alert('Vote recorded!');
    } catch (error) {
      if(error.response.status === 429){
        alert("You can only vote once per hour.");
        return;
      }
      alert(error.response.data.message);
    }
  };

  const calculatePercentage = (index) => {
    if (totalVotes === 0) return 0;
    return ((votes[index] / totalVotes) * 100).toFixed(1);
  };

  if (!poll) return <Text textAlign={"center"} p={"6"}>Loading poll...<Spinner size={"sm"}/></Text>;

  return (
    <Box p={4} 
    width={{base: "100%", md: "90%"}}
    fontSize={"small"}
    boxShadow="base"
    mb={4}
    backgroundColor="#003366"
    borderColor="#934cce5e" textColor={"whitesmoke"}>
      <CiCircleQuestion fontSize={"50px"} />
      <Text textAlign={"center"} fontWeight={"extrabold"}>POLL</Text>
      <Text p={4} mb={4} textAlign="center">{poll.question}</Text>
      <Stack  display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}>
        {poll.options.map((opt, index) => (
          <Box
            display={"flex"}
            width={{base: "100%", md: "80%"}}
            key={index}
            p={2}
            borderRadius="md"
            cursor="pointer"
            onClick={() => handleVote(index)}
            position="relative"
            bg="gray.300"
            textColor={"#003366"}
          >
            <Text width={"100%"} textAlign={"start"} fontWeight="bold">
              {opt.option}
            </Text>
            {selectedOption !== null && (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width={`${calculatePercentage(index)}%`}
                bg="teal.500"
                borderRadius="md"
                opacity="0.5"
              />
            )}
            {selectedOption !== null && (
              <Text width={"100%"} textAlign={"end"} m={0} p={0}>
                {calculatePercentage(index)}%
              </Text>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PollComponent;

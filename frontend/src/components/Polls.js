import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, Stack, Progress } from '@chakra-ui/react';
import axios from 'axios';

const PollComponent = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

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
      alert(error.response.data.message);
    }
  };

  const calculatePercentage = (index) => {
    if (totalVotes === 0) return 0;
    return ((votes[index] / totalVotes) * 100).toFixed(1);
  };

  if (!poll) return <Text>Loading...</Text>;

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" onClick={() => setShowOptions(true)}>
      <Text fontSize="2xl" mb={4}>{poll.question}</Text>
      {showOptions && (
        <Stack spacing={4}>
          {poll.options.map((opt, index) => (
            <Box
              key={index}
              bg={selectedOption === index ? 'teal.500' : 'gray.300'}
              p={2}
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleVote(index)}
              position="relative"
            >
              <Text fontSize="lg" fontWeight="bold">
                {opt.option}
              </Text>
              {selectedOption !== null && (
                <Progress
                  value={calculatePercentage(index)}
                  size="sm"
                  colorScheme="teal"
                  borderRadius="md"
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  opacity="0.5"
                />
              )}
              {selectedOption !== null && (
                <Text fontSize="sm" fontWeight="bold" mt={1}>
                  {calculatePercentage(index)}%
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default PollComponent;

import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const ProgressSlot = styled.div`
  display: flex;
  width: 30%;
  height: 50px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &.completed {
    background-color: green;
  }

  &.remaining {
    background-color: white;
  }
`;

const Progress = ({ userBelt }) => {
  const progressLevels = ['Member', 'Yellow Belt', 'Orange Belt', 'Red Belt', 'Purple Belt', 'Green Belt', 'Blue Belt', 'Brown Belt', 'Black Belt'];

  const userProgressIndex = progressLevels.indexOf(userBelt);

  return (
    <ProgressContainer>
      {progressLevels.map((belt, index) => (
        <ProgressSlot
          key={index}
          className={index <= userProgressIndex ? 'completed' : 'remaining'}
        >
        <Text
       fontSize={{ base: 'xs', md: 'md' }}
      textAlign="center"
  >
    {belt}
  </Text>
        </ProgressSlot>
      ))}
    </ProgressContainer>
  );
};

export default Progress;

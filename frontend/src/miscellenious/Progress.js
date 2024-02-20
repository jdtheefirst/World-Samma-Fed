import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
`;

const ProgressSlot = styled.div`
  display: flex;
  width: 30%;
  height: 50px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  padding: 0;
  margin: 0;

  &.completed {
    background-color: #e6fae3;
  }

  &.remaining {
    background-color: #cbd1cb;
  }
`;
const progressAnimation = keyframes`
  from {
    width: 1%; /* Adjust the initial width as needed */
  }
  to {
    width: ${({ userProgressIndex }) => (userProgressIndex + 1.2) * 10}%;
  }
`;
// animation: ${progressAnimation} 1s ease-in-out; 
// width: ${({ userProgressIndex }) => (userProgressIndex) * 10}%;
const ProgressArrow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 10px;
  background-color: #228B22;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  width: ${({ userProgressIndex }) => (userProgressIndex + 1) * 10}%;
  animation: ${progressAnimation} 2s ease-in-out; 
`;
const Progress = ({ userBelt }) => {
  const progressLevels = ['Visitor', 'Starter', 'Yellow', 'Orange', 'Red', 'Purple', 'Green', 'Blue', 'Brown', 'Black'];
  const colors = [
    '#727a74',
    'black',
    'yellow.400', 
    'orange',
    'red',
    'purple',
    'green',
    'blue', 
    'brown',
    'black',
  ];
  const userProgressIndex = progressLevels.indexOf(userBelt);

  return (
    <ProgressContainer>
      {progressLevels.map((belt, index) => (
        <ProgressSlot
          key={index}
          className={index <= userProgressIndex ? 'completed' : 'remaining'}
        >
          <Text
            fontWeight={{ base: 'sm', md: 'md' }}
            fontSize={{ base: '10px', md: 'md' }}
            textAlign="center"
            color={colors[index]}
          >
            {belt}
          </Text>
        </ProgressSlot>
      ))}
      <ProgressArrow userProgressIndex={userProgressIndex}> <Text fontSize={"smaller"}>{(userProgressIndex + 1) * 10}%</Text> </ProgressArrow>
    </ProgressContainer>
  );
};

export default Progress;

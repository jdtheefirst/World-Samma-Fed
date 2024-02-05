import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
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
  font-weight: bold;

  &.completed {
    background-color: white;
  }

  &.remaining {
    background-color: white;
  }
`;

const ProgressArrow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ userProgressIndex }) => (userProgressIndex + 1.2) * 10}%;
  height: 10px;
  background-color: #228B22;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
  padding: 0;
`;

const ArrowIcon = styled(RightArrowAlt)`
  color: white;
  width: 20px;
`;

const Progress = ({ userBelt }) => {
  const progressLevels = ['Member', 'Yellow Belt', 'Orange Belt', 'Red Belt', 'Purple Belt', 'Green Belt', 'Blue Belt', 'Brown Belt', 'Black Belt'];
  const colors = [
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
            fontSize={{ base: 'xs', md: 'md' }}
            textAlign="center"
            color={colors[index]}
          >
            {belt}
          </Text>
        </ProgressSlot>
      ))}
      <ProgressArrow userProgressIndex={userProgressIndex}>
        <ArrowIcon />
      </ProgressArrow>
    </ProgressContainer>
  );
};

export default Progress;

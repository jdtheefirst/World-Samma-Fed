import { Image, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import black from "../blackBelt.png";
import blue from "../blueBelt.png";
import brown from "../brownBelt.png";
import green from "../greenBelt.png";
import orange from "../orangeBelt.png";
import purple from "../pupleBelt.png";
import red from "../redBelt.png";
import yellow from "../yellowBelt.png";
import beginner from "../beginner.png";

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
    background-color: white;
  }

  &.remaining {
    background-color: white;
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

const ProgressArrow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 14px;
  background-color: #66d171;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  width: ${({ userProgressIndex }) => (userProgressIndex + 1) * 10}%;
  animation: ${progressAnimation} 2s ease-in-out;
`;
const Progress = ({ userBelt }) => {
  const progressLevels = [
    "Visitor",
    beginner,
    yellow,
    orange,
    red,
    purple,
    green,
    blue,
    brown,
    black,
  ];
  const userProgressIndex = progressLevels.indexOf(userBelt);

  return (
    <ProgressContainer>
      {progressLevels.map((belt, index) => (
        <ProgressSlot
          key={index}
          className={index <= userProgressIndex ? "completed" : "remaining"}
        >
          <Text
            marginTop={-3}
            fontWeight={{ base: "sm", md: "md" }}
            fontSize={{ base: "10px", md: "md" }}
            textAlign="center"
          >
            {index > 0 ? <Image src={belt} alt="Belt" height={5} /> : belt}
          </Text>
        </ProgressSlot>
      ))}
      <ProgressArrow userProgressIndex={userProgressIndex}>
        {" "}
        <Text fontSize={"small"} p={1}>
          {(userProgressIndex + 1) * 10}%
        </Text>{" "}
      </ProgressArrow>
    </ProgressContainer>
  );
};

export default Progress;

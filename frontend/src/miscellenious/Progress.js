<<<<<<< HEAD
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

=======
import { Text } from "@chakra-ui/react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { GiBlackBelt } from "react-icons/gi";
>>>>>>> master
const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
<<<<<<< HEAD
  border: 1px solid #ccc;
=======
>>>>>>> master
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
`;
const progressAnimation = keyframes`
  from {
    width: 1%; /* Adjust the initial width as needed */
  }
  to {
    width: ${({ level }) => (level + 1.2) * 10}%;
  }
`;

<<<<<<< HEAD
=======
const blinkingAnimation = keyframes`
  0%, 100% {
    background-color: #ed7d66; /* Slightly less green color */
  }
  50% {
    background-color: #66d171; /* Default green color */
  }
`;

>>>>>>> master
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
  width: ${({ level }) => (level + 1) * 10}%;
<<<<<<< HEAD
  animation: ${progressAnimation} 2s ease-in-out;
`;
const Progress = ({ userBelt }) => {
  const progressLevels = [
    "Visitor",
    `${beginner}`,
    `${yellow}`,
    `${orange}`,
    `${red}`,
    `${purple}`,
    `${green}`,
    `${blue}`,
    `${brown}`,
    `${black}`,
  ];
  const progress = [
    "Visitor",
=======
  animation: ${progressAnimation} 2s ease-in-out,
    ${blinkingAnimation} 3s ease-in-out infinite;
`;

const Progress = ({ userBelt }) => {
  const progressLevels = [
    "Guest",
    `grey`,
    `#baba30`,
    `orange`,
    `red`,
    `purple`,
    `green`,
    `blue`,
    `brown`,
    `black`,
  ];
  const progress = [
    "Guest" || undefined,
>>>>>>> master
    "Beginner",
    "Yellow",
    "Orange",
    "Red",
    "Purple",
    "Green",
    "Blue",
    "Brown",
    "Black",
  ];

  const level = progress.indexOf(userBelt);

  return (
    <ProgressContainer>
      {progressLevels.map((belt, index) => (
        <ProgressSlot key={index}>
          <Text
            marginTop={-3}
            fontWeight={{ base: "sm", md: "md" }}
            fontSize={{ base: "10px", md: "md" }}
            textAlign="center"
          >
<<<<<<< HEAD
            {index > 0 ? <Image src={belt} alt="Belt" height={5} /> : belt}
=======
            {index > 0 ? (
              <GiBlackBelt style={{ color: belt, fontSize: "1.5rem" }} />
            ) : (
              belt
            )}
>>>>>>> master
          </Text>
        </ProgressSlot>
      ))}
      <ProgressArrow level={level}>
        {" "}
<<<<<<< HEAD
        <Text fontSize={"small"} p={1}>
=======
        <Text textAlign={"center"} fontSize={"small"} p={1}>
>>>>>>> master
          {(level + 1) * 10}%
        </Text>{" "}
      </ProgressArrow>
    </ProgressContainer>
  );
};

export default Progress;

import { useSpring, animated } from "@react-spring/web";
import { Heading, Box } from "@chakra-ui/react";

const AnimatedLetters = () => {
  const letters = "W.S.F".split("");

  return (
    <Heading
      display="flex"
      justifyContent="center"
      fontSize="lg"
      fontWeight={"bold"}
    >
      {letters.map((letter, index) => {
        const styles = useSpring({
          loop: { reverse: true },
          from: { color: "#FF5733" },
          to: { color: "#3357FF" },
          delay: index * 200, // Add a delay to each letter
        });

        return (
          <Box as={animated.span} key={index} style={styles} mx="2px">
            {letter}
          </Box>
        );
      })}
    </Heading>
  );
};

export default AnimatedLetters;

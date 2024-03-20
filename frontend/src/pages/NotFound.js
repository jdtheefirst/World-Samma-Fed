// NotFound.js
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        backgroundColor={"Background"}
        padding={8}
        width={"98%"}
      >
        <Image
          src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1696073349/icons8-not-found-64_rxa6yk.png"
          loading="lazy"
          alt="Not Found"
        />
        <Text fontSize={"2xl"}>404 - Page Not Found</Text>
        <Text textAlign={"center"}>
          {" "}
          The page you are looking for does not exist.
        </Text>
        <Button
          margin={3}
          backgroundColor={"green.400"}
          onClick={() => navigate("/dashboard")}
        >
          Return back to my programs.
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFound;

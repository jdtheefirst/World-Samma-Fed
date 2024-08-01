import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          background={"whitesmoke"}
          width={"100%"}
          height={"100%"}
        >
          {" "}
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {" "}
            <Text fontSize={"2xl"}>An error occurred. Please </Text>
            <Link color="teal.500" href="/dashboard">
              Go Back...
            </Link>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

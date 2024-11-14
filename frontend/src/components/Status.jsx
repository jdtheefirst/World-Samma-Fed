import { Box } from "@chakra-ui/layout";

const StatusIndicator = ({ status, isConnected }) => (
  <Box
    p={2}
    borderRadius="4px"
    bg={isConnected ? "green.500" : "red.500"}
    color="white"
  >
    {status}
  </Box>
);

export default StatusIndicator;

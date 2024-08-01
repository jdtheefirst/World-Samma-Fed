import { Box, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

const AdComponent = () => {
    useEffect(() => {
      // Ensure the adsbygoogle script is loaded
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
  
    return (
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
        flexDir={"column"}
        width={{ base: "100%", md: "70%" }}
        borderRadius={5}
        position="relative" // Ensure parent position is relative for children positioning
      >
        <Text textAlign={"center"} fontSize={"large"}>Advertisement</Text>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }} // Ensure the ad takes full width
          data-ad-client="ca-pub-9398367168853498"
          data-ad-slot="2234347600"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </Box>
    );
  };
  export default AdComponent;
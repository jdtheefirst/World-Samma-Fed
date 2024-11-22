import { Box, IconButton } from "@chakra-ui/react";
import { FaExpand } from "react-icons/fa";

const VideoPlayer = ({ localVideoRef }) => {
  const handleFullScreen = () => {
    const videoElement = localVideoRef.current;
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen(); // Safari
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen(); // Firefox
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen(); // IE/Edge
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      maxWidth="1240px"
      height="auto"
      aspectRatio="16 / 9"
      bg="black"
      borderRadius="8px"
      overflow="hidden"
    >
      <video
        ref={localVideoRef}
        autoPlay
        muted
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        className="video-feed"
      />
      <IconButton
        position="absolute"
        bottom="16px"
        right="16px"
        aria-label="Full Screen"
        icon={<FaExpand />}
        onClick={handleFullScreen}
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        _hover={{ bg: "rgba(255, 255, 255, 0.8)", color: "black" }}
        borderRadius="50%"
      />
    </Box>
  );
};

export default VideoPlayer;

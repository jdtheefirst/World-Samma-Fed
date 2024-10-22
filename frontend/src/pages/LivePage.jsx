import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";

const LivePage = () => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = ChatState();
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const hlsUrl = `https://localhost:8080/uploads/live.m3u8`; // Hardcoded URL

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);
      socket.on("connect", () => setIsSocketConnected(true));
      socket.on("disconnect", () => setIsSocketConnected(false));
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketConnected) {
      socket.emit("checkLiveStream");
      socket.on("liveStreamStatus", (status) => {
        setIsStreamActive(status);
        setLoading(false);
      });
      return () => {
        socket.off("liveStreamStatus");
      };
    }
  }, [isSocketConnected]);

  const startStreaming = async () => {
    try {
      // Requesting access to user's media devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Media access granted:", stream);
      // Emit the stream to the backend to start live streaming
      socket.emit("startLiveSession", stream);

      // Optional: Check if the stream starts immediately and set the state
      setIsLiveStreamActive(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const checkStreamValidity = async () => {
    try {
      const response = await fetch(hlsUrl, { method: "HEAD" });
      if (response.ok) {
        setIsLiveStreamActive(true);
      } else {
        setIsLiveStreamActive(false);
      }
    } catch (error) {
      console.error("Error checking stream validity:", error);
      setIsLiveStreamActive(false);
    }
  };

  useEffect(() => {
    if (isStreamActive) {
      checkStreamValidity();
    }
  }, [isStreamActive]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (isStreamActive) {
    return (
      <Box>
        <Text>Another stream is already active.</Text>
        <Button onClick={() => navigate("/streams")}>Watch Stream</Button>
      </Box>
    );
  }

  return (
    <Box>
      {isLiveStreamActive ? (
        <Box
          as="video"
          id="liveVideo"
          controls
          width="100%"
          height="100vh" // Full height
          autoPlay
          muted
        />
      ) : (
        <Box>
          <Text>No live stream active. Start your stream below.</Text>
          <Button colorScheme="teal" onClick={startStreaming}>
            Start Live Stream
          </Button>
        </Box>
      )}
      {/* Load the HLS video if the stream is active */}
      {isLiveStreamActive && (
        <script>
          {`
            const video = document.getElementById('liveVideo');
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource('${hlsUrl}');
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
              });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = '${hlsUrl}';
              video.addEventListener('loadedmetadata', function() {
                video.play();
              });
            }
          `}
        </script>
      )}
    </Box>
  );
};

export default LivePage;

// StreamViewPage.js
import React, { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";

const StreamViewPage = () => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const kurentoPeerRef = useRef(null);
  const videoRef = useRef(null); // Ref for the video element
  const { user } = ChatState();
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);
      socket.on("connect", () => setIsSocketConnected(true));
      socket.on("disconnect", () => setIsSocketConnected(false));
    }
  }, [socket]);

  // Check live stream status and connect to socket
  useEffect(() => {
    if (isSocketConnected) {
      socket.emit("checkLiveStream");

      socket.on("liveStreamStatus", (status) => {
        setIsStreamActive(status);
        if (status) setupWebRTC();
      });

      socket.on("streamEnded", () => {
        setIsStreamActive(false);
      });

      socket.on("stopped", (status) => {
        setIsStreamActive(status);
        if (kurentoPeerRef.current) {
          kurentoPeerRef.current.dispose();
          kurentoPeerRef.current = null;
        }
      });

      return () => {
        socket.off("liveStreamStatus");
        socket.off("stopped");
        socket.off("streamEnded");
        if (kurentoPeerRef.current) {
          kurentoPeerRef.current.dispose();
          kurentoPeerRef.current = null;
        }
      };
    }
  }, [isSocketConnected]);

  return (
    <Box>
      <Text>Live Stream</Text>
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: "80vh",
        }}
      />
    </Box>
  );
};

export default StreamViewPage;

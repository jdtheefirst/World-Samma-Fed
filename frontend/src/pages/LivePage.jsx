import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import Janus from "janus-gateway-js";
import "../App.css";
import "webrtc-adapter";
import StatusIndicator from "../components/Status";
import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";

const JanusRtmpStreamer = () => {
  const janusRef = useRef(null);
  const [rtmpPlugin, setRtmpPlugin] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [connected, setConnected] = useState(false);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    initializeJanus();

    return () => {
      cleanUp();
    };
  }, []);

  const initializeJanus = async () => {
    try {
      const janusClient = new Janus.Client("/ws/", {
        keepalive: true,
      });
      janusRef.current = janusClient;

      const connection = await janusClient.createConnection("connection-id");
      const session = await connection.createSession();
      const plugin = await session.attachPlugin("janus.plugin.streaming");

      if (!plugin) {
        throw new Error("Failed to attach streaming plugin");
      }

      console.log("Streaming plugin attached!");
      setRtmpPlugin(plugin);
      setConnected(true);

      // Proceed with further setup if necessary, e.g., offering media
      await attachStream(plugin);

      janusRef.current = janusInstance;
    } catch (error) {
      console.error("Error initializing Janus:", error);
    }
  };

  const attachStream = async (plugin) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;

      plugin.send({
        message: { request: "configure", audio: true, video: true },
      });

      plugin.createOffer({
        media: { video: true, audio: true },
        stream,
        success: (jsep) => {
          console.log("Generated JSEP:", jsep);
          plugin.send({ message: { request: "start" }, jsep });
        },
        error: (error) => {
          console.error("Error creating WebRTC offer:", error);
          alert("An error occurred during streaming setup. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error accessing user media:", error);
    }
  };

  const startStreaming = () => {
    if (!rtmpPlugin) {
      console.error("RTMP plugin not attached.");
      return;
    }

    const rtmpUrl = "rtmp://nginx:1935/stream";

    rtmpPlugin.send({
      message: { request: "publish", rtmp_url: rtmpUrl },
      success: () => {
        console.log("Publishing to RTMP successfully!");
        setStreaming(true);
      },
      error: (error) => console.error("Error publishing to RTMP:", error),
    });
  };

  const stopStreaming = () => {
    if (rtmpPlugin) {
      rtmpPlugin.hangup();
      setStreaming(false);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const cleanUp = () => {
    // Make sure janusRef.current is the Janus client instance
    if (janusRef.current && typeof janusRef.current.destroy === "function") {
      janusRef.current.destroy(); // Clean up Janus instance
      console.log("Janus destroyed successfully");
    } else {
      console.error("Janus instance not found or destroy method missing");
    }
    // Close WebSocket connection if present
    if (wsRef.current) {
      wsRef.current.close();
      console.log("WebSocket connection closed");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      fontFamily="Arial, sans-serif"
      color="gray.800"
    >
      <Box
        position="relative"
        width="80%"
        maxWidth="720px"
        mb={5}
        bg="black"
        borderRadius="8px"
        overflow="hidden"
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          width="100%"
          className="video-feed"
        />

        {!connected && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.7)"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="1.5rem"
          >
            <Spinner size="lg" />
            <Text ml={2}>Connecting...</Text>
          </Box>
        )}
      </Box>

      <Box textAlign="center" width="100%" maxWidth="500px">
        <Heading as="h2" size="lg" mb={3}>
          Live Stream Control
        </Heading>

        <Flex justifyContent="space-around" mb={3}>
          <StatusIndicator
            status={connected ? "Connected" : "Disconnected"}
            isConnected={connected}
          />
          <StatusIndicator
            status={streaming ? "Live" : "Idle"}
            isConnected={streaming}
          />
        </Flex>

        <Flex justifyContent="center" gap={3}>
          <Button
            leftIcon={<FaPlay />}
            onClick={startStreaming}
            isDisabled={streaming || !connected}
            colorScheme="green"
            size="lg"
            fontSize={"md"}
          >
            Start Streaming
          </Button>

          <Button
            leftIcon={<FaStop />}
            onClick={stopStreaming}
            isDisabled={!streaming}
            colorScheme="red"
            size="lg"
            fontSize={"md"}
          >
            Stop Streaming
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JanusRtmpStreamer;

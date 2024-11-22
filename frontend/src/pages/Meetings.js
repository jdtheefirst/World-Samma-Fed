import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  HStack,
  Grid,
  GridItem,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Janus from "janus-gateway";
import UpperNav from "../miscellenious/upperNav";

const MeetingComponent = ({ roomId }) => {
  const [participants, setParticipants] = useState([]); // Holds participant streams
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const localStreamRef = useRef(null);
  const videoRefs = useRef({});
  const janusRef = useRef(null);
  const toast = useToast();
  const [streamReady, setStreamReady] = useState(false);

  useEffect(() => {
    // Initialize Janus and attach plugins
    const initializeJanus = () => {
      Janus.init({
        debug: "all",
        callback: () => {
          const janus = new Janus({
            server: "wss://test.worldsamma.org/ws/", // Your Janus WebSocket URL
            success: () => {
              console.log("Janus Gateway initialized!");
              attachVideoRoomPlugin(janus);
            },
            error: (err) => {
              console.error("Error initializing Janus Gateway:", err);
            },
          });
          janusRef.current = janus;
        },
      });
    };

    // Initialize Janus when the component mounts
    initializeJanus();

    return () => {
      cleanupJanus(); // Gracefully clean up on unmount
    };
  }, []);

  const attachVideoRoomPlugin = async (janus) => {
    try {
      const roomId = Math.floor(Math.random() * 100000);
      await janus.attach({
        plugin: "janus.plugin.videoroom",
        success: (pluginHandle) => {
          joinRoom(pluginHandle, roomId); // Join the room after attaching plugin
          setupLocalStream(pluginHandle); // Setup local stream for the publisher
          handleRemoteStreams(pluginHandle); // Handle remote participant streams
        },
        error: (error) => {
          console.error("Failed to attach plugin", error);
        },
      });
    } catch (error) {
      console.error("Failed to attach the VideoRoom plugin:", error);
    }
  };

  const joinRoom = async (plugin, room) => {
    plugin.send({
      message: {
        request: "join",
        room,
        ptype: "publisher",
        display: "Participant",
      },
    });
  };

  const setupLocalStream = async (plugin) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current.srcObject = stream;
      setStreamReady(true);
      plugin.createOffer({
        stream,
        success: (jsep) => {
          plugin.send({
            message: { request: "configure", audio: true, video: true },
            jsep,
          });
        },
      });
    } catch (error) {
      console.error("Failed to access media devices:", error);
      toast({
        title: "Error",
        description: "Unable to access your camera or microphone.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoteStreams = (plugin) => {
    plugin.onremotestream = (stream) => {
      const participantId = `remote-${Math.random().toString(36).substring(7)}`;
      videoRefs.current[participantId] = React.createRef();
      setParticipants((prev) => [
        ...prev,
        { id: participantId, stream, display: `Participant-${participantId}` },
      ]);
    };
  };

  const cleanupJanus = () => {
    if (janusRef.current) {
      janusRef.current.destroy();
    }
    stopLocalStream();
  };

  const stopLocalStream = () => {
    if (localStreamRef.current && localStreamRef.current.srcObject) {
      const stream = localStreamRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks (audio/video)
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current && localStreamRef.current.srcObject) {
      const audioTracks = localStreamRef.current.srcObject.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => (track.enabled = !track.enabled));
        setIsMuted((prev) => !prev);
      }
    } else {
      console.error(
        "No audio tracks found or media stream is not initialized."
      );
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current && localStreamRef.current.srcObject) {
      const videoTracks = localStreamRef.current.srcObject.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => (track.enabled = !track.enabled));
        setIsVideoOn((prev) => !prev);
      }
    } else {
      console.error(
        "No video tracks found or media stream is not initialized."
      );
    }
  };

  const leaveMeeting = () => {
    cleanupJanus();
    toast({
      title: "You have left the meeting.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
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
      <UpperNav />

      <VStack spacing={4} align="stretch" mt={10}>
        <Box p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            Meeting Room: {roomId}
          </Text>
        </Box>
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={4}
          bg="gray.50"
          p={4}
          borderRadius="md"
          maxH="80vh" // Max height for better control on larger screens
          overflowY="auto" // Add scrolling for overflow
        >
          {/* Local participant video */}
          <GridItem>
            <video
              ref={localStreamRef}
              autoPlay
              muted
              style={{
                width: "100%",
                borderRadius: "8px",
                background: "black",
              }}
            />
            <Text textAlign="center" fontSize="sm" mt={2}>
              You
            </Text>
          </GridItem>

          {/* Remote participant videos */}
          {participants.map((participant) => (
            <GridItem key={participant.id}>
              <video
                ref={videoRefs.current[participant.id]}
                autoPlay
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  background: "black",
                }}
                srcObject={participant.stream}
              />
              <Text textAlign="center" fontSize="sm" mt={2}>
                {participant.display}
              </Text>
            </GridItem>
          ))}
        </Grid>

        <HStack justifyContent="center" spacing={2} mt={4}>
          <Button
            colorScheme={isMuted ? "red" : "blue"}
            onClick={toggleMute}
            isDisabled={!streamReady}
            border={"none"}
          >
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button
            colorScheme={isVideoOn ? "blue" : "red"}
            onClick={toggleVideo}
            isDisabled={!streamReady}
            border={"none"}
          >
            {isVideoOn ? "Stop Video" : "Start Video"}
          </Button>
          <Button colorScheme="gray" onClick={leaveMeeting}>
            Leave Meeting
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MeetingComponent;

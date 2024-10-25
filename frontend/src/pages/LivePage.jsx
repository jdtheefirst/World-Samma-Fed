import React, { useState, useEffect, useRef } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import kurentoUtils from "kurento-utils"; // For handling WebRTC signaling

const LivePage = () => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const kurentoPeerRef = useRef(null); // Ref for storing kurentoPeer
  const { user } = ChatState();
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Check socket connection status
  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);
      socket.on("connect", () => setIsSocketConnected(true));
      socket.on("disconnect", () => setIsSocketConnected(false));
    }
  }, [socket]);

  // Check live stream status
  useEffect(() => {
    if (isSocketConnected) {
      socket.emit("checkLiveStream");
      socket.on("liveStreamStatus", (status) => {
        setIsStreamActive(status);
        setLoading(false);
      });
      socket.on("stopped", (status) => {
        setIsStreamActive(status);
      });
      return () => {
        socket.off("liveStreamStatus");
        socket.off("stopped");
      };
    }
  }, [isSocketConnected]);

  // Start streaming and setup WebRTC
  const startStreaming = async () => {
    if (isStreamActive) {
      console.log("Stream already active. Cannot start another.");
      return;
    }

    try {
      // Request access to user's media devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Media access granted:", stream);

      // Create a new WebRTC peer for Kurento
      const options = {
        localVideo: document.getElementById("localVideo"),
        onicecandidate: (candidate) => {
          // Send ICE candidates to the backend
          socket.emit("onIceCandidate", candidate);
        },
      };

      // Create the kurentoPeer
      const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (error) {
          if (error) return console.error(error);

          // Generate offer to send to Kurento
          this.generateOffer((error, offerSdp) => {
            if (error) return console.error(error);

            // Send the offer to the backend via socket
            socket.emit("start", { sdpOffer: offerSdp });
          });
        }
      );

      kurentoPeerRef.current = kurentoPeer; // Store in the ref

      // Listen for Kurento's answer
      socket.on("sdpAnswer", (sdpAnswer) => {
        console.log("Received SDP answer from server:", sdpAnswer);
        if (kurentoPeerRef.current) {
          kurentoPeerRef.current.processAnswer(sdpAnswer);
        }
      });

      // Listen for ICE candidates from Kurento
      socket.on("iceCandidate", (candidate) => {
        if (kurentoPeerRef.current) {
          kurentoPeerRef.current.addIceCandidate(candidate);
        }
      });
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopStreaming = () => {
    if (kurentoPeerRef.current) {
      kurentoPeerRef.current.dispose(); // Dispose of the WebRTC peer connection
      kurentoPeerRef.current = null; // Clear the stored peer connection
      setIsStreamActive(false); // Update the stream status in the component
      console.log("Stream stopped.");
      socket.emit("stop"); // Notify the backend

      // Clear Kurento-related socket listeners
      socket.off("sdpAnswer");
      socket.off("iceCandidate");
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (kurentoPeerRef.current) {
        stopStreaming();
      }
    };
  }, []);

  // Loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Text>No live stream active. Start your stream below.</Text>
      <Button
        colorScheme="teal"
        isDisabled={isStreamActive}
        onClick={startStreaming}
      >
        Start Live Stream
      </Button>
      <Button colorScheme="red" onClick={stopStreaming}>
        Stop Live Stream
      </Button>
      <video
        id="localVideo"
        autoPlay
        muted
        style={{
          display: isStreamActive ? "block" : "none",
          width: "100%",
          height: "80vh",
        }}
      />
    </Box>
  );
};

export default LivePage;

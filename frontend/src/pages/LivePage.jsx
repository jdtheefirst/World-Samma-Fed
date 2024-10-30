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
      socket.on("streamEnded", () => {
        setIsStreamActive(false);
      });
      return () => {
        socket.off("liveStreamStatus");
        socket.off("stopped");
        socket.off("streamEnded");
      };
    }
  }, [isSocketConnected]);

  // Step 1: Get User Media Stream
  async function getUserMediaStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Media access granted:", stream);
      return stream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      return null;
    }
  }

  // Step 2: Initialize Kurento Peer
  async function initializeKurentoPeer() {
    return new Promise((resolve, reject) => {
      const options = {
        localVideo: document.getElementById("localVideo"),
        configuration: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
        onicecandidate: async (candidate) => {
          await sendIceCandidate(candidate);
        },
      };

      const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (error) {
          if (error) {
            console.error("Error initializing Kurento Peer:", error);
            return reject(error);
          }
          console.log("Kurento Peer initialized successfully.");
          resolve(this);
        }
      );
    });
  }

  // Step 3: Send ICE Candidates to Server
  async function sendIceCandidate(candidate) {
    try {
      await fetch("/sendIceCandidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate }),
      });
      console.log("ICE candidate sent to server.");
    } catch (error) {
      console.error("Error sending ICE candidate:", error);
    }
  }

  // Step 4: Start Streaming Function
  async function startStreaming() {
    // Get media stream
    const stream = await getUserMediaStream();
    if (!stream) return; // Stop if media access fails

    // Initialize Kurento Peer
    const kurentoPeer = await initializeKurentoPeer();
    if (!kurentoPeer) return; // Stop if peer setup fails

    // Generate SDP Offer and Process Answer
    kurentoPeer.generateOffer(async (error, offerSdp) => {
      if (error) {
        console.error("Error generating SDP offer:", error);
        return;
      }

      const sdpAnswer = await startStream(offerSdp);
      if (sdpAnswer) {
        kurentoPeer.processAnswer(sdpAnswer);
        console.log("SDP answer processed.");
      } else {
        console.log("No SDP answer received.");
      }

      // Start polling ICE candidates
      const pollInterval = startPollingIceCandidates(kurentoPeer);
      kurentoPeerRef.current = { peer: kurentoPeer, pollInterval };
    });
  }

  // Step 5: Start Stream (handles fetch to server for SDP exchange)
  async function startStream(offerSdp) {
    try {
      const response = await fetch("/start-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sdpOffer: offerSdp }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error starting stream:", errorMessage);
        return null;
      }

      const { sdpAnswer } = await response.json();
      console.log("SDP answer received:", sdpAnswer);
      return sdpAnswer;
    } catch (error) {
      console.error("Error in startStream function:", error);
      return null;
    }
  }

  // Step 6: Start Polling ICE Candidates
  function startPollingIceCandidates(kurentoPeer) {
    return setInterval(async () => {
      try {
        const response = await fetch("/getIceCandidates");
        const { candidates } = await response.json();
        candidates.forEach((candidate) =>
          kurentoPeer.addIceCandidate(candidate)
        );
      } catch (error) {
        console.error("Error fetching ICE candidates:", error);
      }
    }, 1000); // Poll every 1 second
  }

  // Cleanup when component unmounts
  // useEffect(() => {
  //   return () => {
  //     clearInterval(kurentoPeerRef.current.pendingIceCandidates);
  //   };
  // }, []);

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

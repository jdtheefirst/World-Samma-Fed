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

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Media access granted:", stream);

      const options = {
        localVideo: document.getElementById("localVideo"),
        configuration: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
        onicecandidate: async (candidate) => {
          // Send candidate to server via API instead of socket
          await fetch("/sendIceCandidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ candidate }),
          });
        },
      };

      const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        async function (error) {
          if (error) return console.error(error);

          this.generateOffer(async (error, offerSdp) => {
            if (error) return console.error(error);

            // Send SDP offer to the backend via API
            const offerResponse = await fetch("/startStream", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sdpOffer: offerSdp }),
            });

            if (!offerResponse.ok) {
              console.error(
                "Error starting stream:",
                await offerResponse.text()
              );
              return; // Exit if the stream couldn't be started
            }

            // Fetch SDP answer from the server
            const answerResponse = await fetch("/getSdpAnswer");
            const { sdpAnswer } = await answerResponse.json();
            kurentoPeer.processAnswer(sdpAnswer);
          });
        }
      );

      kurentoPeerRef.current = kurentoPeer;

      // Periodically poll for ICE candidates from the server
      const pollIceCandidates = setInterval(async () => {
        const response = await fetch("/getIceCandidates");
        const { candidates } = await response.json();

        candidates.forEach((candidate) => {
          if (kurentoPeerRef.current) {
            kurentoPeerRef.current.addIceCandidate(candidate);
          }
        });
      }, 1000);

      // Store polling interval ID for cleanup
      kurentoPeerRef.current.pollInterval = pollIceCandidates;
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      clearInterval(kurentoPeerRef.current.pollInterval);
    };
  }, []);

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

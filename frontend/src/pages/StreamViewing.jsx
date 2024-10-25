// StreamViewPage.js
import React, { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import kurentoUtils from "kurento-utils"; // For handling WebRTC signaling

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
      socket.emit("checkLiveStream"); // Emit event to check live stream status

      // Listen for live stream status
      socket.on("liveStreamStatus", (status) => {
        setIsStreamActive(status);
        if (status) {
          // If stream is active, set up WebRTC
          setupWebRTC();
        }
      });

      // Listen for stream stop event
      socket.on("stopped", (status) => {
        setIsStreamActive(status);
        if (kurentoPeerRef.current) {
          kurentoPeerRef.current.dispose(); // Clean up if stream stopped
          kurentoPeerRef.current = null;
        }
      });

      return () => {
        socket.off("liveStreamStatus");
        socket.off("stopped");
      };
    }
  }, [socket]);

  // Setup WebRTC connection
  const setupWebRTC = () => {
    const options = {
      remoteVideo: videoRef.current,
      onicecandidate: (candidate) => {
        // Send ICE candidates to the backend
        socket.emit("onIceCandidate", candidate);
      },
    };

    // Create the kurentoPeer for receiving the stream
    const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
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

    // Listen for SDP answer from Kurento
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
  };

  // Loading state
  if (!isStreamActive) {
    return (
      <Box>
        <Text>No live stream is currently active.</Text>
      </Box>
    );
  }

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

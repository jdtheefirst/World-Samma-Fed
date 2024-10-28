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

  // Setup WebRTC connection
  const setupWebRTC = () => {
    if (!videoRef.current) return;

    const options = {
      remoteVideo: videoRef.current,
      onicecandidate: (candidate) => {
        if (candidate) {
          socket.emit("onUserIceCandidate", candidate);
        }
      },
    };

    const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) return console.error("WebRTC peer creation failed:", error);

        this.generateOffer((error, offerSdp) => {
          if (error) return console.error("Error generating SDP offer:", error);

          socket.emit("joinStream", { sdpOffer: offerSdp });
        });
      }
    );

    kurentoPeerRef.current = kurentoPeer;

    // SDP Answer and ICE Candidate handlers
    socket.on("userSdpAnswer", ({ sdpAnswer }) => {
      if (kurentoPeerRef.current) {
        kurentoPeerRef.current.processAnswer(sdpAnswer, (error) => {
          if (error) console.error("Error processing SDP answer:", error);
        });
      }
    });

    socket.on("userIceCandidate", (candidate) => {
      if (kurentoPeerRef.current && candidate) {
        kurentoPeerRef.current.addIceCandidate(candidate, (error) => {
          if (error) console.error("Error adding ICE candidate:", error);
        });
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

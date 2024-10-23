import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useConnectSocket } from "../components/config/chatlogics";
import kurentoUtils from "kurento-utils"; // For handling WebRTC signaling

const LivePage = () => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [kurentoPeer, setKurentoPeer] = useState(null);
  const navigate = useNavigate();
  const { user } = ChatState();
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const hlsUrl = `https://localhost:8080/uploads/live.m3u8`; // Hardcoded HLS URL

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
      return () => {
        socket.off("liveStreamStatus");
      };
    }
  }, [isSocketConnected]);

  // Start streaming and setup WebRTC
  const startStreaming = async () => {
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

      const kurentoPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (error) {
          if (error) return console.error(error);

          // Generate offer to send to Kurento
          this.generateOffer((error, offerSdp) => {
            if (error) return console.error(error);

            // Send the offer to the backend via socket
            socket.emit("startLiveSession", { sdpOffer: offerSdp });
          });
        }
      );

      // Set the peer state
      setKurentoPeer(kurentoPeer);

      // Listen for Kurento's answer
      socket.on("sdpAnswer", (sdpAnswer) => {
        kurentoPeer.processAnswer(sdpAnswer);
      });

      // Listen for ICE candidates from Kurento
      socket.on("iceCandidate", (candidate) => {
        kurentoPeer.addIceCandidate(candidate);
      });
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  // Check stream validity
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

  // Check stream validity if a stream is active
  useEffect(() => {
    if (isStreamActive) {
      checkStreamValidity();
    }
  }, [isStreamActive]);

  // Loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // If another stream is active
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
          <video
            id="localVideo"
            autoPlay
            muted
            style={{ width: "100%", height: "100vh" }}
          />
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

import { Button, IconButton } from "@chakra-ui/button";
import { FaVideo } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { Box, Icon, Image, useToast } from "@chakra-ui/react";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";

const IdentityLive = ({ user, club, socket }) => {
  const otherUserVideo = useRef(null);
  const currentVideo = useRef(null);
  const peerRef = useRef(null);
  const toast = useToast();
  const [live, setLive] = useState(false);
  const { clubId } = useParams();
  let stream;

  const isCurrentUserStreaming = user && peerRef.current?.initiator;

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("signalStart", () => {
      const peer = createPeer(socket.id, stream);
      peerRef.current = peer;
      setLive(true);
    });
    socket.on("signaling", ({ to, from, signal }) => {
      io.to(to).emit("signaling", { from, signal });
    });
    return () => {
      socket.off("startSignal");
      socket.off("signal");
    };
  }, [socket]);
  const startCameraStream = () => {
    if (!socket) {
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const videoElement = isCurrentUserStreaming
          ? currentVideo.current
          : otherUserVideo.current;

        if (!videoElement) {
          throw new Error("Video element not defined.");
        }

        videoElement.srcObject = stream;

        peerRef.current?.on("stream", (otherStream) => {
          otherUserVideo.current.srcObject = otherStream;
        });

        socket.emit("identityLiveSession", adminId);
      })
      .catch((error) => {
        console.error("Media Device access error:", error);
        toast({
          title: "Media Device access error",
          duration: 2000,
          position: "bottom",
          isClosable: true,
        });
      });
  };

  function createPeer(coachSocketId, myId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("signal", {
        to: coachSocketId,
        from: myId,
        signal,
      });
    });

    return peer;
  }

  const handleEndCall = () => {
    setLive(false);
    const videoElement = currentVideo.current;

    if (videoElement) {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoElement.srcObject = null;
      peerRef.current?.destroy();
    }
  };

  const videoStyleFull = {
    display: "flex",
    left: -80,
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <>
      {club?.coach._id === user?._id && (
        <IconButton
          icon={<Icon as={FaVideo} />}
          colorScheme="purple"
          size="md"
          m={1}
          onClick={() => {
            startCameraStream();
            setLive(true);
          }}
        />
      )}

      <div style={{ position: "absolute", top: 0, zIndex: 20 }}>
        <video
          id="currentVideo"
          ref={currentVideo}
          autoPlay
          playsInline
          style={videoStyleFull}
        />
        <video
          id="otherUserVideo"
          ref={otherUserVideo}
          autoPlay
          playsInline
          style={videoStyleFull}
        />
        {live && (
          <Button
            onClick={handleEndCall}
            style={{ position: "absolute", bottom: -40, zIndex: 20, right: 5 }}
            borderRadius={20}
            _hover={{ background: "red" }}
            background={"red"}
          >
            <Image
              src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1710313501/icons8-hang-up-50_ke2pag.png"
              borderRadius={"50%"}
              height={7}
            />
          </Button>
        )}
      </div>
    </>
  );
};

export default IdentityLive;

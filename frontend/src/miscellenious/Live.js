import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FaVideo } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { Box, Icon, useToast } from "@chakra-ui/react";
import { useConnectSocket } from "../components/config/chatlogics";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";

const Live = ({ user, club }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const currentVideo = useRef(null);
  const otherUserVideo = useRef(null);
  const peerRef = useRef(null);
  const toast = useToast();
  const [live, setLive] = useState(false);
  const { clubId } = useParams();

  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    const userVideoElement = document.getElementById("currentVideo");
    const otherUserVideoElement = document.getElementById("otherUserVideo");

    if (userVideoElement) {
      console.log("found it, user video");
      currentVideo.current = userVideoElement;
    }

    if (otherUserVideoElement) {
      console.log("found it, other user video");
      otherUserVideo.current = otherUserVideoElement;
    }
  }, []);

  console.log(socket, live, currentVideo, otherUserVideo);

  useEffect(() => {
    if (!socket || !live) {
      return;
    }

    function createPeer(otherUserId, myId, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("signal", {
          to: otherUserId,
          from: myId,
          signal,
        });
      });

      return peer;
    }

    const handleStreamObtained = (stream) => {
      try {
        if (isCurrentUserStreaming) {
          if (!currentVideo.current) {
            throw new Error("userVideo ref is not defined.");
          }
          currentVideo.current.srcObject = stream;
        } else {
          if (!otherUserVideo.current) {
            throw new Error("otherUserVideo ref is not defined.");
          }
          otherUserVideo.current.srcObject = stream;
        }

        socket.on("other user", (otherUserId) => {
          const peer = createPeer(otherUserId, socket.id, stream);
          peerRef.current = peer;
        });

        peerRef.current?.on("stream", (otherStream) => {
          otherUserVideo.current.srcObject = otherStream;
        });

        socket.emit("startLiveSession", clubId);
      } catch (error) {
        console.error("Error handling stream:", error);
        console.log(error);
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(handleStreamObtained)
      .catch((error) => {
        console.error("Media Device access error:", error);
        toast({
          title: "Media Device access error",
          duration: 2000,
          position: "bottom",
          isClosable: true,
        });
      });

    return () => {
      socket.off("other user");
      peerRef.current?.destroy();
    };
  }, [socket, toast, live]);

  const handleEndCall = () => {
    const videoElement = isCurrentUserStreaming
      ? currentVideo.current
      : otherUserVideo.current;

    if (videoElement) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
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

  const isCurrentUserStreaming = user && peerRef.current?.initiator;

  return (
    <>
      {club?.coach === user?._id && (
        <IconButton
          icon={<Icon as={FaVideo} />}
          colorScheme="purple"
          size="md"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
            setLive(true);
          }}
        />
      )}

      {club?.coach !== user?._id && live && (
        <IconButton
          icon={<Icon as={FaVideo} />}
          colorScheme="red"
          size="md"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
            setLive(true);
          }}
        />
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setLive(false);
        }}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Live</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <div>
              {club?.coach === user?._id && (
                <video
                  id="currentVideo"
                  ref={currentVideo}
                  autoPlay
                  playsInline
                  style={videoStyleFull}
                />
              )}
              {club?.coach !== user?._id && live && (
                <video
                  id="otherUserVideo"
                  ref={otherUserVideo}
                  autoPlay
                  playsInline
                  style={videoStyleFull}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleEndCall}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Live;

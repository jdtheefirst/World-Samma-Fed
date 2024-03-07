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

const Live = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const userVideo = useRef();
  const peerRef = useRef();
  const otherUserVideo = useRef();
  const toast = useToast();
  const [live, setLive] = useState(false);
  const socket = useConnectSocket();

  useEffect(() => {
    if (!socket || !live) return;

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
      socket.on("other user", (otherUserId) => {
        const peer = createPeer(otherUserId, socket.id, stream);
        peerRef.current = peer;
      });

      peerRef.current?.on("stream", (otherStream) => {
        otherUserVideo.current.srcObject = otherStream;
      });
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
  }, [socket, toast]);

  const handleLiveCall = async () => {};
  const videoStyle = {
    display: "flex",
    maxWidth: "100vw",
    maxHeight: "100vh",
    objectFit: "contain",
    left: "-120px",
  };

  return (
    <>
      <IconButton
        icon={<Icon as={FaVideo} />}
        colorScheme="purple"
        size="md"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
          handleLiveCall();
          setLive(true);
        }}
      />

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
              width={"100vw"}
              overflow={"hidden"}
            >
              <video
                ref={userVideo}
                autoPlay
                playsInline
                muted
                style={videoStyle}
              />
              <video
                ref={otherUserVideo}
                autoPlay
                playsInline
                style={videoStyle}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Live;

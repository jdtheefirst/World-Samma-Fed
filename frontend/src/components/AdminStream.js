import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import UpperNav from "../miscellenious/upperNav";
import "./AdminStream.css";
import { useConnectSocket } from "./config/chatlogics";
import { useNavigate } from "react-router-dom";

const AdminStream = ({ user }) => {
  const videoRef = useRef(null);
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef(null);
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);

      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

      socket.on('disconnect', () => {
        setIsSocketConnected(false);
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }

    if (isSocketConnected) {
      const initializeStream = async () => {
        try {
          // Access user media
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: true,
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          // Initialize PeerJS
          peerInstance.current = new Peer();

          peerInstance.current.on("open", (id) => {
            setPeerId(id);
            if (socket) {
              socket.emit("wsfLiveSession", { peerId: id });
              console.log("Emitted peerId:", id);
            }
          });

          peerInstance.current.on("call", (call) => {
            console.log("Received call from:", call.peer);
            // Answer the call with the local stream
            call.answer(stream);

            call.on("stream", (remoteStream) => {
              console.log("Receiving remote stream from call");
              if (videoRef.current) {
                videoRef.current.srcObject = remoteStream;
              }
            });

            call.on("error", (err) => {
              console.error("Call error:", err);
            });
          });

          peerInstance.current.on("error", (err) => {
            console.error("PeerJS error:", err);
          });

          return () => {
            // Cleanup on unmount
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
            if (peerInstance.current) {
              peerInstance.current.destroy();
            }
            if (socket) {
              socket.disconnect();
            }
          };
        } catch (error) {
          console.error("Error accessing media devices or initializing PeerJS.", error);
        }
      };

      // Call initializeStream when the component mounts
      initializeStream();
    }
  }, [isSocketConnected, navigate, socket, user]);

  return (
    <div className="admin-stream-container">
      <UpperNav />
      <div className="stream-content">
        <div className="video-container">
          <h2>World Samma Federation Stream</h2>
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
        <div className="chat-container">
          <h3>Live Chat</h3>
          {/* Placeholder for live chat */}
          <div className="chat-messages">
            {/* Chat messages will go here */}
          </div>
          <input type="text" placeholder="Type a message" />
        </div>
      </div>
    </div>
  );
};

export default AdminStream;

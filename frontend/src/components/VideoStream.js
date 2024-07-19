import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import UpperNav from "../miscellenious/upperNav";
import "./AdminStream.css";
import { useConnectSocket } from "./config/chatlogics";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserStream = ({ user }) => {
  const videoRef = useRef(null);
  const socket = useConnectSocket(user);
  const peerInstanceRef = useRef(null); // Use a ref to store Peer instance
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
    }
  }, [socket]);

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
      return;
    }

    const fetchPeerIdAndInitiateCall = async () => {
      try {
        const response = await axios.get("/getPeerId");
        const peerId = response.data.peerId;

        if (peerId && isSocketConnected) {
          console.log("Fetched peerId from server:", peerId);
          initializeStream(peerId);
        } else {
          console.error("PeerId not found or socket not connected");
        }
      } catch (error) {
        console.error("Failed to fetch peerId:", error);
      }
    };

    const initializeStream = (peerId) => {
      if (peerInstanceRef.current) {
        console.log("Destroying previous PeerJS instance");
        peerInstanceRef.current.destroy();
      }
    
      // Initialize PeerJS
      peerInstanceRef.current = new Peer();
    
      peerInstanceRef.current.on("call", (call) => {
        console.log("Receiving call from", call.peer);
    
        // Answer the call without providing a stream initially
        call.answer(); 
    
        call.on("stream", (remoteStream) => {
          console.log("Receiving remote stream from call");
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
          } else {
            console.error("Video reference is not available.");
          }
        });
    
        call.on("error", (err) => {
          console.error("Call error:", err);
        });
      });
    
      peerInstanceRef.current.on("error", (err) => {
        console.error("PeerJS error:", err);
      });
    
      // Ensure the PeerJS instance is ready before making a call
      peerInstanceRef.current.on("open", () => {
        console.log("Making call to peerId:", peerId);
        
    
        // Make a call to the peerId
        const call = peerInstanceRef.current.call(peerId, null);
    
        if (!call) {
          console.error("Call could not be made. Check if peerId is correct and PeerJS instance is properly initialized.");
          return;
        }
    
        call.on("stream", (remoteStream) => {
          console.log("Received remote stream after call");
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
          } else {
            console.error("Video reference is not available.");
          }
        });
    
        call.on("error", (err) => {
          console.error("Call error:", err);
        });
      });
    };    

    fetchPeerIdAndInitiateCall();

    return () => {
      if (peerInstanceRef.current) {
        console.log("Cleaning up PeerJS instance");
        peerInstanceRef.current.destroy();
      }
    };
  }, [isSocketConnected, navigate, socket, user]);

  return (
    <div className="admin-stream-container">
      <UpperNav />
      <div className="stream-content">
        <div className="video-container">
          <h2>User Stream</h2>
          <video ref={videoRef} autoPlay playsInline />
        </div>
        <div className="chat-container">
          <h3>Live Chat</h3>
          <div className="chat-messages">
            {/* Chat messages will go here */}
          </div>
          <input type="text" placeholder="Type a message" />
        </div>
      </div>
    </div>
  );
};

export default UserStream;
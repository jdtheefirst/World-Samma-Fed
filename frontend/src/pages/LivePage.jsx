import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import Janus from "janus-gateway-js";
import "../App.css";
import "webrtc-adapter";

const JanusRtmpStreamer = () => {
  const janusRef = useRef(null);
  const [rtmpPlugin, setRtmpPlugin] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [connected, setConnected] = useState(false);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    initializeJanus();

    return () => {
      cleanUp();
    };
  }, []);

  const initializeJanus = async () => {
    try {
      const janusInstance = new Janus.Client("/ws/", { keepalive: true });
      janusRef.current = janusInstance;
      janusInstance
        .createConnection("id")
        .then((connection) => {
          connection
            .createSession()
            .then((session) => {
              session
                .attachPlugin("janus.plugin.rtmp")
                .then((plugin) => {
                  console.log("RTMP plugin attached!");
                  setRtmpPlugin(plugin);
                  setConnected(true);
                  attachStream(plugin);
                })
                .catch((err) => {
                  console.error("Plugin attach error:", err);
                });
            })
            .catch((err) => {
              console.error("Session creation error:", err);
            });
        })
        .catch((err) => {
          console.error("Connection creation error:", err);
        });
    } catch (error) {
      console.error("Error initializing Janus:", error);
    }
  };

  const attachStream = (plugin) => {
    // Capture the local media stream from the user's camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream; // Display the stream in the video element
        localStreamRef.current = stream; // Store the stream in the ref

        // Send the local stream to Janus for RTMP publishing
        plugin.createOffer({
          media: { video: true, audio: true },
          stream,
          success: (jsep) => {
            plugin.send({
              message: { request: "configure", audio: true, video: true },
              jsep,
            });
          },
          error: (error) =>
            console.error("Error creating WebRTC offer:", error),
        });
      })
      .catch((error) => {
        console.error("Error accessing user media:", error);
      });

    plugin.on("message", (msg) => {
      console.log("Message received from RTMP plugin:", msg);
    });

    plugin.on("localstream", (stream) => {
      console.log("Local stream attached.");
      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;
    });

    plugin.on("webrtcState", (on) => {
      console.log("WebRTC peer connection is", on ? "up" : "down");
    });
  };

  const startStreaming = () => {
    if (!rtmpPlugin) {
      console.error("RTMP plugin not attached.");
      return;
    }

    const rtmpUrl = "/stream";
    rtmpPlugin.send({
      message: { request: "publish", rtmp_url: rtmpUrl },
      success: () => {
        console.log("Publishing to RTMP successfully!");
        setStreaming(true);
      },
      error: (error) => console.error("Error publishing to RTMP:", error),
    });
  };

  const stopStreaming = () => {
    if (rtmpPlugin) {
      rtmpPlugin.hangup();
      setStreaming(false);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const cleanUp = () => {
    // Make sure janusRef.current is the Janus client instance
    if (janusRef.current && typeof janusRef.current.destroy === "function") {
      janusRef.current.destroy(); // Clean up Janus instance
      console.log("Janus destroyed successfully");
    } else {
      console.error("Janus instance not found or destroy method missing");
    }
    // Close WebSocket connection if present
    if (wsRef.current) {
      wsRef.current.close();
      console.log("WebSocket connection closed");
    }
  };

  return (
    <div className="streaming-container">
      <div className="video-wrapper">
        <video ref={localVideoRef} autoPlay muted className="video-feed" />
        {!connected && <div className="overlay">Connecting...</div>}
      </div>
      <div className="control-panel">
        <h2>Live Stream Control</h2>
        <div className="status-indicators">
          <div className={`status ${connected ? "connected" : "disconnected"}`}>
            {connected ? "Connected" : "Disconnected"}
          </div>
          <div className={`status ${streaming ? "live" : "idle"}`}>
            {streaming ? "Live" : "Idle"}
          </div>
        </div>
        <div className="controls">
          <button
            onClick={startStreaming}
            disabled={streaming || !connected}
            className="start-btn"
          >
            <FaPlay /> Start Streaming
          </button>
          <button
            onClick={stopStreaming}
            disabled={!streaming}
            className="stop-btn"
          >
            <FaStop /> Stop Streaming
          </button>
        </div>
      </div>
    </div>
  );
};

export default JanusRtmpStreamer;

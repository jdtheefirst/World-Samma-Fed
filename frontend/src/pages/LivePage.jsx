import { useEffect, useRef, useState } from "react";
import "webrtc-adapter";
import Janus from "janus-gateway";
import { FaPlay, FaStop, FaVideo } from "react-icons/fa";

const JanusRtmpStreamer = () => {
  const [janus, setJanus] = useState(null);
  const [rtmpPlugin, setRtmpPlugin] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const localVideoRef = useRef(null);

  const ipRef = useRef(null); // Keep WebSocket connection persistent across renders

  useEffect(() => {
    // Initialize WebSocket connection via backend proxy
    if (!ipRef.current) {
      ipRef.current = new WebSocket("/janus-ws"); // Use backend proxy here

      ipRef.current.onopen = () => {
        setIsWsConnected(true);
        console.log("WebSocket connected to Janus via backend proxy");
      };

      ipRef.current.onclose = () => {
        setIsWsConnected(false);
        console.log("WebSocket closed Janus connection");
      };

      ipRef.current.onerror = (error) => {
        console.error("WebSocket error with Janus", error);
      };
    }

    return () => {
      if (ipRef.current) {
        ipRef.current.close(); // Clean up WebSocket connection on component unmount
      }
    };
  }, []); // Run only once

  useEffect(() => {
    // Initialize Janus only if WebSocket connection is established
    if (isWsConnected) {
      Janus.init({
        debug: "all",
        callback: () => {
          const janusInstance = new Janus({
            server: "/janus-ws",
            success: () => {
              attachRtmpPlugin(janusInstance);
            },
            error: (error) => {
              console.error("Janus error:", error);
            },
          });
          setJanus(janusInstance);
        },
      });
    }

    return () => {
      if (janus) {
        janus.destroy();
      }
    };
  }, [isWsConnected]); // Trigger Janus init when WebSocket is connected

  const attachRtmpPlugin = (janusInstance) => {
    janusInstance.attach({
      plugin: "janus.plugin.rtmp",
      success: (pluginHandle) => {
        setRtmpPlugin(pluginHandle);
        console.log("RTMP plugin attached!");
      },
      error: (error) => {
        console.error("Error attaching RTMP plugin:", error);
      },
      webrtcState: (on) => {
        setConnected(on);
        console.log("WebRTC peer connection is ", on ? "up" : "down");
      },
      onmessage: (msg, jsep) => {
        console.log("Message received from RTMP plugin:", msg);
      },
      onlocalstream: (stream) => {
        localVideoRef.current.srcObject = stream;
      },
    });
  };

  const startStreaming = () => {
    if (!rtmpPlugin) {
      console.error("RTMP plugin not attached.");
      return;
    }

    const rtmpUrl = "rtmp://167.99.44.195:1935/stream";
    rtmpPlugin.publish({
      stream: rtmpUrl,
      success: () => {
        console.log("Publishing to RTMP successfully!");
        setStreaming(true);
      },
      error: (error) => {
        console.error("Error publishing to RTMP:", error);
      },
    });
  };

  const stopStreaming = () => {
    if (rtmpPlugin) {
      rtmpPlugin.hangup();
      setStreaming(false);
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
            disabled={streaming}
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

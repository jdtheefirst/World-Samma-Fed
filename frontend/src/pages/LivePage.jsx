import { useEffect, useRef, useState } from "react";
import "webrtc-adapter";
import Janus from "janus-gateway";
import { FaPlay, FaStop, FaVideo } from "react-icons/fa";

const JanusRtmpStreamer = () => {
  const [janus, setJanus] = useState(null);
  const [rtmpPlugin, setRtmpPlugin] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [connected, setConnected] = useState(false);
  const localVideoRef = useRef(null);

  const ws = new WebSocket("ws://localhost:8188");
  ws.onopen = () => console.log("WebSocket connected");
  ws.onclose = () => console.log("WebSocket closed");
  ws.onerror = (error) => console.error("WebSocket error", error);

  const w = new WebSocket("ws://janus:8188");
  w.onopen = () => console.log("WebSocket connected");
  w.onclose = () => console.log("WebSocket closed");
  w.onerror = (error) => console.error("WebSocket error", error);

  const j = new WebSocket("ws://world-samma-fed-janus-1:8188");
  j.onopen = () => console.log("WebSocket connected");
  j.onclose = () => console.log("WebSocket closed");
  j.onerror = (error) => console.error("WebSocket error", error);

  useEffect(() => {
    Janus.init({
      debug: "all",
      callback: () => {
        const janusInstance = new Janus({
          server: "ws://janus:8188",
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

    return () => {
      if (janus) {
        janus.destroy();
      }
    };
  }, []);

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

    const rtmpUrl = "rtmp://nginx:1935/stream";
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

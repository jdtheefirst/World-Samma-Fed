import { useEffect, useRef, useState } from "react";
import "webrtc-adapter";
import { FaPlay, FaStop, FaVideo } from "react-icons/fa";

const JanusRtmpStreamer = () => {
  const [streaming, setStreaming] = useState(false);
  const [connected, setConnected] = useState(false);
  const localVideoRef = useRef(null);
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const mediaStream = useRef(null); // Hold media stream reference

  const ws = new WebSocket("ws://167.99.44.195:8188"); // WebSocket URL of your Janus server

  ws.onopen = () => {
    console.log("Connected to Janus WebSocket server");
    // Send a message to Janus to initialize
    socket.send(
      JSON.stringify({ janus: "attach", plugin: "janus.plugin.rtmp" })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message from Janus:", data);
    // Handle the Janus responses (such as connection success, etc.)
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  useEffect(() => {
    // Setup socket connection
    if (socket) {
      setIsSocketConnected(socket.connected);
      socket.on("connect", () => setIsSocketConnected(true));
      socket.on("disconnect", () => setIsSocketConnected(false));

      socket.on("stream-started", (response) => {
        console.log("Streaming started:", response);
        startStreamingToJanus(); // Begin media streaming to Janus
      });

      socket.on("stream-stopped", () => {
        console.log("Streaming stopped");
        setStreaming(false);
      });

      socket.on("error", (message) => {
        console.error("Socket.IO error:", message);
      });

      return () => {
        socket.off("stream-started");
        socket.off("stream-stopped");
        socket.off("error");
      };
    }
  }, [socket]);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStream.current = stream; // Save media stream reference
      localVideoRef.current.srcObject = stream; // Display local stream in the video element

      // Emit socket event to signal stream start
      socket.emit("start-stream", { streamId: "your-stream-id" });
    } catch (error) {
      console.error("Error starting stream:", error);
    }
  };

  const startStreamingToJanus = () => {
    if (!mediaStream.current) return; // Ensure media stream is available

    // Assuming janusInstance is available globally or from context
    janusInstance.attach({
      plugin: "janus.plugin.rtmp",
      success: (pluginHandle) => {
        pluginHandle.createOffer({
          media: {
            video: mediaStream.current.getVideoTracks()[0],
            audio: mediaStream.current.getAudioTracks()[0],
          },
          success: (jsep) => {
            pluginHandle.send({
              message: { request: "publish", rtmp: "rtmp://janus:8188/stream" },
              jsep: jsep, // Send SDP offer to Janus
            });
            setStreaming(true);
          },
          error: (error) => {
            console.error("Error creating SDP offer:", error);
          },
        });
      },
      error: (error) => {
        console.error("Error attaching RTMP plugin:", error);
      },
    });
  };

  const stopStreaming = () => {
    socket.emit("stop-stream", { streamId: "your-stream-id" });
    setStreaming(false);
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
            disabled={streaming || !isSocketConnected}
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

// import { useEffect, useRef, useState } from "react";
// import "webrtc-adapter";
// import Janus from "janus-gateway";
// import { FaPlay, FaStop, FaVideo } from "react-icons/fa";

// const JanusRtmpStreamer = () => {
//   const [janus, setJanus] = useState(null);
//   const [rtmpPlugin, setRtmpPlugin] = useState(null);
//   const [streaming, setStreaming] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [isWsConnected, setIsWsConnected] = useState(false);
//   const localVideoRef = useRef(null);

//   const ipRef = useRef(null); // Keep WebSocket connection persistent across renders

//   useEffect(() => {
//     // Initialize WebSocket connection via backend proxy
//     if (!ipRef.current) {
//       ipRef.current = new WebSocket("/janus-ws"); // Use backend proxy here

//       ipRef.current.onopen = () => {
//         setIsWsConnected(true);
//         console.log("WebSocket connected to Janus via backend proxy");
//       };

//       ipRef.current.onclose = () => {
//         setIsWsConnected(false);
//         console.log("WebSocket closed Janus connection");
//       };

//       ipRef.current.onerror = (error) => {
//         console.error("WebSocket error with Janus, not even /janus-ws", error);
//       };
//     }

//     return () => {
//       if (ipRef.current) {
//         ipRef.current.close(); // Clean up WebSocket connection on component unmount
//       }
//     };
//   }, []); // Run only once

//   useEffect(() => {
//     // Initialize Janus only if WebSocket connection is established
//     if (isWsConnected) {
//       Janus.init({
//         debug: "all",
//         callback: () => {
//           const janusInstance = new Janus({
//             server: "/janus-ws",
//             success: () => {
//               attachRtmpPlugin(janusInstance);
//             },
//             error: (error) => {
//               console.error("Janus error:", error);
//             },
//           });
//           setJanus(janusInstance);
//         },
//       });
//     }

//     return () => {
//       if (janus) {
//         janus.destroy();
//       }
//     };
//   }, [isWsConnected]); // Trigger Janus init when WebSocket is connected

//   const attachRtmpPlugin = (janusInstance) => {
//     janusInstance.attach({
//       plugin: "janus.plugin.rtmp",
//       success: (pluginHandle) => {
//         setRtmpPlugin(pluginHandle);
//         console.log("RTMP plugin attached!");
//       },
//       error: (error) => {
//         console.error("Error attaching RTMP plugin:", error);
//       },
//       webrtcState: (on) => {
//         setConnected(on);
//         console.log("WebRTC peer connection is ", on ? "up" : "down");
//       },
//       onmessage: (msg, jsep) => {
//         console.log("Message received from RTMP plugin:", msg);
//       },
//       onlocalstream: (stream) => {
//         localVideoRef.current.srcObject = stream;
//       },
//     });
//   };

//   const startStreaming = () => {
//     if (!rtmpPlugin) {
//       console.error("RTMP plugin not attached.");
//       return;
//     }

//     const rtmpUrl = "rtmp://167.99.44.195:1935/stream";
//     rtmpPlugin.publish({
//       stream: rtmpUrl,
//       success: () => {
//         console.log("Publishing to RTMP successfully!");
//         setStreaming(true);
//       },
//       error: (error) => {
//         console.error("Error publishing to RTMP:", error);
//       },
//     });
//   };

//   const stopStreaming = () => {
//     if (rtmpPlugin) {
//       rtmpPlugin.hangup();
//       setStreaming(false);
//     }
//   };

//   return (
//     <div className="streaming-container">
//       <div className="video-wrapper">
//         <video ref={localVideoRef} autoPlay muted className="video-feed" />
//         {!connected && <div className="overlay">Connecting...</div>}
//       </div>
//       <div className="control-panel">
//         <h2>Live Stream Control</h2>
//         <div className="status-indicators">
//           <div className={`status ${connected ? "connected" : "disconnected"}`}>
//             {connected ? "Connected" : "Disconnected"}
//           </div>
//           <div className={`status ${streaming ? "live" : "idle"}`}>
//             {streaming ? "Live" : "Idle"}
//           </div>
//         </div>
//         <div className="controls">
//           <button
//             onClick={startStreaming}
//             disabled={streaming}
//             className="start-btn"
//           >
//             <FaPlay /> Start Streaming
//           </button>
//           <button
//             onClick={stopStreaming}
//             disabled={!streaming}
//             className="stop-btn"
//           >
//             <FaStop /> Stop Streaming
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JanusRtmpStreamer;

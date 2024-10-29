const kurento = require("kurento-client");

const kurentoUrl = "ws://localhost:8888/kurento"; // This is the WebSocket URL for Kurento

let isLiveStreamActive = false;

async function startKurentoPipeline(sdpOffer, socket) {
  console.log("startKurentoPipeline function about to run");

  // Check if a stream is already active or if the SDP offer is missing
  if (isLiveStreamActive || !sdpOffer) {
    console.log(
      "Stream already active or SDP offer is missing:",
      isLiveStreamActive,
      sdpOffer
    );
    return;
  }

  isLiveStreamActive = true;

  // Connect to the Kurento server
  await kurento(kurentoUrl, (error, kurentoClient) => {
    console.log("We are in Kurento!!!");

    if (error) {
      console.error("Could not find Kurento server at", kurentoUrl);
      isLiveStreamActive = false;
      return socket.emit("error", { message: "Kurento server not available" });
    }

    socket.kurentoClient = kurentoClient;

    // Create a Media Pipeline
    kurentoClient.create("MediaPipeline", (error, pipeline) => {
      if (error) {
        isLiveStreamActive = false;
        return socket.emit("error", { message: error.message });
      }

      pipeline.on("release", () => {
        isLiveStreamActive = false;
        console.log("Pipeline released, stream ended.");
        socket.emit("streamEnded", { message: "Stream has ended." });
      });

      // Create a WebRtcEndpoint
      pipeline.create("WebRtcEndpoint", (error, webRtcEndpoint) => {
        if (error) {
          isLiveStreamActive = false;
          return socket.emit("error", { message: error.message });
        }

        // Monitor media flow state changes
        webRtcEndpoint.on("MediaFlowInStateChange", (event) => {
          if (event.state === "NOT_FLOWING") {
            isLiveStreamActive = false;
            console.log("Media flow stopped, stream ended.");
            socket.emit("streamEnded", { message: "Stream has stopped." });
          }
        });

        // Process the SDP offer from the client
        webRtcEndpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
          if (error) {
            isLiveStreamActive = false;
            return socket.emit("error", { message: error.message });
          }

          socket.emit("sdpAnswer", sdpAnswer); // Send the SDP answer to the client

          // Create an RTP endpoint for streaming
          pipeline.create("RtpEndpoint", (error, rtpEndpoint) => {
            if (error) {
              isLiveStreamActive = false;
              return socket.emit("error", { message: error.message });
            }

            const rtmpUri = "rtmp://nginx:1935/live";

            // Connect the WebRtcEndpoint to the RTP endpoint
            rtpEndpoint.connect(webRtcEndpoint, (error) => {
              if (error) {
                isLiveStreamActive = false;
                return console.error(
                  "Error connecting WebRtcEndpoint to RTP:",
                  error
                );
              }

              // Connect the RTP endpoint to the RTMP server
              rtpEndpoint.connect(rtmpUri, (error) => {
                if (error) {
                  isLiveStreamActive = false;
                  return console.error(
                    "Error streaming to RTMP server:",
                    error
                  );
                }

                console.log("Streaming to RTMP server started");
              });
            });
          });
        });
      });
    });
  });
}

function addIceCandidate(candidate, socket) {
  console.log("Adding a candidate!", candidate, socket);
  if (socket.kurentoClient && candidate) {
    socket.kurentoClient.addIceCandidate(candidate, (error) => {
      if (error) {
        console.error("Error adding ICE candidate:", error);
      } else {
        console.log("ICE candidate added successfully.");
      }
    });
  }
}

module.exports = {
  addIceCandidate,
  startKurentoPipeline,
  isLiveStreamActive,
};

const kurento = require("kurento-client");

const kurentoUrl = "ws://localhost:8888/kurento"; // This is the WebSocket URL for Kurento

let isLiveStreamActive = false;

function startKurentoPipeline(sdpOffer, socket) {
  if (isLiveStreamActive || !sdpOffer) {
    console.log("Something was off", isLiveStreamActive, sdpOffer);
    return;
  }

  isLiveStreamActive = true;

  kurento(kurentoUrl, (error, kurentoClient) => {
    if (error) {
      console.error("Could not find Kurento server at", kurentoUrl);
      isLiveStreamActive = false;
      return socket.emit("error", { message: "Kurento server not available" });
    }

    socket.kurentoClient = kurentoClient;

    kurentoClient.create("MediaPipeline", (error, pipeline) => {
      if (error) {
        isLiveStreamActive = false;
        return socket.emit("error", { message: error.message });
      }

      // Listen for when the pipeline is released (indicates end of stream)
      pipeline.on("release", () => {
        isLiveStreamActive = false;
        console.log("Pipeline released, stream ended.");
      });

      pipeline.create("WebRtcEndpoint", (error, webRtcEndpoint) => {
        if (error) {
          isLiveStreamActive = false;
          return socket.emit("error", { message: error.message });
        }

        // Handle media flow changes
        webRtcEndpoint.on("MediaFlowInStateChange", (event) => {
          if (event.state === "NOT_FLOWING") {
            isLiveStreamActive = false;
            console.log("Media flow stopped, stream ended.");
          }
        });

        webRtcEndpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
          if (error) {
            isLiveStreamActive = false;
            return socket.emit("error", { message: error.message });
          }

          socket.emit("sdpAnswer", { sdpAnswer });

          pipeline.create("RtpEndpoint", (error, rtpEndpoint) => {
            if (error) {
              isLiveStreamActive = false;
              return socket.emit("error", { message: error.message });
            }

            const rtmpUri = "rtmp://nginx:1935/live";

            rtpEndpoint.connect(webRtcEndpoint, (error) => {
              if (error) {
                isLiveStreamActive = false;
                return console.error(
                  "Error connecting WebRtcEndpoint to RTP:",
                  error
                );
              }

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
  if (socket.kurentoClient) {
    socket.kurentoClient.addIceCandidate(candidate);
  }
}

module.exports = {
  addIceCandidate,
  startKurentoPipeline,
  isLiveStreamActive,
};

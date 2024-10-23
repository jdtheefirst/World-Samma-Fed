const kurento = require("kurento-client");
const { getIO } = require("./socket");
const socket = getIO(); // Assuming this returns your socket instance

const kurentoUrl = "ws://localhost:8888/kurento"; // This is the WebSocket URL for Kurento

// Listen for socket connections
socket.on("connection", (client) => {
  client.on("start", (data) => {
    startKurentoPipeline(client, data.sdpOffer);
  });

  client.on("onIceCandidate", (data) => {
    addIceCandidate(client, data.candidate);
  });
});

function startKurentoPipeline(client, sdpOffer) {
  kurento(kurentoUrl, (error, kurentoClient) => {
    if (error) {
      console.error("Could not find Kurento server at", kurentoUrl);
      return client.emit("error", { message: "Kurento server not available" });
    }

    client.kurentoClient = kurentoClient;

    kurentoClient.create("MediaPipeline", (error, pipeline) => {
      if (error) return client.emit("error", { message: error.message });

      pipeline.create("WebRtcEndpoint", (error, webRtcEndpoint) => {
        if (error) return client.emit("error", { message: error.message });

        webRtcEndpoint.processOffer(sdpOffer, (error, sdpAnswer) => {
          if (error) return client.emit("error", { message: error.message });

          // Send SDP answer to the client
          client.emit("sdpAnswer", { sdpAnswer });

          // Connect WebRtcEndpoint to RTMP
          pipeline.create("RtpEndpoint", (error, rtpEndpoint) => {
            if (error) return client.emit("error", { message: error.message });

            const rtmpUri = "rtmp://localhost/live"; // Your RTMP server URL

            rtpEndpoint.connect(webRtcEndpoint, (error) => {
              if (error)
                return console.error(
                  "Error connecting WebRtcEndpoint to RTP:",
                  error
                );

              // Stream from WebRtcEndpoint to RTMP server
              rtpEndpoint.connect(rtmpUri, (error) => {
                if (error)
                  return console.error(
                    "Error streaming to RTMP server:",
                    error
                  );
                console.log("Streaming to RTMP server started");
              });
            });
          });
        });
      });
    });
  });
}

function addIceCandidate(client, candidate) {
  if (client.kurentoClient) {
    client.kurentoClient.addIceCandidate(candidate);
  }
}

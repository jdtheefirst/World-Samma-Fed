import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Box, Heading, Text, Spinner, Stack } from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";

const LiveStream = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [isLive, setIsLive] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const YOUTUBE_PLAYLIST_ID = "YOUR_PLAYLIST_ID"; // Replace with your YouTube playlist ID
  const YOUTUBE_API_KEY = "YOUR_API_KEY"; // Replace with your YouTube API key
  const liveStreamURL = "https://test.worldsamma.org/live/stream.m3u8";

  // Fetch YouTube Playlist
  const fetchPlaylist = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}&maxResults=10`
      );
      if (!response.ok) throw new Error("Failed to fetch playlist");
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching YouTube playlist:", error);
    }
  };

  // Check Live Stream Availability
  const checkLiveStream = async () => {
    try {
      const response = await fetch(liveStreamURL, { method: "HEAD" });
      setIsLive(response.ok); // `ok` is true if the resource is available
    } catch (error) {
      console.error("Error checking live stream:", error);
      setIsLive(false);
    }
  };

  // Initialize Video.js Player
  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Update Player Source
  useEffect(() => {
    if (playerRef.current) {
      const source = isLive
        ? [{ src: liveStreamURL, type: "application/x-mpegURL" }]
        : videos.length > 0
        ? [
            {
              src: `https://www.youtube.com/watch?v=${videos[0].snippet.resourceId.videoId}`,
              type: "video/mp4",
            },
          ]
        : [];

      playerRef.current.src(source);
    }
  }, [isLive, videos]);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPlaylist(), checkLiveStream()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      fontFamily="Arial, sans-serif"
      color="gray.800"
    >
      <UpperNav />
      <Box>
        <Heading as="h1" mb={4}>
          Live Stream
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : isLive ? (
          <Box data-vjs-player mb={6}>
            <video
              ref={videoRef}
              className="video-js vjs-default-skin"
              aria-label="Live Stream Player"
            />
          </Box>
        ) : (
          <Text>No Live Stream Available</Text>
        )}

        <Box>
          <Heading as="h2" mb={4}>
            Playlist
          </Heading>
          {videos.length === 0 ? (
            <Text>No Videos Available</Text>
          ) : (
            <Stack spacing={4}>
              {videos.map((video) => (
                <Box
                  key={video.snippet.resourceId.videoId}
                  p={4}
                  border="1px solid #ccc"
                  borderRadius="md"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
                      "_blank"
                    )
                  }
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <Text fontWeight="bold">{video.snippet.title}</Text>
                  <Text fontSize="sm" noOfLines={2}>
                    {video.snippet.description}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LiveStream;

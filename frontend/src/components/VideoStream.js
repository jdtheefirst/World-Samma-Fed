import React, { useEffect, useRef, useState } from 'react';
import ZoomVideo from '@zoom/videosdk';
import UpperNav from '../miscellenious/upperNav';
import { useConnectSocket } from './config/chatlogics';
import './AdminStream.css';
import { Avatar } from '@chakra-ui/avatar';

function VideoChat({ user }) {
  const videoRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [client, setClient] = useState(null);
  const [isSendingVideo, setIsSendingVideo] = useState(false);
  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const adminId = "6693a995f6295b8bd90d9301";

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);

      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

      socket.on('disconnect', () => {
        setIsSocketConnected(false);
      });

      const handleReceivedMessage = (message) => {
        setMessages((prev) => [...prev, message]);
      };

      socket.on("received-message", handleReceivedMessage);

      return () => {
        socket.off("received-message", handleReceivedMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketConnected) {
      const joinSession = async () => {
        try {
          const isAdmin = user?._id === adminId;
          const response = await fetch(`/token/${isAdmin ? 1 : 0}`);
          const data = await response.json();
          const token = data.token;

          const zoomClient = ZoomVideo.createClient();
          await zoomClient.init('en-US', 'CDN');
          setClient(zoomClient);

          const sessionName = 'mytopic';
          const userName = user?.name || 'Guest';

          await zoomClient.join(sessionName, token, userName);

          const stream = zoomClient.getMediaStream();

          if (videoRef.current) {
            console.log('Video element is available');
          } else {
            console.error('Video element is not available');
          }

          if (isAdmin) {
            console.log('Admin starting video');
            try {
              if (videoRef.current instanceof HTMLVideoElement) {
                await stream.startVideo({ videoElement: videoRef.current });
                setIsSendingVideo(true);
                socket.emit("wsfSessionStarted");
              } else {
                console.error('Expected HTMLVideoElement but got', videoRef.current);
              }
            } catch (error) {
              console.error('Error starting video:', error);
            }
          } else {
            console.log('Viewer joining the session');

            zoomClient.on('peer-video-state-change', async (payload) => {
              console.log('Peer video state changed:', payload);

              if (payload.action === 'Start') {
                try {
                  if (videoRef.current instanceof HTMLVideoElement) {
                    setTimeout(() => {
                      stream.renderVideo(videoRef.current, payload.userId, 640, 480, 0, 0, 3);
                      setIsSendingVideo(true);
                    }, 500);  // Adjust the delay as necessary
                  } else {
                    console.error('Expected HTMLVideoElement but got', videoRef.current);
                  }
                } catch (error) {
                  console.error('Error rendering video:', error);
                }
              } else if (payload.action === 'Stop') {
                try {
                  if (videoRef.current instanceof HTMLVideoElement) {
                    stream.stopRenderVideo(videoRef.current, payload.userId);
                    setIsSendingVideo(false);
                  } else {
                    console.error('Expected HTMLVideoElement but got', videoRef.current);
                  }
                } catch (error) {
                  console.error('Error stopping video:', error);
                }
              }
            });

            zoomClient.on('user-updated', (payload) => {
              console.log('User updated:', payload);

              // Ensure payload is an array
              if (Array.isArray(payload) && payload.length > 0) {
                payload.forEach(user => {
                  if (user.bVideoOn) {
                    try {
                      if (videoRef.current instanceof HTMLVideoElement) {
                        setTimeout(() => {
                          stream.renderVideo(videoRef.current, user.userId, 640, 480, 0, 0, 3);
                          setIsSendingVideo(true);
                        }, 500);  // Adjust the delay as necessary
                      } else {
                        console.error('Expected HTMLVideoElement but got', videoRef.current);
                      }
                    } catch (error) {
                      console.error('Error rendering video on user update:', error);
                    }
                  } else {
                    try {
                      if (videoRef.current instanceof HTMLVideoElement) {
                        stream.stopRenderVideo(videoRef.current, user.userId);
                        setIsSendingVideo(false);
                      } else {
                        console.error('Expected HTMLVideoElement but got', videoRef.current);
                      }
                    } catch (error) {
                      console.error('Error stopping video on user update:', error);
                    }
                  }
                });
              } else {
                console.error('Expected payload to be an array with user data');
              }
            });

            socket.on("wsfSessionStarted", () => {
              console.log("Session started notification received");
            });
          }
        } catch (error) {
          console.error('Error joining session or accessing stream', error);
        }
      };

      joinSession();
    }
  }, [isSocketConnected, user, socket]);

  const sendMessage = () => {
    if (input && socket) {
      socket.emit('chat-message', { user: user.name, pic: user.pic, content: input });
      setInput('');
    }
  };

  const endSession = () => {
    if (client) {
      client.leave()
        .then(() => {
          console.log('Left the session successfully');
        })
        .catch((error) => {
          console.error('Failed to leave the session', error);
        });
    }
  };

  return (
    <div className="admin-stream-container">
      <UpperNav />
      <div className="stream-content">
        <div className="video-container">
          <video ref={videoRef} style={{ width: '640px', height: '480px' }} />
          <div className="chat-container">
            <h3>Live Chat{'\u00A0'}{!isSendingVideo && <p>Waiting for video...</p>}</h3>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <li style={{ display: 'flex', justifyContent: "left", alignItems: "center" }} key={idx}>
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={msg?.user}
                    src={msg?.pic}
                  />
                  <p>{'\u00A0'}{msg?.user}:{'\u00A0'}{msg.content}</p>
                </li>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button className='send' onClick={sendMessage}>Send</button>
              <button className='end-session' onClick={endSession}>End Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoChat;
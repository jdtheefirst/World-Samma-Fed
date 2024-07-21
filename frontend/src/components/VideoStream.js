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

      socket.on("received-message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
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

          if (isAdmin) {
            console.log('Admin starting video');
            stream.startVideo({ videoElement: videoRef.current });
            setIsSendingVideo(true);
          } else {
            console.log('Viewer listening for video state changes');

            zoomClient.on('peer-video-state-change', (payload) => {
              console.log('Peer video state changed:', payload);
              if (payload.action === 'Start') {
                stream.renderVideo(videoRef.current, payload.userId, 640, 480, 0, 0, 3);
                setIsSendingVideo(true);
              } else if (payload.action === 'Stop') {
                stream.stopRenderVideo(videoRef.current, payload.userId);
                setIsSendingVideo(false);
              }
            });

            zoomClient.on('user-updated', (payload) => {
              console.log('User updated:', payload);
              if (payload.action === 'Join') {
                payload.userList.forEach(user => {
                  if (user.bVideoOn) {
                    stream.renderVideo(videoRef.current, user.userId, 640, 480, 0, 0, 3);
                    setIsSendingVideo(true);
                  }
                });
              }
            });
          }
        } catch (error) {
          console.error('Error joining session or accessing stream', error);
        }
      };

      joinSession();

      const handleReceivedMessage = (message) => {
        console.log('Received message:', message);
        setMessages((prev) => [...prev, message]);
      };

      socket.on('received-message', handleReceivedMessage);

      return () => {
        socket.off('received-message', handleReceivedMessage);
      };
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
          {!isSendingVideo && <p>Waiting for video...</p>}
          <div className="chat-container">
            <h3>Live Chat</h3>
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
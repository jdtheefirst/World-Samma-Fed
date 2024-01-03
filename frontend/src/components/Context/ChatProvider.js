import React, { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [verify, setVerify] = useState(undefined);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [recoverEmail, setRecoverEmail] = useState();
  const [socket, setSocket] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const token = userInfo.token;
 
    const newSocket = io('http://localhost:8080', {
      query: { token }});
    setSocket(newSocket);

    return () => newSocket.close();
}, [userInfo.token]);

  return (
    <ChatContext.Provider
      value={{
        recoverEmail,
        setRecoverEmail,
        verify,
        setVerify,
        pic,
        setPic,
        email,
        setEmail,
        name,
        setName,
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export var ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

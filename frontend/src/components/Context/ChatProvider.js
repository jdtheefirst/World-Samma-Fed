import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [verify, setVerify] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [chat, setChat] = useState(undefined);
  const [email, setEmail] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [send, setSend] = useState(null);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [recoverEmail, setRecoverEmail] = useState();
  const [notification, setNotification] = useState([]);
  const [messages, setMessages] = useState([]);
  const [requests, setRequests] = useState([]);
  const [club, setClub] = useState(undefined);
  const [national, setNational] = useState(null);
  const [province, setProvince] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        recoverEmail,
        setRecoverEmail,
        verify,
        setVerify,
        chat,
        setChat,
        notification,
        setNotification,
        pic,
        setPic,
        email,
        setEmail,
        name,
        setName,
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        send,
        setSend,
        messages,
        setMessages,
        requests,
        setRequests,
        club,
        setClub,
        national,
        setNational,
        province,
        setProvince,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

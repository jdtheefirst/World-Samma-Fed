<<<<<<< HEAD
import React, { createContext, useContext, useState} from "react";
=======
import React, { createContext, useContext, useState } from "react";
>>>>>>> master

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [verify, setVerify] = useState(undefined);
<<<<<<< HEAD
  const [user, setUser] = useState(undefined);
=======
  const [user, setUser] = useState(null);
>>>>>>> master
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
<<<<<<< HEAD
=======
  const [national, setNational] = useState(null);
  const [province, setProvince] = useState(null);
>>>>>>> master

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
<<<<<<< HEAD
        setClub
=======
        setClub,
        national,
        setNational,
        province,
        setProvince,
>>>>>>> master
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

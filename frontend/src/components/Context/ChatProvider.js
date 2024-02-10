import React, { createContext, useContext, useState} from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [verify, setVerify] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [chat, setChat] = useState(undefined);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [recoverEmail, setRecoverEmail] = useState();
  const [notification, setNotification] = useState([]);

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

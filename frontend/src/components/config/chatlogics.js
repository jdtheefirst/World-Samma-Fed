import axios from "axios";

export const isSameSenderMargin = (messages, m, i, userId) => {
  const isCurrentUserSender = m.sender?.$oid === userId;

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender?.$oid === m.sender?.$oid &&
    !isCurrentUserSender
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender?.$oid !== m.sender?.$oid &&
      !isCurrentUserSender) ||
    (i === messages.length - 1 && !isCurrentUserSender)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id !== m.sender?._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  const lastMessageSenderId = messages[messages.length - 1].sender?.$oid;
  return (
    i === messages.length - 1 &&
    lastMessageSenderId !== userId &&
    lastMessageSenderId
  );
};


export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender?.$oid === m.sender?.$oid;
};

export const getSenderName = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderId = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1]._id : users[0]._id;
};

export const getSenderFull = (loggedUser, user) => {
  return user[0]._id === loggedUser._id ? user[1] : user[0];
};

export async function getUserById(userId, token) {
  if (!userId && !token) {
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/user/getuserid/${userId}`, config);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export function useConnectSocket(token) {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (socketInstance) {
//       setSocket(socketInstance);
//       return;
//     }

//     const newSocket = io('https://fuckmate.boo', {
//       query: { token },
//     });

//     newSocket.on('connect', () => {
//     });

//     newSocket.on("disconnect", () => {
//     });

//     setSocket(newSocket);
//     socketInstance = newSocket;

//     return () => {
//       newSocket.disconnect();
//       socketInstance = null;
//     };
//   }, [token]);

//   return socket;
// }
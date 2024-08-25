import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

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

export function useConnectSocket(user) {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user || !user.token) {
      return;
    }

    // Check if the socket already exists
    if (socketRef.current) {
      setSocket(socketRef.current);
      return;
    }

    const userId = user._id;
    const newSocket = io("/", {
      query: { token: user.token, userId },
    });

    newSocket.on("connect", () => {
      console.log("connected");
      setSocket(newSocket); // Set socket state after connection
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Update socketRef with the new socket instance
    socketRef.current = newSocket;

    // Clean up function to disconnect socket when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      socketRef.current = null;
    };
  }, [user]); // Only rerun if user changes

  return socket;
}

export async function makePaymentMpesa(amount, phoneNumber, user, toast) {
  if (!phoneNumber) {
    return;
  }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/paycheck/makepaymentmpesa/${user._id}?amount=${amount}`,
      { phoneNumber },
      config
    );

    if (data) {
      toast({
        title: "You have been prompt to finish your subscription process",
        status: "info",
        duration: 1000,
        position: "bottom",
      });
    }
  } catch (error) {}
}

export async function donationsMpesa(amount, phoneNumber, toast) {
  if (!phoneNumber) {
    return;
  }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/paycheck/donationsmpesa?amount=${amount}`,
      { phoneNumber },
      config
    );

    if (data) {
      toast({
        title: "You have been prompt to finish your subscription process",
        status: "info",
        duration: 1000,
        position: "bottom",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleApprove(accountType, type, user, setUser) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/paycheck/${user._id}/${type}/${accountType}`,
      {},
      config
    );

    const userData = await {
      ...user,
      accountType: data.accountType,
      subscription: data.subscription,
      day: data.day,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred", error);
  }
}

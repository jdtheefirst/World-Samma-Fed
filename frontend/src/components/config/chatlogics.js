import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  otherName: z
    .string()
    .min(2, "Other name must be at least 2 characters")
    .max(50, "Other name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]),
  password: z
    .string()
    .min(4, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters"),
  confirmPassword: z
    .string()
    .min(4, "Confirm password must be at least 8 characters long")
    .max(100, "Confirm password must be at most 100 characters")
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords do not match",
    }),
  passport: z.string().regex(/^\d{8,15}$/, "Invalid passport/ID number"),
  selectedCountry: z.string().min(2, "Country is required"),
  provinces: z.string().optional(),
  language: z.string().min(2, "Language is required"),
  pic: z.string().url("Profile picture is required"),
});

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

    newSocket.on("disconnect", (reason) => {
      console.log("Socket.IO disconnected due to:", reason);
      if (reason === "io server disconnect") {
        // Handle server-side disconnections
        newSocket.connect();
      }
    });

    newSocket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    newSocket.on("error", (error) => {
      console.error("Socket.IO error:", error);
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

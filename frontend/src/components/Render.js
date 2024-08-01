import React, { useEffect, useState } from 'react';
import LoadingSpinner from './Loading'; // Adjust import as needed
import SessionExpirationMessage from './SessionExpired'; // Adjust import as needed
import { ChatState } from './Context/ChatProvider';

const DelayedRender = ({ Component, courses, ...props }) => {
  const { user, setUser } = ChatState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo); // Set user information from localStorage
    }
    setLoading(false); // Set loading to false after processing
  }, [setUser]);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while fetching user info
  }

  if (!user) {
    return <SessionExpirationMessage />; // Show message if no user info is available
  }

  return <Component {...props} user={user} courses={courses} />; // Render the component with user and courses props
};

export default DelayedRender;

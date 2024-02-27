
const userSockets = new Map();

const setUserSocket = (userId, socketId) => {
  userSockets.set(userId, socketId);
}

const getUserSocket = (userId) => {
  return userSockets.get(userId);
}

module.exports = {
  setUserSocket,
  getUserSocket,
};

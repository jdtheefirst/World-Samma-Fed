
const userSockets = new Map();
<<<<<<< HEAD
=======
const peerIdMap = new Map();
>>>>>>> master

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

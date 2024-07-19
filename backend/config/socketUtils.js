
const userSockets = new Map();
const peerIdMap = new Map();

const setUserSocket = (userId, socketId) => {
  userSockets.set(userId, socketId);
}

const getUserSocket = (userId) => {
  return userSockets.get(userId);
}

const setPeerId = (userId, peerId) => {
  peerIdMap.set(userId, peerId);
};

const getPeerId = (userId) => {
  return peerIdMap.get(userId);
};

const getCurrentPeerId = () => {
  // Assuming there's only one active peerId at a time
  return Array.from(peerIdMap.values())[0] || null;
};

module.exports = {
  setUserSocket,
  getUserSocket,
  setPeerId,
  getPeerId,
  getCurrentPeerId,
};

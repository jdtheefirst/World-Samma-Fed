const mongoose = require('mongoose');

const downloadCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 70000,
  },
});

const DownloadCount = mongoose.model('DownloadCount', downloadCountSchema);

module.exports = DownloadCount;

const DownloadCount = require('../models/downloadModel');

// Fetch initial download count
const getDownloadCount = async (req, res) => {
  try {
    let countDoc = await DownloadCount.findOne();
    if (!countDoc) {
      countDoc = new DownloadCount();
      await countDoc.save();
    }
    res.json({ count: countDoc.count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error fetching download count' });
  }
};

// Increment download count
const incrementDownloadCount = async (req, res) => {
  try {
    let countDoc = await DownloadCount.findOne();
    if (!countDoc) {
      countDoc = new DownloadCount();
    }
    countDoc.count += 1;
    await countDoc.save();
    res.json({ count: countDoc.count });
  } catch (error) {
    res.status(500).json({ message: 'Server error incrementing download count' });
  }
};

module.exports = { getDownloadCount, incrementDownloadCount };

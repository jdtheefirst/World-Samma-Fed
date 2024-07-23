const express = require("express");
const router = express.Router();
const { getDownloadCount, incrementDownloadCount } = require('../controllers/downloadController');

// Route to get the download count
router.get('/count', getDownloadCount);

// Route to increment the download count
router.post('/increment', incrementDownloadCount);

module.exports = router;

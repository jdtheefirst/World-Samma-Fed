const pollModel = require("../models/pollModel");

const fetchVotes = async (req, res) => {

    try {
      const poll = await pollModel.findOne();
      res.json(poll);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const makeVote = async (req, res) => {
    const { option } = req.body;
    
    try {
      const poll = await pollModel.findOne();
      const optionIndex = poll.options.findIndex(opt => opt.option === option);
  
      if (optionIndex === -1) {
        return res.status(400).json({ message: 'Invalid option' });
      }
  
      poll.options[optionIndex].votes += 1;
      await poll.save();
  
      res.json(poll);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = {makeVote, fetchVotes}
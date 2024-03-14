const Work = require("../models/submittedWork");

const submitWork = async (req, res) => {
  const { userId } = req.params;
  const { savePhoto, saveVideo } = req.body;

  try {
    const data = {
      student: userId,
      passport: savePhoto,
      video: saveVideo,
    };
    const work = await Work.create(data);

    res.json(work);
  } catch (error) {
    console.log(error);
  }
};

const fetchWork = async (req, res) => {
  try {
    const allWork = await Work.find().populate("student");

    res.json(allWork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { submitWork, fetchWork };

const Work = require("../models/submittedWork");
const dotenv = require("dotenv");
dotenv.config({ path: "./secrets.env" });

const submitWork = async (req, res) => {
  const { userId } = req.params;
  const { savePhoto, saveVideo } = req.body;
  const assisted = Boolean(req.query.assisted);

  try {
    const data = {
      student: userId,
      passport: savePhoto,
      video: saveVideo,
      coachAssisted: assisted,
    };
    const work = await Work.create(data);

    res.json(work);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to submit work" });
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
const deleteWork = async (req, res) => {
  const { submissionId } = req.params;
  try {
    const work = await Work.findByIdAndDelete(submissionId, {
      new: true,
    }).populate("student");
    res.status(201).json(work);
    console.log(work);
  } catch (error) {
    console.log(error);
  }
};
const deleteImages = async (req, res) => {
  const publicIds = req.body.publicIds;
  const timestamp = new Date().getTime();
  const stringToSign = `public_ids=${publicIds.join(
    ","
  )}&timestamp=${timestamp}${process.env.CloudnarySecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign)
    .digest("hex");

  try {
    const formData = new FormData();
    formData.append("public_ids", publicIds.join(","));
    formData.append("signature", signature);
    formData.append("api_key", process.env.CloudnaryKey);
    formData.append("timestamp", timestamp);

    await axios.delete(
      `https://api.cloudinary.com/v1_1/dsdlgmgwi/resources/image/upload`,
      { data: formData }
    );

    res.status(200).json({ message: "Images deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the images" });
  }
};

module.exports = { submitWork, fetchWork, deleteWork, deleteImages };

const questionModel = require("../models/tempQuesModel");
const { sendMail } = require("../utility/nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dckyh6od6",
  api_key: "952562739436573",
  api_secret: "g1z4nDF2OYcd-QYgwgF7B06VFrA",
});

module.exports.addTempQuestion = async function addTempQuestion(req, res) {
  const QImage = req.body.questionImage;
  let image;
  if (QImage) {
    const Q_result = await cloudinary.uploader.upload(QImage);
    image = Q_result.url;
  }

  const questionData = new questionModel({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    user: req.body.user,
    image: image,
  });

  await questionData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Question not added successfully",
      });
    });
};

module.exports.getTempQues = async function getTempQues(req, res) {
  try {
    let temp = await questionModel.find();

    if (temp) {
      return res.json({
        message: "all quizs retrieved ",
        data: temp,
      });
    } else {
      return res.json({
        message: "quizs not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteTempQues = async function deleteTempQues(req, res) {
  try {
    const operation = req.body.operation;

    // console.log(req.body.user.user);
    if (operation == "reject") {
      sendMail(
        "sendRejectEmail",
        req.body.user.user,
        "Your Question is rejected by Lead4Needs"
      );
    }
    let id = req.params.id;
    // console.log(id);

    let deleteTempQues = await questionModel.findByIdAndDelete(id);
    return res.json({
      message: "ques deleted successfully",
      data: deleteTempQues,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const tempAnsModel = require("../models/tempAnsModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dckyh6od6",
  api_key: "952562739436573",
  api_secret: "g1z4nDF2OYcd-QYgwgF7B06VFrA",
});

module.exports.addTempAnswer = async function addTempAnswer(req, res) {
  const answerImage = req.body.answerImage;
  let image;
  if (answerImage) {
    const Q_result = await cloudinary.uploader.upload(answerImage);
    image = Q_result.url;
  }

  const answerData = new tempAnsModel({
    question_id: req.body.question_id,
    answer: req.body.answer,
    user: req.body.user,
    image: image,
  });

  await answerData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Answer not added successfully",
      });
    });
};

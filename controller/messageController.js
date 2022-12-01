const messageModel = require("../models/messageModel");
const cloudinary = require("cloudinary").v2;

module.exports.addMessages = async function addMesages(req, res) {
  const messageData = new messageModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    user: req.body.user,
  });

  await messageData
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

module.exports.getAllMessages = async function getAllMessages(req, res) {
  try {
    let messages = await messageModel.find();
    // console.log("iiiii", questions);
    if (messages) {
      return res.json({
        message: "all messages retrieved ",
        data: messages,
      });
    } else {
      return res.json({
        message: "user not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteMessages = async function deleteMessages(req, res) {
  let id = req.params.id;

  // console.log(id);
  try {
    let deleteMessages = await messageModel.findByIdAndDelete(id);
    if (deleteMessages) {
      return res.json({
        message: "ques deleted successfully",
        data: deleteMessages,
      });
    } else {
      return res.json({
        message: "user not found ",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

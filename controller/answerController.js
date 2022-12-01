const answerModel = require("../models/answerModel");
const reportModel = require("../models/reportModel");
const userCoinsModel = require("../models/userCoinsModel");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dckyh6od6",
  api_key: "952562739436573",
  api_secret: "g1z4nDF2OYcd-QYgwgF7B06VFrA",
});

module.exports.addAnswer = async function addAnswer(req, res) {
  const answerImage = req.body.answerImage;
  let image;
  if (answerImage) {
    const Q_result = await cloudinary.uploader.upload(answerImage);
    image = Q_result.url;
  }

  const answerData = new answerModel({
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

module.exports.getUserAnswers = async function getUserAnswers(req, res) {
  // console.log(req.body.qid);
  try {
    const answers = await answerModel.find({
      user: req.body.user,
    });

    if (answers) {
      return res.json({
        message: "all answer retrieved ",
        data: answers,
      });
    } else {
      return res.json({
        message: "answer not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.getAllAnswers = async function getAllAnswers(req, res) {
  // console.log(req.body.qid);
  try {
    const answers = await answerModel.find({
      question_id: req.body.qid,
    });

    if (answers) {
      return res.json({
        message: "all answer retrieved ",
        data: answers,
      });
    } else {
      return res.json({
        message: "answer not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.likeAnswer = async function likeAnswer(req, res) {
  const result = await answerModel.findByIdAndUpdate(
    req.body.postId,

    {
      $set: { coins: req.body.coin },

      $push: { likes: req.body.useremail },

      $pull: { dislikes: req.body.useremail },
    },
    {
      new: true,
    }
  );

  // await answerModel.findByIdAndUpdate(
  //   req.body.postId,
  //   {
  //     $pull: { dislikes: req.body.useremail },
  //   },
  //   {
  //     new: true,
  //   }
  // );

  return res.json({
    message: "all answer retrieved ",
    data: result,
  });
};
module.exports.dislikeAnswer = async function dislikeAnswer(req, res) {
  const result = await answerModel.findByIdAndUpdate(
    req.body.postId,

    {
      $set: { coins: req.body.coin },
      $pull: { likes: req.body.useremail },

      $push: { dislikes: req.body.useremail },
    },
    {
      new: true,
    }
  );
  // await answerModel.findByIdAndUpdate(
  //   req.body.postId,
  //   // { coins: req.body.coin },
  //   {
  //     $pull: { likes: req.body.useremail },
  //   },
  //   {
  //     new: true,
  //   }
  // );

  return res.json({
    message: "all answer retrieved ",
    data: result,
  });
};

module.exports.reportAnswer = async function reportAnswer(req, res) {
  console.log("iiiiiiiiiiiiiiiiiiiiiiiiiii");

  // sendMail("sendemail", details);
  const reportData = new reportModel({
    question_id: req.body.qid,
    quesTitle: req.body.quesTitle,
    answer_id: req.body.aid,
    Ansbody: req.body.Ansbody,
    user: req.body.user,
    reportType: req.body.type,
  });

  await reportData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Reports not added successfully",
      });
    });
};

module.exports.updateAnswer = async function (req, res) {
  try {
    let id = req.params.id;
    // console.log(id, req.body.answer);

    let dataToBeUpdated = req.body.answer;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let answer = await answerModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      answer[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await answer.save();
    res.json({
      message: "data updated successfully",
      data: answer,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteAnswer = async function deleteAnswer(req, res) {
  try {
    let id = req.params.id;
    // console.log(id);
    let deletedAnswer = await answerModel.findByIdAndDelete(id);
    return res.json({
      message: "Answer deleted successfully",
      data: deletedAnswer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getAnsNum = async function getAnsNum(req, res) {
  try {
    const Anum = await answerModel.find({ user: req.body.email });
    // .count();

    if (Anum) {
      return res.json({
        message: "single question retrieved ",
        data: Anum,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: Anum,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const questionModel = require("../models/questionModel");
const scoreModel = require("../models/scoreModel");
const reportModel = require("../models/reportModel");
const { sendMail } = require("../utility/nodemailer");

module.exports.addQuestion = async function addQuestion(req, res) {
  const operation = req.body.operation;

  //for only explaining and simplicity

  if (operation == "accept") {
    sendMail(
      "sendAcceptEmail",
      // req.body.response.user,
      req.body.user,
      "Your Question is accepted by Lead4Needs"
    );
  }

  // sendMail("sendemail", details);
  const questionData = new questionModel({
    // title: req.body.response.title,
    title: req.body.title,

    // body: req.body.response.body,
    body: req.body.body,

    // tags: req.body.response.tags,
    tags: req.body.tags,

    // user: req.body.response.user,
    user: req.body.user,

    // image: req.body.response.image,
    image: req.body.image,
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

// /* for Dummy score */

module.exports.addScore = async function addScore(req, res) {
  const scoreData = new scoreModel({
    score: req.body.score,
  });

  await scoreData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "score not added successfully",
      });
    });
};

module.exports.getScore = async function getScore(req, res) {
  try {
    let score = await scoreModel.find();
    // console.log("iiiii", score);
    if (score) {
      return res.json({
        message: "all score retrieved ",
        data: score,
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

module.exports.getQuesNum = async function getQuesNum(req, res) {
  try {
    const Qnum = await questionModel.find({ user: req.body.email }).count();

    if (Qnum) {
      return res.json({
        message: "single question retrieved ",
        data: Qnum,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: Qnum,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.singleQuestion = async function singleQuestion(req, res) {
  try {
    // console.log(req.body.qid);
    let question = await questionModel.findById(req.body.qid);
    // console.log("iiiii", questions);
    if (question) {
      return res.json({
        message: "single question retrieved ",
        data: question,
      });
    } else {
      return res.json({
        message: "question not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllQuestions = async function getAllQuestions(req, res) {
  try {
    let questions = await questionModel.find();
    // console.log("iiiii", questions);
    if (questions) {
      return res.json({
        message: "all questions retrieved ",
        data: questions.reverse(),
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

module.exports.getUserQuestions = async function getUserQuestions(req, res) {
  // console.log(req.body.qid);
  try {
    const question = await questionModel.find({
      user: req.body.user,
    });

    if (question) {
      return res.json({
        message: "all answer retrieved ",
        data: question,
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

module.exports.likeQuestions = async function likeQuestions(req, res) {
  // console.log(req.body.username, req.body.postId);
  const result = await questionModel.findByIdAndUpdate(
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
  // await questionModel.findByIdAndUpdate(
  //   req.body.postId,
  //   {

  //   },
  //   {
  //     new: true,
  //   }
  // );
  // console.log(result);

  return res.json({
    message: "all answer retrieved ",
    data: result,
  });
};
module.exports.dislikeQuestions = async function dislikeQuestions(req, res) {
  const result = await questionModel.findByIdAndUpdate(
    req.body.postId,

    {
      $set: { coins: req.body.coin },

      $push: { dislikes: req.body.useremail },

      $pull: { likes: req.body.useremail },
    },
    {
      new: true,
    }
  );

  // await questionModel.findByIdAndUpdate(
  //   req.body.postId,
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

module.exports.reportQuestion = async function reportQuestion(req, res) {
  console.log("iiiiiiiiiiiiiiiiiiiiiiiiiii");

  // sendMail("sendemail", details);
  const reportData = new reportModel({
    question_id: req.body.qid,
    quesTitle: req.body.quesTitle,

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

module.exports.updateQuestion = async function (req, res) {
  try {
    let id = req.params.id;
    // console.log(id);
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let question = await questionModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      question[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await question.save();
    res.json({
      message: "data updated successfully",
      data: question,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.deleteQuestion = async function deleteQuestion(req, res) {
  try {
    let id = req.params.id;
    // console.log(id);
    let deletedQuestion = await questionModel.findByIdAndDelete(id);
    return res.json({
      message: "question deleted successfully",
      data: deletedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getQuesScoreNum = async function getQuesNum(req, res) {
  try {
    const Qnum = await questionModel.find({ user: req.body.email });
    // .count();

    if (Qnum) {
      return res.json({
        message: " question retrieved ",
        data: Qnum,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: Qnum,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getHourlyData = async function getHourlyData(req, res) {
  try {
    let currentData = new Date();

    let year = currentData.getFullYear();
    let month = currentData.getMonth();
    let date1 = currentData.getDate();
    console.log(new Date(year, month, date1));

    const ghd = await questionModel.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(year, month, date1),
            $lte: new Date(year, month, date1 + 1),
          },
        },
      },
      {
        $project: {
          // hours: { $hour: "$created_at" },
          _id: 1,
          title: 1,
          coins: 1,
          dateParts: { $dateToParts: { date: "$updatedAt" } },
        },
      },
    ]);
    if (ghd) {
      return res.json({
        message: "hourly question retrieved ",
        data: ghd,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: ghd,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

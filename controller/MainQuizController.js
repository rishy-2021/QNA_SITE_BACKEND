const MainQuizModel = require("../models/MainQuizModel");

module.exports.addMainQuiz = async function addMainQuiz(req, res) {
  // const response = req.body.response;
  // console.log(req.body.response.tags);

  const quizData = await new MainQuizModel({
    // user: req.body.response.user,
    Quiz_Ques: req.body.response.Quiz_Ques,
    Quiz_Ans: req.body.response.Quiz_Ans,
    Options: req.body.response.Options,
    Exam: req.body.response.Exam,
    Year: req.body.response.Year,
    Categery: req.body.categery,
    Solution: req.body.response.Solution,
    tags: req.body.response.tags,
  });

  await quizData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Quiz not added successfully",
      });
    });
};

module.exports.getMainQuizes = async function getMainQuizes(req, res) {
  try {
    // let quizes = await MainQuizModel.find({
    //   Categery: req.body.categery,

    // });
    const q = req.body.exam;

    let quizes = await MainQuizModel.aggregate([
      { $sample: { size: 400 } },
      {
        $match: {
          Categery: "Normal",
        },
      },
      // { tags: { $all: [req.body.topics] } },
      // { Exam: { $all: [q[0] || q[1] || q[2]] } },
    ]);
    // console.log(quizes);
    if (quizes) {
      return res.json({
        message: "all quizs retrieved ",
        data: quizes,
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
module.exports.getMainCompQuizes = async function getMainCompQuizes(req, res) {
  try {
    // let quizes = await MainQuizModel.find({
    //   Categery: req.body.categery,
    // }).limit(40);
    let quizes = await MainQuizModel.aggregate([
      { $sample: { size: 41 } },
      { $match: { Categery: "Competition" } },
    ]);
    // console.log(quizes, "kkkkkkkkkkkkkkkkkkkkk");

    if (quizes) {
      return res.json({
        message: "all quizs retrieved ",
        data: quizes,
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

const express = require("express");
const mongoose = require("mongoose");
const {
  addQuestion,
  getAllQuestions,
  likeQuestions,
  dislikeQuestions,
  singleQuestion,
  deleteQuestion,
  updateQuestion,
  reportQuestion,
  getQuesNum,
  getUserQuestions,
  addScore,
  getScore,
  getQuesScoreNum,
  getHourlyData,
} = require("../controller/questionController");
const Questionrouter = express.Router();
// const mongoose = require('mongoose')

Questionrouter.route("/").post(addQuestion);
Questionrouter.route("/addScore").post(addScore);
Questionrouter.route("/getScore").get(getScore);

Questionrouter.route("/sq").post(singleQuestion);

Questionrouter.route("/allUserQuestions").post(getUserQuestions);

Questionrouter.route("/allQuestions").get(getAllQuestions);

Questionrouter.route("/like").put(likeQuestions);
Questionrouter.route("/dislike").put(dislikeQuestions);

Questionrouter.route("/getQuesNum").post(getQuesNum);

Questionrouter.route("/report").post(reportQuestion);

Questionrouter.route("/getQuesScoreNum").post(getQuesScoreNum);

Questionrouter.route("/update/:id").patch(updateQuestion);
Questionrouter.route("/delete/:id").delete(deleteQuestion);

// hourdly

Questionrouter.route("/getHourlyData").get(getHourlyData);

module.exports = Questionrouter;

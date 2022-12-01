const express = require("express");

const {
  addMainQuiz,
  getMainQuizes,
  getMainCompQuizes,
} = require("../controller/MainQuizController");

const quizRouter = express.Router();

quizRouter.route("/addMainQuiz").post(addMainQuiz);
quizRouter.route("/getMainQuizs").post(getMainQuizes);
quizRouter.route("/getMainCompQuizs").post(getMainCompQuizes);
// quizRouter.route("/deleteTempQuizs/:id").delete(deleteTempQuiz);

module.exports = quizRouter;

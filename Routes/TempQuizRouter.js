const express = require("express");

const {
  addTempQuiz,
  getTempQuizes,
  deleteTempQuiz,
} = require("../controller/TempQuizController");

const tempQuizRouter = express.Router();

tempQuizRouter.route("/addTempQuiz").post(addTempQuiz);
tempQuizRouter.route("/getTempQuizs").get(getTempQuizes);
tempQuizRouter.route("/deleteTempQuizs/:id").delete(deleteTempQuiz);

module.exports = tempQuizRouter;

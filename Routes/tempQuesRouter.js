const express = require("express");
const mongoose = require("mongoose");
const {
  addTempQuestion,
  getTempQues,
  deleteTempQues,
} = require("../controller/tempQuesController");
const tempQuestionrouter = express.Router();
// const mongoose = require('mongoose')

tempQuestionrouter.route("/").post(addTempQuestion);
tempQuestionrouter.route("/getTempQues").get(getTempQues);
tempQuestionrouter.route("/deleteTempQues/:id").delete(deleteTempQues);

module.exports = tempQuestionrouter;

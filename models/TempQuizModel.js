const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  user: Object,
  Quiz_Ques: Object,
  Quiz_Ans: Object,
  Options: Object,
  Vftn_Comp_image: String,
  Exam: [{ type: String }],
  Year: [{ type: String }],
  Solution: Object,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  tags: [{ type: String }],
});

module.exports = mongoose.model("TempQuizs", quizSchema);

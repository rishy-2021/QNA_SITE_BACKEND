const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
    type: String,
  },

  answer: String,
  user: Object,
  likes: [{ type: String }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  image: String,

  // comment_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Comments",
  // },
});

module.exports = mongoose.model("tempAnswers", answerSchema);

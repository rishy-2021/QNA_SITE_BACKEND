const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportType: String,
  question_id: String,
  answer_id: String,
  quesTitle: String,
  Ansbody: String,

  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

module.exports = mongoose.model("Reports", reportSchema);

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [{ type: String }],

  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  likes: [{ type: String }],
  image: String,
});

module.exports = mongoose.model("tempQuestions", questionSchema);

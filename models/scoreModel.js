const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

module.exports = mongoose.model("score", scoreSchema);

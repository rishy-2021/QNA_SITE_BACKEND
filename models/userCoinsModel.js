const mongoose = require("mongoose");

const userCoinsSchema = new mongoose.Schema({
  user: String,
  answerCoins: { type: Number, default: 0 },
  questionCoins: { type: Number, default: 0 },
  NormalQuizCoins: { type: Number, default: 0 },
  CompQuizCoins: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  PayQuizCoins: { type: Number, default: 0 },
  GrandTotal: { type: Number, default: 0 },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("userCoins", userCoinsSchema);

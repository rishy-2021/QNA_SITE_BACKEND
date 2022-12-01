const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema({
  user: Object,

  created_at: {
    type: Date,
    default: Date.now(),
    // default: new ISODate(),
  },
});

module.exports = mongoose.model("ShareMyself", smsSchema);

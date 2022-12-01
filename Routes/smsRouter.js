const express = require("express");
const { addSmsQ, getAllSmsQ } = require("../controller/smsController");
const smsrouter = express.Router();

smsrouter.route("/addSmsQ").post(addSmsQ);
smsrouter.route("/allsmsQ").post(getAllSmsQ);

module.exports = smsrouter;

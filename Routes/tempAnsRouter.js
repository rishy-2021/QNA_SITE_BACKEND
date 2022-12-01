const express = require("express");
const tempanswerrouter = express.Router();
const { addTempAnswer } = require("../controller/tempAnsController");

tempanswerrouter.route("/").post(addTempAnswer);

module.exports = tempanswerrouter;

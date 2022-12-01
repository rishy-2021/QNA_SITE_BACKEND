const express = require("express");

const {
  addMessages,
  getAllMessages,
  deleteMessages,
} = require("../controller/messageController");
const messagerouter = express.Router();

// messagerouter.route("/allMessages").post(getAllMessages);
messagerouter.route("/").post(addMessages);
messagerouter.route("/getMessages").get(getAllMessages);
messagerouter.route("/deleteMessages/:id").delete(deleteMessages);

module.exports = messagerouter;

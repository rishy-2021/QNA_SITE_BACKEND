const express = require("express");
const {
  createUserCoins,
  getUserCoins,
  updateCoins,
  deductUserCoins,
  uCompUserCoins,
} = require("../controller/userCoinsController");
const userCoinsrouter = express.Router();

userCoinsrouter.route("/createUserCoins").post(createUserCoins);
userCoinsrouter.route("/getUserCoins").post(getUserCoins);
userCoinsrouter.route("/addUserCoins").put(updateCoins);
userCoinsrouter.route("/uCompUserCoins").put(uCompUserCoins);

userCoinsrouter.route("/deductUserCoins").put(deductUserCoins);

module.exports = userCoinsrouter;

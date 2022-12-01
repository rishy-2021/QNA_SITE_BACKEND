const express = require("express");
const {
  addAnswer,
  getAllAnswers,
  likeAnswer,
  dislikeAnswer,
  getUserAnswers,
  deleteAnswer,
  updateAnswer,
  reportAnswer,
  getAnsNum,
} = require("../controller/answerController");
const answerrouter = express.Router();

answerrouter.route("/allUserAnswers").post(getUserAnswers);

answerrouter.route("/allAnswers").post(getAllAnswers);
answerrouter.route("/").post(addAnswer);

answerrouter.route("/like").put(likeAnswer);
answerrouter.route("/dislike").put(dislikeAnswer);
answerrouter.route("/report").post(reportAnswer);

answerrouter.route("/getAnsNum").post(getAnsNum);

answerrouter.route("/update/:id").patch(updateAnswer);
answerrouter.route("/delete/:id").delete(deleteAnswer);

module.exports = answerrouter;

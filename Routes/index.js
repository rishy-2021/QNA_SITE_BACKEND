const express = require("express");
const router = express.Router();
const questionRouter = require("./questionRouter");
const tempquestionRouter = require("./tempQuesRouter");
// const TempQuizRouter = require("./TempQuizRouter");
// const MainQuizRouter = require("./MainQuizRouter");

const answerrouter = require("./answerRouter");
const tempanswerrouter = require("./tempAnsRouter");
const smsrouter = require("./smsRouter");
const messagerouter = require("./messageRouter");
const userCoinsrouter = require("./userCoinsRouter");

router.get("/", (req, res) => {
  res.send("Welcome to stack overflow clone");
});

router.use("/tempquestion", tempquestionRouter);
router.use("/question", questionRouter);
router.use("/tempanswer", tempanswerrouter);
router.use("/answer", answerrouter);
router.use("/message", messagerouter);

// router.use("/tempQuiz", TempQuizRouter);
// router.use("/mainQuiz", MainQuizRouter);
router.use("/sms", smsrouter);
router.use("/coins", userCoinsrouter);

module.exports = router;

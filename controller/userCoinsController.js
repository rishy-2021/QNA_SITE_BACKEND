const userCoinsModel = require("../models/userCoinsModel");

module.exports.createUserCoins = async function createUserCoins(req, res) {
  const userCoins = new userCoinsModel({
    user: req.body.user,
    answerCoins: req.body.answerCoins,
    questionCoins: req.body.questionCoins,
    NormalQuizCoins: req.body.NormalQuiz,
    CompQuizCoins: req.body.CompQuiz,
  });

  await userCoins
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Question not added successfully",
      });
    });
};

module.exports.getUserCoins = async function getUserCoins(req, res) {
  try {
    let user = req.body.user;
    // console.log(user);

    const uCoins = await userCoinsModel.find({ user: user });
    // console.log("iiicii", uCoins, uCoins?.length);
    if (uCoins.length !== 0) {
      return res.json({
        message: " uCoins retrieved ",
        data: uCoins,
      });
    } else {
      return res.json({
        message: "user not found ",
        data: 404,
        // {
        //   data: null,
        // },
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateCoins = async function updateCoins(req, res) {
  // console.log(req.body.user, req.body.userCoins, req.body.score);
  await userCoinsModel.findOneAndUpdate(
    req.body.user,
    {
      $set: {
        NormalQuizCoins: req.body.userCoins + req.body.score,
        total: req.body.total + req.body.score,
      },
    }
    // {
    //   new: true,
    // }
  );
};
module.exports.uCompUserCoins = async function uCompUserCoins(req, res) {
  // console.log(req.body.user, req.body.userCoins, req.body.score);
  await userCoinsModel.findOneAndUpdate(
    req.body.user,
    {
      $set: {
        CompQuizCoins: req.body.userCoins + req.body.score,
        total: req.body.total + req.body.score,
      },
    }
    // {
    //   new: true,
    // }
  );
};

module.exports.deductUserCoins = async function deductUserCoins(req, res) {
  const deductAmmount = 200;
  console.log(req.body.pay, req.body.total, req.body.uemail);

  if (req.body.pay >= 200) {
    await userCoinsModel.findOneAndUpdate(
      {
        user: req.body.uemail,
      },
      {
        $set: {
          PayQuizCoins: req.body.pay - deductAmmount,
        },
      }
    );
  } else if (req.body.pay <= 0) {
    await userCoinsModel.findOneAndUpdate(
      {
        user: req.body.uemail,
      },
      {
        $set: {
          total: req.body.total - deductAmmount,
        },
      }
    );
  } else if (req.body.pay > 0 && req.body.pay < 200) {
    const remainAmmount = 200 - req.body.pay;

    await userCoinsModel.findOneAndUpdate(
      {
        user: req.body.uemail,
      },
      {
        $set: {
          PayQuizCoins: 0,

          total: req.body.total - remainAmmount,
        },
      }
    );
  }
};

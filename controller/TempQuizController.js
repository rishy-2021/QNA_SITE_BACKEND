const quizModel = require("../models/TempQuizModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dckyh6od6",
  api_key: "952562739436573",
  api_secret: "g1z4nDF2OYcd-QYgwgF7B06VFrA",
});

module.exports.addTempQuiz = async function addTempQuiz(req, res) {
  // for Question
  const Ques_Image = req.body.Ques_Image;
  let question = { text: req.body.question };

  if (Ques_Image) {
    const Q_result = await cloudinary.uploader.upload(Ques_Image);
    question = { image: Q_result.url };
  }

  // For Options
  const O1_Image = req.body.optionI.O1_Image;

  const O2_Image = req.body.optionI.O2_Image;

  const O3_Image = req.body.optionI.O3_Image;

  const O4_Image = req.body.optionI.O4_Image;

  let options = { text: req.body.optionT };

  if (O1_Image) {
    const O1_result = await cloudinary.uploader.upload(O1_Image);
    const O2_result = await cloudinary.uploader.upload(O2_Image);
    const O3_result = await cloudinary.uploader.upload(O3_Image);
    const O4_result = await cloudinary.uploader.upload(O4_Image);

    options = {
      image: [O1_result.url, O2_result.url, O3_result.url, O4_result.url],
    };
  }

  // for answer
  let answer = { text: req.body.answerText };
  const ans_image = req.body.answerImage;
  if (ans_image) {
    const ans_result = await cloudinary.uploader.upload(ans_image);
    answer = { image: ans_result.url };
  }

  // for comptision verfication image
  const comp_image = req.body.c_image;
  let cv_image;
  if (comp_image) {
    const comp_result = await cloudinary.uploader.upload(comp_image);
    cv_image = comp_result.url;
  }

  // for solution
  let solution = { text: req.body.solution };

  const sol_image = req.body.solnImage;
  // let solution_image;
  if (sol_image) {
    const sol_result = await cloudinary.uploader.upload(sol_image);
    solution = { text: req.body.solution, image: sol_result.url };
  }

  const quizData = await new quizModel({
    user: req.body.user,
    Quiz_Ques: question,
    Quiz_Ans: answer,
    Options: options,
    Exam: req.body.exam,
    Year: req.body.year,
    Vftn_Comp_image: cv_image,
    Solution: solution,
    tags: req.body.tags,
  });

  await quizData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Quiz not added successfully",
      });
    });
};

module.exports.getTempQuizes = async function getTempQuizes(req, res) {
  try {
    let quizes = await quizModel.find();
    // console.log("iiiii", questions);
    if (quizes) {
      return res.json({
        message: "all quizs retrieved ",
        data: quizes,
      });
    } else {
      return res.json({
        message: "quizs not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteTempQuiz = async function deleteTempQuiz(req, res) {
  try {
    let id = req.params.id;

    let deleteTempQuiz = await quizModel.findByIdAndDelete(id);
    return res.json({
      message: "quiz deleted successfully",
      data: deleteTempQuiz,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const smsModel = require("../models/smsModel");

module.exports.addSmsQ = async function addSmsQ(req, res) {
  // console.log(req.body.Id);
  const smsData = new smsModel({
    user: req.body.user,
  });

  await smsData
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

module.exports.getAllSmsQ = async function getAllSmsQ(req, res) {
  try {
    // let smsQ = await smsModel.find();
    // db.findDataByDateDemo.count({"UserLoginDate":{ "$gte": new Date("2019-05-02"), "$lt": new Date("2019-05-18") }});

    let smsQ1 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-01-01"),
        $lte: new Date("2022-02-1"),
      },
    });
    let smsQ2 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-02-01"),
        $lte: new Date("2022-03-1"),
      },
    });
    let smsQ3 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-03-01"),
        $lte: new Date("2022-04-1"),
      },
    });
    let smsQ4 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-04-01"),
        $lte: new Date("2022-05-1"),
      },
    });
    let smsQ5 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-05-01"),
        $lte: new Date("2022-06-1"),
      },
    });
    let smsQ6 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-06-01"),
        $lte: new Date("2022-07-1"),
      },
    });
    let smsQ7 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-07-01"),
        $lte: new Date("2022-08-1"),
      },
    });
    let smsQ8 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-08-01"),
        $lte: new Date("2022-09-1"),
      },
    });
    let smsQ9 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-09-01"),
        $lte: new Date("2022-10-1"),
      },
    });
    let smsQ10 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-10-01"),
        $lte: new Date("2022-11-1"),
      },
    });
    let smsQ11 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-11-01"),
        $lte: new Date("2022-12-1"),
      },
    });
    let smsQ12 = await smsModel.count({
      created_at: {
        $gte: new Date("2022-12-01"),
        $lte: new Date("2022-12-31"),
      },
    });

    // if (req.body.date) {
    //   d1 = new Date();
    //   d2 = new Date();
    //   dTotal = new Date(d1.getTime() + d2.getTime());
    // d1 = new Date(req.body.date);
    // letd2 = new Date("0000-00-5");
    // dTotal1 = new Date(d1.getTime() + d2.getTime());
    // d3 = new Date(req.body.date);
    // d4 = new Date("0000-00-5");
    // dTotal2 = new Date(d3.getTime() - d4.getTime());

    // if (req.body.date) {
    //   var mainDate = new Date(req.body.date);

    //   var datel1 = new Date(req.body.date);
    //   datel1.setDate(datel1.getDay() + 01);
    //   var datep1 = new Date(req.body.date);
    //   datep1.setDate(datep1.getDay() - 01);

    //   var datel2 = new Date(req.body.date);
    //   datel2.setDate(datel2.getDay() + 02);
    //   var datep2 = new Date(req.body.date);
    //   datep2.setDate(datep2.getDay() - 02);

    //   var datel3 = new Date(req.body.date);
    //   datel3.setDate(datel3.getDay() + 03);
    //   var datep3 = new Date(req.body.date);
    //   datep3.setDate(datep3.getDay() - 03);

    //   var datel4 = new Date(req.body.date);
    //   datel4.setDate(datel4.getDay() + 04);

    //   var datep4 = new Date(req.body.date);
    //   datep4.setDate(datep4.getDay() - 04);

    //   var isoMainDate = mainDate.toISOString();

    //   var isodatel1 = datel1.toISOString();
    //   var isodatep1 = datep1.toISOString();

    //   var isodatel2 = datel2.toISOString();
    //   var isodatep2 = datep2.toISOString();

    //   var isodatel3 = datel3.toISOString();
    //   var isodatep3 = datep3.toISOString();

    //   var isodatel4 = datel4.toISOString();
    //   var isodatep4 = datep4.toISOString();

    //   console.log(
    //     "gggggggggg",
    //     mainDate,
    //     "pp",
    //     req.body.date,
    //     new Date(req.body.date),
    //     isodatel1,
    //     isodatep1,
    //     isodatep2,
    //     isodatel2,
    //     isodatep3,
    //     isodatel3,

    //     "gggggggggg"
    //   );
    // }

    // let smsMainDate = await smsModel.count({
    //   created_at: {
    //     $gt: isodatep1,
    //     $lt: isodatel1,
    //   },
    // });
    // let smsDatep1 = await smsModel.count({
    //   created_at: {
    //     $gt: isodatep2,
    //     $lt: isoMainDate,
    //   },
    // });
    // let smsDatep2 = await smsModel.count({
    //   created_at: {
    //     $gt: isodatep3,
    //     $lt: isodatep1,
    //   },
    // });
    // let smsDatep3 = await smsModel.count({
    //   created_at: {
    //     $gt: isodatep4,
    //     $lt: isodatep2,
    //   },
    // });
    // let smsDatel1 = await smsModel.count({
    //   created_at: {
    //     $gt: isoMainDate,
    //     $lt: isodatel2,
    //   },
    // });
    // let smsDatel2 = await smsModel.count({
    //   created_at: {
    //     $gt: isodatel1,
    //     $lt: isodatel3,
    //   },
    // });
    // let smsDatel3 = await smsModel.count({
    //   created_at: {
    //     $gt: isodatel2,
    //     $lt: isodatel4,
    //   },
    // });

    if (req.body.date) {
      // console.log(req.body.date);
      return res.json({
        message: "all sdate records retrieved ",
        // data: {
        //   smsDatep3,
        //   smsDatep2,
        //   smsDatep1,
        //   smsMainDate,
        //   smsDatel1,
        //   smsDatel2,
        //   smsDatel3,
        // },
      });
    } else {
      return res.json({
        message: "all month records retrieved ",
        data: {
          smsQ1,
          smsQ2,
          smsQ3,
          smsQ4,
          smsQ5,
          smsQ6,
          smsQ7,
          smsQ8,
          smsQ9,
          smsQ10,
          smsQ11,
          smsQ12,
          // smsDate,
        },
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

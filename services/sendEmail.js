var nodemailer = require("nodemailer");
const config = require("config");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.get("useremail"),
    pass: config.get("userpassword"),
  },
});

module.exports = function ({ to, subject, body }) {
  var mailOptions = {
    from: config.get("useremail"),
    to,
    subject,
    text: body,
  };

  return new Promise((resolve, reject) => {
    // apiFunction(
    //   query,
    //   (successResponse) => {
    //     resolve(successResponse);
    //   },
    //   (errorResponse) => {
    //     reject(errorResponse);
    //   }
    // );

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
        // return Promise.reject("Some err");
        // console.log(error);
      } else {
        resolve(info.response);
        console.log("Email sent: " + info.response);
        // return Promise.resolve("ok sent");
      }
    });
  });

  console.log("subject: ", subject);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error("Something went wrong");
      // return Promise.reject("Some err");
      // console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // return Promise.resolve("ok sent");
    }
  });
};
// module.exports = function ({ to, subject, body }) {
//   var mailOptions = {
//     from: config.get("useremail"),
//     to,
//     subject,
//     text: body,
//   };

//   console.log("subject: ", subject);

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       throw new Error("Something went wrong");
//       // return Promise.reject("Some err");
//       // console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//       // return Promise.resolve("ok sent");
//     }
//   });
// };

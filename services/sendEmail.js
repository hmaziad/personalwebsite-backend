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
    from: "husseinmaziadwebsite@gmail.com",
    to,
    subject,
    text: body,
  };

  console.log("subject: ", subject);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// const promise1 = new Promise(async (resolve, reject) => {
//   setTimeout(resolve, 1000, "wahad");

//   // await axios.get("http://10.0.2.2:3900/api/signIn");
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 5000, "two");
// });

// Promise.race([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// });
// // expected output: "two"

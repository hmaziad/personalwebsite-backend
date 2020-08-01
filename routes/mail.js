const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const sendEmail = require("../services/sendEmail");

router.post("/", async (req, res) => {
  const { error } = validateEmailInput(req.body);
  if (error) {
    console.log("error", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  try {
    sendEmail({
      to: "hussein.maziad@gmail.com",
      subject: `${req.body.subject} by ${req.body.name}`,
      body: `Email: ${req.body.email} \n ${req.body.message}`,
    });
    console.log("success");
    return res.send({ status: "success" });
  } catch (err) {
    console.log("Email Route Error", err);
    return res.status(400).send({ status: "fail", error: err });
  }
});

function validateEmailInput(emailInput) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(1).max(4096).required(),
    message: Joi.string().min(1).max(16384).required(),
  });

  return schema.validate(emailInput);
}

module.exports = router;

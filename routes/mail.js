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
    const resp = await sendEmail({
      to: "hussein.maziad@gmail.com",
      subject: `${req.body.subject} by ${req.body.name}`,
      body: `Email: ${req.body.email} \n ${req.body.message}`,
    });

    res.send({ status: "success", resp });
  } catch (err) {
    console.log("Email Route Error");
    res.status(400).send({ status: "fail", err: err.response });
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

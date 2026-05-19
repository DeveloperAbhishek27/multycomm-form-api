const express = require("express");

const router = express.Router();

const { sendEmail } = require("../controller/emailController");

router.post("/send", sendEmail);

module.exports = router;

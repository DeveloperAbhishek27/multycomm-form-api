const Form = require("../models/FormModel");
const sendMail = require("../services/mailService");

const submitForm = async (req, res) => {
  try {
    const {
      name,
      company,
      gender,
      age,
      email,
      contactNumber,
      query,
      disposition,
    } = req.body;

    // 1. SAVE TO DB
    const savedData = await Form.create({
      name,
      company,
      gender,
      age,
      email,
      contactNumber,
      query,
      disposition,
    });

    // 2. EMAIL MAP
    const emailMap = {
      "Customer Support": "ayan@multycomm.com",
      "Consultant Support": "akash@multycomm.com",
      "B2B Lead": "deepak@multycomm.com",
      "New Lead": "aveek@multycomm.com",
      "General Enquiry": "support@multycomm.com",
    };

    const receiverEmail = emailMap[disposition] || process.env.EMAIL_USER;

    console.log("DISPOSITION:", disposition);
    console.log("SENDING EMAIL TO:", receiverEmail);

    // 3. SEND EMAIL
    await sendMail(name, company, gender, age, email, query, receiverEmail);

    return res.status(200).json({
      success: true,
      message: "Form Submitted & Email Sent",
      data: savedData,
    });
  } catch (error) {
    console.log("ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { submitForm };

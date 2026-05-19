const sendMail = require("../services/mailService");
const Form = require("../models/FormModel");

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

    // EMAIL MAP (PEHLE DEFINE KARO)
    const emailMap = {
      "Customer Support": "ayan@multycomm.com",
      "Consultant Support": "akash@multycomm.com",
      "B2B Lead": "deepak@multycomm.com",
      "New Lead": "aveek@multycomm.com",
      "General Enquiry": "support@multycomm.com",
    };

    const receiverEmail = emailMap[disposition] || process.env.EMAIL_USER;

    // SAVE IN DB
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

    // SEND EMAIL (AFTER receiverEmail is ready)
    await sendMail(name, company, gender, age, email, query, receiverEmail);

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully",
      data: savedData,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { submitForm };

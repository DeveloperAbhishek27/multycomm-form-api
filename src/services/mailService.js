const nodemailer = require("nodemailer");

const sendMail = async (name, company, gender, age, email, query, to) => {
  try {
    if (!to) {
      throw new Error("Receiver email is missing");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // MUST BE APP PASSWORD
      },
    });

    const info = await transporter.sendMail({
      from: `"MultyComm" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "New Client Enquiry from MultyComm Form",
      html: `
        <h2>New Enquiry Received</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
      `,
    });

    console.log("EMAIL SENT SUCCESS ✅:", info.messageId);
    return info;
  } catch (error) {
    console.log("EMAIL ERROR ❌:", error.message);
    throw error;
  }
};

module.exports = sendMail;

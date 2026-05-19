const nodemailer = require("nodemailer");

const sendMail = async (
  name,
  company,
  gender,
  age,
  email,
  contactNumber,
  query,
  receiverEmail,
  disposition,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Message from Form",
      html: `
       <h2>New Enquiry Received</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email:</strong> ${email}</p>
         <p><strong>Mobile:</strong> ${contactNumber}</p>
        <p><strong>Disposition:</strong> ${disposition}</p>
        <p><strong>Query:</strong> ${query}</p>
      `,
    });

    console.log("EMAIL SENT SUCCESS ");
  } catch (error) {
    console.log("EMAIL ERROR :", error);
    throw error;
  }
};

module.exports = sendMail;

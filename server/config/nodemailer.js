const nodemailer = require("nodemailer");
require("dotenv/config");

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = (email) => {
  let mailOptions = {
    from: "3D ISS Tracker",
    to: email,
    subject: "ISS Flyover",
    html: "The International Space Station is flying over you right now.",
  };

  return transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      return err;
    }
    return;
  });
};

module.exports = sendEmail;

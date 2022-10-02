const sendEmail = require("../config/nodemailer");
const Notification = require("../models/Notifications");

const sendNotifcation = async (position) => {
  const emails = await Notification.find({
    latitude: { $gte: position.latitude - 0.2, $lte: position.latitude + 0.2 },
    longitude: {
      $gte: position.longitude - 0.2,
      $lte: position.longitude + 0.2,
    },
  });
  for (const email of emails) {
    sendEmail(email.email);
  }
};

module.exports = { sendNotifcation };

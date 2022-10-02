const Notification = require("../models/Notifications");

const addEmail = async (req, res) => {
  const notification = new Notification({
    email: req.body.email,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  const emailExist = await Notification.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists!");

  try {
    const savedNotification = await notification.save();
    res.send(savedNotification);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { addEmail };

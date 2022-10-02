const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  email: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

module.exports = mongoose.model("Notifications", NotificationSchema);

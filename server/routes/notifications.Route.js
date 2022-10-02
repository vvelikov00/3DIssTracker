const express = require("express");
const router = express.Router({ mergeParams: true });
const notificationsControllers = require("../controllers/notifications.Controller");

router.route("/addEmail").post(notificationsControllers.addEmail);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const tracksControllers = require("../controllers/tracks.Controller");

router.route("/getLocation").get(tracksControllers.getLocation);

module.exports = router;

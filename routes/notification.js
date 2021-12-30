const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationcontroller");
const checkAuth = require("../middleware/checkauth");
const notificationValidator = require("../middleware/schemaValidators/notificationvalidator");

router.post(
  "/readNotifications/",
  checkAuth,
  notificationValidator.readNotifications,
  notificationController.readNotifications
);

router.post(
  "/getNotifications/",
  checkAuth,
  notificationValidator.getNotifications,
  notificationController.getNotifications
);

module.exports = router;

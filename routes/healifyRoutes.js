const express = require("express");
const healifyController = require("./../controllers/healifyController");
const authController = require("./../controllers/authController");
const router = express.Router();
const transactionMiddleware = require("./../transactions/transactionMiddleware");

router.use(transactionMiddleware);

router.post(
  "/saveHealify",
  authController.protect,
  healifyController.saveHealify
);

router.get(
  "/getHealifies",
  authController.protect,
  healifyController.getHealifies
);

module.exports = router;

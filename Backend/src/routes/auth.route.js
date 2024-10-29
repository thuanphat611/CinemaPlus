const express = require("express");
require("dotenv").config();

const { authController } = require("../controllers");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get("/validate", authController.validate);

module.exports = router;

const express = require("express");

const { actorController } = require("../controllers");

const router = express.Router();

router.get("/", actorController.getTrending);

module.exports = router;

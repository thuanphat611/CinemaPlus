const express = require("express");

const { seriesController } = require("../controllers");

const router = express.Router();

router.get("/popular", seriesController.getPopular);

router.get("/detail/:id", seriesController.getDetail);

module.exports = router;

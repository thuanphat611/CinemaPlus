const express = require("express");

const { seriesController } = require("../controllers");

const router = express.Router();

router.get("/popular", seriesController.getPopular);

router.get("/search", seriesController.getSearchResult);

router.get("/:id/credit", seriesController.getCredit);

router.get("/:id/videos", seriesController.getVideos);

router.get("/detail/:id", seriesController.getDetail);

router.get("/:id/seasons", seriesController.getSeasonList);

module.exports = router;

const express = require("express");

const { movieController } = require("../controllers");

const router = express.Router();

router.get("/trending", movieController.getTrending);

router.get("/popular", movieController.getPopular);

router.get("/search", movieController.getSearchResult);

router.get("/top-rated", movieController.getTopRated);

router.get("/animation", movieController.getAnimations);

router.get("/:id/credit", movieController.getCredit);

router.get("/:id/videos", movieController.getVideos);

router.get("/detail/:id", movieController.getDetail);

router.get("/trailers", movieController.getTrailers);

module.exports = router;

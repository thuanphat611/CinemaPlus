const express = require("express");

const { movieController } = require("../controllers");

const router = express.Router();

router.get("/trending", movieController.getTrending);

router.get("/popular", movieController.getPopular);

router.get("/top-rated", movieController.getTopRated);

router.get("/animation", movieController.getAnimations);

router.get("/detail/:id", movieController.getDetail);

router.get("/trailers", movieController.getTrailers);

module.exports = router;

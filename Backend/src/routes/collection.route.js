const express = require("express");

const { collectionController } = require("../controllers");

const router = express.Router();

router.get("/:id", collectionController.getDetail);

module.exports = router;

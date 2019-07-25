const express = require("express");
const SorteoController = require("../controllers/sorteo.controller");

const router = express.Router();

router.get("", SorteoController.getResultados);

module.exports = router;
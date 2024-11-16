const express = require("express");
const router = express.Router();
const Convertor = require("../controller/Convertor");

//currencires Router
router.get("/currencies", Convertor.currencies);
router.post("/convert", Convertor.currencies);

module.exports = router;

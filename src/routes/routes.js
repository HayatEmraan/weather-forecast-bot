const express = require("express");
const getWeatherData = require("../controllers/bot/getweather");
const router = express.Router();




router.get("/", getWeatherData)


module.exports = router;
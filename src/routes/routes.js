const express = require("express");
const updatebot = require("../controllers/updatebot/updatebot");
const getbotdb = require("../controllers/updatebot/getbot");
const getusers = require("../controllers/getusers/getusers");
const router = express.Router();

router.put("/update/bot", updatebot);

router.get("/get/bot", getbotdb);

router.get("/get/users", getusers);

module.exports = router;

const express = require("express");
const updatebot = require("../controllers/updatebot/updatebot");
const getbotdb = require("../controllers/updatebot/getbot");
const getusers = require("../controllers/getusers/getusers");
const insertadmin = require("../controllers/admin/insertadmin");
const router = express.Router();

router.put("/update/bot", updatebot);

router.get("/get/bot", getbotdb);

router.get("/get/users", getusers);

router.post("/post/admin", insertadmin);

module.exports = router;

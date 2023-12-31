const express = require("express");
const updatebot = require("../controllers/updatebot/updatebot");
const getbotdb = require("../controllers/updatebot/getbot");
const getusers = require("../controllers/getusers/getusers");
const insertadmin = require("../controllers/admin/insertadmin");
const jwtverify = require("../middleware/jwtverify");
const getadmin = require("../models/admin/getadmin");
const {
  blockmember,
  deletemember,
  unblockmember,
} = require("../models/kickmember/kickmember");
const router = express.Router();

router.put("/update/bot", updatebot);

router.get("/get/bot", getbotdb);

router.get("/get/users", getusers);

router.post("/post/admin", insertadmin);

router.patch("/block/user", blockmember);

router.delete("/delete/user", deletemember);

router.patch("/unblock/user", unblockmember);

router.get("/get/admin", jwtverify, getadmin);

module.exports = router;

var express = require("express");

var router = express.Router();

const adminController = require("../controller/adminController");

router.get("/admin", adminController.showLoginPage);

module.exports = router;

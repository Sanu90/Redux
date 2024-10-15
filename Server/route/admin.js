var express = require("express");
var router = express.Router();
const adminController = require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");

console.log(" Admin route.... ");

router.post("/login", adminController.adminLogin);
// router.post("/login", adminAuth.validateAdminLogin, adminController.home);

module.exports = router;

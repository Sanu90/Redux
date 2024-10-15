var express = require("express");
var router = express.Router();
const adminController = require("../controller/adminController");
// const adminAut = require("../middleware/adminAuth");
const adminAuthenticate = require("../middleware/adminAuth");

console.log(" Admin route.... ");

router.post("/login", adminController.adminLogin);
router.get(
  "/dashboard",
  adminAuthenticate.validateAdminLogin,
  adminController.home
);
//router.get("/dashboard", adminAuth.validateAdminLogin)

module.exports = router;

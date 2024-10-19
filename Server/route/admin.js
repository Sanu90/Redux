var express = require("express");
var router = express.Router();
const adminController = require("../controller/adminController");
const adminAuthenticate = require("../middleware/adminAuth");

console.log(" Admin route.... ");

router.post("/login", adminController.adminLogin);
router.get("/home", adminAuthenticate.validateAdminLogin, adminController.home);
router.delete("/deleteUser/:id", adminController.deleteUser);
// router.get("/dashboard", adminAuth.validateAdminLogin)

module.exports = router;

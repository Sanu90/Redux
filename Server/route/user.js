var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

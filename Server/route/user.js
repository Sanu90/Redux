var express = require("express");
var router = express.Router();
var upload = require("../middleware/multer");

const userController = require("../controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/home", userController.home);
router.post(
  "/upload-image",
  upload.single("image"),
  userController.imageUpload
);
router.post("/update-profile", userController.profileUpdate)

module.exports = router;

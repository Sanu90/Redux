const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const port = process.env.PORT;
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    console.log("Admin Login POST call");
    console.log(req.body);
    const adminData = await userModel.findOne({ email: req.body.email });
    if (adminData && adminData.isAdmin) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        adminData.password
      );
      console.log("passwordMatch", passwordMatch);
      if (passwordMatch) {
        if (adminData.isAdmin) {
          const adminDetails = {
            name: adminData.userName,
            email: adminData.email,
            mobile: adminData.mobile,
            Date: adminData.Date,
          };
          console.log("Data of Admin-->", adminDetails);

          const payload = adminDetails; // Data to be sent as payload
          const secretKey = process.env.JWT_ADMIN_KEY; // Admin secret access key fetched from env file
          console.log("JWT Admin Key:", secretKey);
          const options = { expiresIn: "9m", algorithm: "HS256" }; // The token will expire in 9min

          const adminToken = jwt.sign(payload, secretKey, options); // create admin JWT key
          console.log("Admin Token", adminToken);

          // response after creating admin JWT
          res.json({
            success: true,
            // message: "You are admin.",
            adminToken: adminToken,
          });
        } else {
          res.json({ success: false, message: "You are not authorized." });
        }
      } else {
        res.json({ success: false, message: "Invalid password." });
      }
    } else {
      res.json({
        success: false,
        message: "Oops..You are not authorized.",
      });
    }
  } catch (error) {
    console.log("Error in adminController--adminLogin", error);
  }
};

const home = async (req, res) => {
  try {
    console.log("----------------->Admin Home<------------->");
    const userData = await userModel.find({ isAdmin: false });
    console.log("All user data--->", userData);
    res.json({ success: true, userData: userData });
  } catch (error) {
    console.log("Error in Home function at adminController", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("DELETE USER");
    const userID = req.params;
    console.log("User ID:", userID.id);

    const dataAfterDeletion = await userModel.findByIdAndDelete({
      _id: userID.id,
    });
    console.log(dataAfterDeletion);
    res.json({ success: true, data: "admin deleted a user" });
  } catch (error) {
    console.log("Error in deleteUser in admin Controller", error);
  }
};

module.exports = { adminLogin, home, deleteUser };

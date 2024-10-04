const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("register function in userController");
    console.log(req.body);
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    console.log("User available???", user);
    if (user) return res.status(400).send("User already registered.");

    const hashPass = await bcrypt.hash(req.body.password, 10);
    console.log("hashpass", hashPass);

    const userData = new userModel({
      userName: req.body.userName,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hashPass,
      isAdmin: "false",
    });
    await userData.save();
    console.log("user data saved", userData);
    res.json({ data: "data saved successfully in mongodb" });
  } catch (error) {
    console.log("Error at user Register", error);
  }
};

const login = async (req, res) => {
  try {
    console.log("login function in userController");
    console.log(req.body);
    const userData = await userModel.findOne({ email: req.body.email });
    console.log("userData", userData);
    if (userData == null) return res.status(400).send("Not a registered user.");
    else if (userData) {
      const hashPass = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      console.log("hashPass in login", hashPass);
      if (!hashPass) {
        return res.status(400).send("Invalid Password.");
      } else {
        const userDetails = {
          name: userData.userName,
          email: userData.email,
          mobile: userData.mobile,
          date: userData.Date,
        };
        const payload = userDetails; // Data to be sent as payload
        const secretkey = process.env.JWT_SECRET_KEY; // Secret key fetched from env file
        const options = { expiresIn: "1h" }; // The token will expire in 1 hour

        const token = jwt.sign(payload, secretkey, options);
        console.log("Token is--->", token);

        res.json({ success: true, token: token, data: userDetails });
      }
    }
  } catch (error) {
    console.log("Error in userController login", error);
  }
};

module.exports = { register, login };

const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const port = process.env.PORT;

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("register function in userController");
    console.log(req.body);
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    console.log("User available???", user);
    if (user) return res.status(400).send("This email is already used.");

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
        const secretKey = process.env.JWT_ACCESS_SECRET_KEY; // Secret access key fetched from env file
        const options = { expiresIn: "59m" }; // The token will expire in 59min

        const token = jwt.sign(payload, secretKey, options);
        console.log("Token is--->", token);

        res.json({ success: true, token: token, data: userDetails });
      }
    }
  } catch (error) {
    console.log("Error in userController login", error);
  }
};

const home = async (req, res) => {
  console.log("Home function triggered in userController");
  //console.log("request is", req);
  //console.log("response is", res);
  console.log("hello");

  const authHeader = req.headers.authorization;
  //   console.log("authHeader", authHeader);
  console.log("authHeader.split(' ')[1]", authHeader.split(" ")[1]);
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, async (err, data) => {
      if (err) {
        console.log("token validation not success with error", err);
        res.json({ success: false, message: "not a valid token" });
      } else {
        console.log("data received while validating token", data);
        const userData = await userModel.findOne({ email: data.email });
        res.json({ success: true, message: "valid token", data: userData });
        console.log(userData);
      }
    });
  } else {
    res.json({ success: false, message: "NO token available. Please login" });
  }
};

const imageUpload = async (req, res) => {
  try {
    console.log("imageUpload");
    console.log(req.file);
    console.log(req.body.userID);

    if (req.file) {
      const path = req.file.path.replace(/\\/g, "/");
      const newPath = path.replace(
        "S:/Brototype/Week 20-React3/Redux/Server",
        "http://localhost:${port}"
      );
      console.log("newPath-->", newPath, port);
      const imageUpdate = await userModel.updateOne(
        { _id: req.body.userID },
        { image: newPath }
      );
      console.log("imageUpdate-->", imageUpdate);
    }
    const data = await userModel.findOne({ _id: req.body.userID });
    console.log("DATA", data);
    res.json({ message: "profile picture updated", data: data });
  } catch (error) {
    console.log("Error happened at imageUpload on userController", error);
  }
};

const profileUpdate = async (req, res) => {
  console.log("PROFILE UPDATE");
  console.log(req.body);
  const updateUser = await userModel.updateOne(
    { email: req.body.email },
    { userName: req.body.name, mobile: req.body.mobile }
  );
  console.log("Updated user data", updateUser);
  const DataAfterUpdate = await userModel.findOne({ email: req.body.email });
  console.log("DataAfterUpdate", DataAfterUpdate);
  res.json({ msg: "data updated success", data: DataAfterUpdate });
};

module.exports = { register, login, home, imageUpload, profileUpdate };

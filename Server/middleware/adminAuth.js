const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT;
const ADMIN_SECRET_KEY = process.env.JWT_ADMIN_KEY;

const validateAdminLogin = async (req, res, next) => {
  console.log("validateAdminLogin");
  console.log(req.headers, "req");

  const headers = req.headers.authorization;
  console.log("Headers", headers);

  const token = headers && headers.split(" ")[1];
  console.log("token", token);

  if (!token) {
    res.json({ success: false, message: "NO token please login" });
  } else {
    jwt.verify(token, ADMIN_SECRET_KEY, async (err, data) => {
      if (err) {
        res.json({ success: false });
      } else {
        console.log("data ------>>>", data);

        //const adminData = await userModel.findOne({ email: data.email });
        next();
        // res.json({ success: true, data: adminData })
      }
    });
  }
};

module.exports = { validateAdminLogin };

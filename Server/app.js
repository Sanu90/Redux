const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const user = require("./model/userModel");

const port = process.env.PORT || 2200;
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json());

// const adminRoute = require("./route/admin");
const userRoute = require("./route/user");

// app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});

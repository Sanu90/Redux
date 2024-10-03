const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const user = require("./model/userModel");

const port = process.env.PORT || 2200;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("hello");

  res.send("hello");
});

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});

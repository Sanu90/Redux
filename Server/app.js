const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const user = require("./model/userModel");

const port = process.env.PORT;
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:2200",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));


const adminRoute = require("./route/admin");
const userRoute = require("./route/user");

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});

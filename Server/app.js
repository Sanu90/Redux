const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 1100;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("hello");

  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});

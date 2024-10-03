const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(
      "Connection established with userModel for Redux userManagement"
    );
  })
  .catch((error) => {
    console.log("Error while connecting mongodb", error);
  });

const userData = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },

  mobile: {
    type: Number,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const user = mongoose.model("user", userData);
module.exports = user;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  pass: String,
  username: String
});

const UserModel = mongoose.model("usercollection", userSchema);

module.exports = UserModel;

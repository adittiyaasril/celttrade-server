const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  provider: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

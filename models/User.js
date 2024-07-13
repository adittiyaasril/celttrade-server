const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  purchaseHistory: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      purchaseDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

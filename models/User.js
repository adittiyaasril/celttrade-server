const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  provider: String,
  purchaseHistory: [purchaseHistorySchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

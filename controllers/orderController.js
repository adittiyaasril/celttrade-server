// controllers/orderController.js
const User = require("../models/User");

const createOrder = async (req, res) => {
  const { user, items, address, phone } = req.body;

  try {
    console.log("Finding user with email:", user.email);
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      console.log("User not found:", user.email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found, adding items to purchase history");
    dbUser.purchaseHistory.push(
      ...items.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        purchaseDate: new Date(),
      }))
    );

    await dbUser.save();
    console.log("Order saved successfully");
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = {
  createOrder,
};

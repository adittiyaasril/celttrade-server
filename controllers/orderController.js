const User = require("../models/User");

const createOrder = async (req, res) => {
  const { user, items, address, phone } = req.body;

  try {
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    dbUser.purchaseHistory.push(
      ...items.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        purchaseDate: new Date(),
      }))
    );

    await dbUser.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = {
  createOrder,
};

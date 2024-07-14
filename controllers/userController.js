// controllers/userController.js
const User = require("../models/User");

const saveOrUpdateUser = async (req, res) => {
  try {
    const profile = req.body;
    console.log("Received profile:", profile);

    if (!profile || !profile.email) {
      return res
        .status(400)
        .json({ message: "Profile data is missing or invalid" });
    }

    // Your logic to save or update the user
    const user = await User.findOneAndUpdate(
      { email: profile.email },
      { $set: profile },
      { new: true, upsert: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to save user:", error);
    res.status(500).json({ message: "Failed to save user", error });
  }
};

module.exports = { saveOrUpdateUser };

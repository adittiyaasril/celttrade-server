// controllers/userController.js
const User = require("../models/User");

const saveOrUpdateUser = async (req, res) => {
  const profile = req.body;

  try {
    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = new User({
        name: profile.name,
        email: profile.email,
        image: profile.image,
      });
    } else {
      user.name = profile.name;
      user.image = profile.image;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to save user", error });
  }
};

module.exports = {
  saveOrUpdateUser,
};

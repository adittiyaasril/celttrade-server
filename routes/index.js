const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/api", authRoutes);
router.use("/api", orderRoutes);

module.exports = router;

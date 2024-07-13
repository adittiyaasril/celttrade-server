const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post("/saveUser", OrderController.createOrder);

module.exports = router;

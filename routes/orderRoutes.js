const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.post("/order", OrderController.createOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");

router.post("/saveUser", AuthController.saveOrUpdateUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint: POST /api/authRoutes/register
router.post("/register", authController.register);

// Endpoint: POST /api/authRoutes/login
router.post("/login", authController.login);

module.exports = router;

const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use an environment variable for security, with a fallback for development
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_change_me";

// 1. REGISTER USER (Includes the 5 free tokens logic!)
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create User with 5 Tokens
    const newUser = new User({
      email,
      password_hash,
      role: "user",
      form_token: 5, // Welcome gift: 5 tokens alloweds
      tokens_used: 0, // Start at 0
    });

    const savedUser = await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Registered successfully! You have received 5 free tokens.",
      token,
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        form_token: savedUser.form_token,
        tokens_used: savedUser.tokens_used,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during registration." });
  }
};

// 2. LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Logged in successfully!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        form_token: user.form_token,
        tokens_used: user.tokens_used,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error during login." });
  }
};

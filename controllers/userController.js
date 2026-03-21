const User = require("../models/users"); // Adjust path if your model is elsewhere
const bcrypt = require("bcryptjs"); // You will need to run: npm install bcryptjs

// Create a new user (Registration)
exports.createUser = async (req, res) => {
  try {
    const { email, password, plan_id, stripe_customer_id, role, form_ids } =
      req.body;

    // 1. Basic validation - ONLY email and password are required now
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const newUser = new User({
      email,
      password_hash,
      plan_id: plan_id || null, // Now optional
      stripe_customer_id: stripe_customer_id || null, // Now optional
      form_ids: form_ids || [], // Default to an empty array
      role: role || "user", // defaults to "user" if not provided
    });

    const savedUser = await newUser.save();

    // 5. Return success (excluding the password hash from the response)
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
        plan_id: savedUser.plan_id,
        stripe_customer_id: savedUser.stripe_customer_id,
        form_ids: savedUser.form_ids,
        created_at: savedUser.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- PLACEHOLDERS FOR OTHER ROUTES TO PREVENT CRASHES ---

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password_hash");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  res.status(200).json({ message: "Get user by ID - Not yet implemented" });
};

exports.updateUser = async (req, res) => {
  res.status(200).json({ message: "Update user - Not yet implemented" });
};

exports.deleteUser = async (req, res) => {
  res.status(200).json({ message: "Delete user - Not yet implemented" });
};

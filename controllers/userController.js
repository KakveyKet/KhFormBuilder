const User = require("../models/users"); // Adjust path if your model is elsewhere
const bcrypt = require("bcryptjs"); // You will need to run: npm install bcryptjs

// Create a new user (Registration)
exports.createUser = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      plan_id,
      stripe_customer_id,
      role,
      form_ids,
    } = req.body;

    // 1. Basic validation
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
    // 🌟 STEP 1 OF THE PROCESS: GIVE THE USER 5 TOKENS UPON REGISTRATION!
    const newUser = new User({
      email,
      username: email.split("@")[0],
      password_hash,
      plan_id: plan_id || null,
      stripe_customer_id: stripe_customer_id || null,
      form_ids: form_ids || [],
      role: role || "user",
      form_token: 5, // Welcome gift: 5 tokens allowed
      tokens_used: 0, // They have used 0 so far
    });

    const savedUser = await newUser.save();

    // 5. Return success
    res.status(201).json({
      message: "User registered successfully! You have received 5 free tokens.",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
        form_token: savedUser.form_token,
        tokens_used: savedUser.tokens_used, // Return this so the frontend knows their balance!
        created_at: savedUser.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Get full data of users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
// exports.getUsers = async (req, res) => {
//   try {

//     const users = await User.find().select("-password_hash");
//     // get full data of users
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };

// 🌟 NEW: Fetch a single user by their ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      email,
      password,
      plan_id,
      stripe_customer_id,
      role,
      form_ids,
      form_token,
      username,
    } = req.body;

    console.log("👉 Data received from:", req.body);

    // Find user and update only the fields that were provided in the request
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(plan_id && { plan_id }),
          ...(form_token !== undefined && { form_token }),
          ...(email && { email }),
          ...(stripe_customer_id && { stripe_customer_id }),
          ...(role && { role }),
          ...(form_ids && { form_ids }),
          ...(username && { username }),
          ...(password && {
            password_hash: await bcrypt.hash(password, 10),
          }),
        },
      },
      { new: true }, // Return the newly updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  res.status(200).json({ message: "Delete user - Not yet implemented" });
};

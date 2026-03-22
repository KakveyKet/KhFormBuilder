const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, default: null }, // Optional field
  oauth_provider: { type: String, default: null }, // Optional field
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: false, // Not required for OAuth
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  stripe_customer_id: { type: String, required: false }, // Optional field
  form_ids: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: false }, // Optional field, user can have multiple forms
  ],
  form_token: { type: Number, default: 5 }, // Default tokens available for the user
  tokens_used: { type: Number, default: 0 }, // Tracks tokens the user has already used
  created_at: { type: Date, default: Date.now }, // Tracks when the user was created
});

const User = mongoose.model("User", userSchema);

module.exports = User;

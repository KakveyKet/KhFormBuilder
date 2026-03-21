const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, default: null },
  oauth_provider: { type: String, default: null },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: false, // Not required if using OAuth
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  stripe_customer_id: { type: String, required: false },
  // form id type array when user can have multiple forms and requires is false
  form_ids: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: false },
  ],
  tokens_used: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

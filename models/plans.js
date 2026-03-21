const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Starter", "Professional", "Enterprise"],
  },
  price_monthly: { type: mongoose.Decimal128, required: true },
  max_forms: { type: Number, required: true },
  max_responses_per_month: { type: Number, required: true },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;

const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema({
  form_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  target_url: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

const Webhook = mongoose.model("Webhook", webhookSchema);

module.exports = Webhook;

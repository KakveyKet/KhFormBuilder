const Webhook = require("../models/webhooks"); // Assuming you have a models/webhook.js file

// Create a new webhook
exports.createWebhook = async (req, res) => {
  try {
    const newWebhook = new Webhook(req.body);
    await newWebhook.save();
    res.status(201).json(newWebhook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all webhooks
exports.getWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.find();
    res.status(200).json(webhooks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single webhook by ID
exports.getWebhookById = async (req, res) => {
  try {
    const webhook = await Webhook.findById(req.params.id);
    if (!webhook) {
      return res.status(404).json({ message: "Webhook not found" });
    }
    res.status(200).json(webhook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a webhook
exports.deleteWebhook = async (req, res) => {
  try {
    const deletedWebhook = await Webhook.findByIdAndDelete(req.params.id);
    if (!deletedWebhook) {
      return res.status(404).json({ message: "Webhook not found" });
    }
    res.status(200).json({ message: "Webhook deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

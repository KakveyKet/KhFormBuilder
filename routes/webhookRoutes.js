const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

// Routes for Webhook operations
router.post("/", webhookController.createWebhook); // Create a new webhook
router.get("/", webhookController.getWebhooks); // Get all webhooks
router.get("/:id", webhookController.getWebhookById); // Get webhook by ID
router.delete("/:id", webhookController.deleteWebhook); // Delete webhook

module.exports = router;

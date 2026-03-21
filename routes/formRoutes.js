const express = require("express");
const router = express.Router();
console.log(require.resolve("../controllers/formController")); // Log the resolved path
const formController = require("../controllers/formController");
// Routes for Form operations
router.post("/", formController.createForm); // Create a new form
router.get("/", formController.getForms); // Get all forms
router.get("/:id", formController.getFormById); // Get form by ID
router.put("/:id", formController.updateForm); // Update form
router.delete("/:id", formController.deleteForm); // Delete form

module.exports = router;

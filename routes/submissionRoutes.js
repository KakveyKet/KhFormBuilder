const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

// Routes for Submission operations
router.post("/", submissionController.createSubmission); // Create a new submission
router.get("/", submissionController.getSubmissions); // Get all submissions
router.get("/:id", submissionController.getSubmissionById); // Get submission by ID
router.delete("/:id", submissionController.deleteSubmission); // Delete submission

module.exports = router;

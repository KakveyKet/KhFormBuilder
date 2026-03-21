const Submission = require("../models/submissions"); // Assuming you have a models/submission.js file

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);
    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

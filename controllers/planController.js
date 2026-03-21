const Plan = require("../models/plans"); // Assuming you have a models/plan.js file

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

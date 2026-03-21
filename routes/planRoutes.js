const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

// Define the routes for Plan operations
router.post("/", planController.createPlan);
router.get("/", planController.getPlans);
router.get("/:id", planController.getPlanById);
router.put("/:id", planController.updatePlan);
router.delete("/:id", planController.deletePlan);

module.exports = router; // Ensure this export is correct

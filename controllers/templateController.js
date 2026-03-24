const { getAvailableTemplates } = require('../utils/formTemplatePatterns');
const User = require('../models/users'); // Adjust path if your model is elsewhere

exports.getTemplates = async (req, res) => {
  try {
    // The frontend will pass the user ID in the query (e.g., /api/templates?userId=123...)
    const userId = req.query.userId;
    let userPlan = 'free'; // Default to free

    // If a userId is provided, look them up in the database to securely check their plan
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        // If they are an admin, give them unlimited access. Otherwise, check their plan.
        if (user.role === 'admin') {
          userPlan = 'admin';
        } else if (user.plan_id) {
          // You might store "pro" or "enterprise" in your plan_id. Adjust this to match your DB!
          userPlan = user.plan_id.toLowerCase();
        }
      }
    }

    // Use the helper function we created earlier to filter the templates
    const allowedTemplates = getAvailableTemplates(userPlan);
    
    // Send the filtered templates back to the frontend!
    res.status(200).json(allowedTemplates);

  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
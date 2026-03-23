const formSchemas = require("../formSchemas"); // Adjust path if formSchemas is not in the parent folder

/**
 * Matches user input text to a local form template
 * @param {string} inputText - The user's request
 * @returns {Object} - An object containing the schema fields and the title
 */
const matchTemplate = (inputText) => {
  if (!inputText) return { fields: formSchemas.general, title: "General Form" };

  const inputLower = inputText.toLowerCase();

  // 1. Wedding / អាពាហ៍ពិពាហ៍
  if (inputLower.includes("អាពាហ៍ពិពាហ៍") || inputLower.includes("wedding")) {
    return {
      fields: formSchemas["អាពាហ៍ពិពាហ៍"],
      title: "ទម្រង់អាពាហ៍ពិពាហ៍",
    };
  }

  // 2. Registration / ចុះឈ្មោះ
  if (inputLower.includes("ចុះឈ្មោះ") || inputLower.includes("register")) {
    return {
      fields: formSchemas["ចុះឈ្មោះសកម្មភាព"] || formSchemas.registration,
      title: "ទម្រង់ចុះឈ្មោះសកម្មភាព",
    };
  }

  // 3. Event RSVP / សកម្មភាពចូលរួម
  if (
    inputLower.includes("event rsvp") ||
    inputLower.includes("សកម្មភាពចូលរួម")
  ) {
    return {
      fields: formSchemas.eventRSVP,
      title: "Event RSVP Form",
    };
  }

  // 4. Product Feedback / មតិយោបល់ផលិតផល
  if (
    inputLower.includes("product feedback") ||
    inputLower.includes("មតិយោបល់ផលិតផល")
  ) {
    return {
      fields: formSchemas.productFeedback,
      title: "Product Feedback Form",
    };
  }

  // 5. Volunteer Sign-Up / ចុះឈ្មោះស្ម័គ្រចិត្ត
  if (inputLower.includes("volunteer") || inputLower.includes("ស្ម័គ្រចិត្ត")) {
    return {
      fields: formSchemas.volunteerSignup,
      title: "Volunteer Sign-Up Form",
    };
  }

  // 6. Contact / ទាក់ទង
  if (inputLower.includes("contact") || inputLower.includes("ទាក់ទង")) {
    return {
      fields: formSchemas.contact,
      title: "Contact Form",
    };
  }

  // Default Fallback
  return {
    fields: formSchemas.general,
    title: "General Form",
  };
};

module.exports = matchTemplate;

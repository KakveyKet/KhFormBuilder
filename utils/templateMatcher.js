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
  // if (
  //   inputLower.includes("ចុះឈ្មោះចូលលេងកីឡា") ||
  //   inputLower.includes("sport registration")
  // ) {
  //   return {
  //     fields: formSchemas["ចុះឈ្មោះចូលលេងកីឡា"],
  //     title: "ទម្រង់ចុះឈ្មោះចូលលេងកីឡា",
  //   };
  // }
  // 3. Contact / ទាក់ទង
  if (inputLower.includes("contact") || inputLower.includes("ទាក់ទង")) {
    return {
      fields: formSchemas.contact,
      title: "Contact Form",
    };
  }

  // 💡 EASY TO ADD MORE HERE LATER!
  // if (inputLower.includes("feedback") || inputLower.includes("មតិយោបល់")) {
  //   return { fields: formSchemas.feedback, title: "Customer Feedback" };
  // }

  // Default Fallback
  return {
    fields: formSchemas.general,
    title: "General Form",
  };
};

module.exports = matchTemplate;

const formSchemas = require("../formSchemas"); // Adjust path if needed

/**
 * ផ្គូផ្គងអត្ថបទដែលអ្នកប្រើប្រាស់បានបញ្ចូល ទៅនឹងទម្រង់ Form ដែលមានស្រាប់
 * @param {string} inputText - សំណើរបស់អ្នកប្រើប្រាស់
 * @returns {Object} - Object ដែលមានផ្ទុក fields របស់ schema និង ចំណងជើង (title)
 */
const matchTemplate = (inputText) => {
  if (!inputText) return { fields: formSchemas.general, title: "General Form" };

  const inputLower = inputText.toLowerCase();

  // 1. Wedding / អាពាហ៍ពិពាហ៍
  if (inputLower.includes("អាពាហ៍ពិពាហ៍") || inputLower.includes("wedding")) {
    return {
      fields: formSchemas["អាពាហ៍ពិពាហ៍"],
      title: "ទម្រង់ចំណងដៃអាពាហ៍ពិពាហ៍",
    };
  }

  // 2. Sport / កីឡា
  if (
    inputLower.includes("កីឡា") ||
    inputLower.includes("sport") ||
    inputLower.includes("បាល់ទាត់")
  ) {
    return {
      fields: formSchemas["ចុះឈ្មោះចូលលេងកីឡា"],
      title: "ទម្រង់ចុះឈ្មោះចូលលេងកីឡា",
    };
  }

  // 3. Complaint / ពាក្យបណ្តឹង
  if (
    inputLower.includes("បណ្តឹង") ||
    inputLower.includes("ប្ដឹង") ||
    inputLower.includes("complaint") ||
    inputLower.includes("report issue")
  ) {
    return {
      fields: formSchemas["ដាក់ពាក្យបណ្តឹង"],
      title: "ទម្រង់ដាក់ពាក្យបណ្តឹង / Complaint Form",
    };
  }

  // 4. Job Application / ដាក់ពាក្យធ្វើការ
  if (
    inputLower.includes("job") ||
    inputLower.includes("ការងារ") ||
    inputLower.includes("ធ្វើការ") ||
    inputLower.includes("hiring")
  ) {
    return {
      fields: formSchemas.jobApplication,
      title: "Job Application Form",
    };
  }

  // 5. Appointment Booking / កក់ការណាត់ជួប
  if (
    inputLower.includes("ណាត់ជួប") ||
    inputLower.includes("កក់ម៉ោង") ||
    inputLower.includes("appointment") ||
    inputLower.includes("booking")
  ) {
    return {
      fields: formSchemas["កក់ការណាត់ជួប"],
      title: "ទម្រង់កក់ការណាត់ជួប / Booking Form",
    };
  }

  // 6. Multi-Step / ជំហាន
  if (
    inputLower.includes("step") ||
    inputLower.includes("wizard") ||
    inputLower.includes("ជំហាន")
  ) {
    return {
      fields: formSchemas.multiStepRegistration,
      title: "Multi-Step Form",
    };
  }

  // 7. IT Support / ជំនួយបច្ចេកទេស
  if (
    inputLower.includes("it support") ||
    inputLower.includes("ticket") ||
    inputLower.includes("កុំព្យូទ័រ") ||
    inputLower.includes("បច្ចេកទេស")
  ) {
    return { fields: formSchemas.itSupport, title: "IT Support Ticket" };
  }

  // 8. Order Form / កុម្ម៉ង់ទំនិញ
  if (
    inputLower.includes("order") ||
    inputLower.includes("buy") ||
    inputLower.includes("កុម្ម៉ង់") ||
    inputLower.includes("ទិញ")
  ) {
    return {
      fields: formSchemas["កុម្ម៉ង់ទំនិញ"],
      title: "ទម្រង់កុម្ម៉ង់ទំនិញ / Order Form",
    };
  }

  // 9. Registration / ចុះឈ្មោះទូទៅ
  if (
    inputLower.includes("ចុះឈ្មោះ") ||
    inputLower.includes("register") ||
    inputLower.includes("sign up")
  ) {
    return {
      fields: formSchemas["ចុះឈ្មោះសកម្មភាព"],
      title: "ទម្រង់ចុះឈ្មោះសកម្មភាព",
    };
  }

  // 10. Event RSVP / សកម្មភាពចូលរួម
  if (
    inputLower.includes("event rsvp") ||
    inputLower.includes("សកម្មភាពចូលរួម") ||
    inputLower.includes("ចូលរួមកម្មវិធី")
  ) {
    return { fields: formSchemas.eventRSVP, title: "Event RSVP Form" };
  }

  // 11. Product Feedback / មតិយោបល់ផលិតផល
  if (
    inputLower.includes("product feedback") ||
    inputLower.includes("មតិយោបល់") ||
    inputLower.includes("feedback")
  ) {
    return {
      fields: formSchemas.productFeedback,
      title: "Product Feedback Form",
    };
  }

  // 12. Volunteer Sign-Up / ចុះឈ្មោះស្ម័គ្រចិត្ត
  if (inputLower.includes("volunteer") || inputLower.includes("ស្ម័គ្រចិត្ត")) {
    return {
      fields: formSchemas.volunteerSignup,
      title: "Volunteer Sign-Up Form",
    };
  }

  // 13. Contact / ទាក់ទង
  if (inputLower.includes("contact") || inputLower.includes("ទាក់ទង")) {
    return { fields: formSchemas.contact, title: "Contact Form" };
  }

  // Default Fallback
  return { fields: formSchemas.general, title: "General Form" };
};

module.exports = matchTemplate;

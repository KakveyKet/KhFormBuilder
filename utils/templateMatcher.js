const formSchemas = require("../formSchemas"); // Adjust path if formSchemas is not in the parent folder

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
  if (inputLower.includes("បណ្តឹង") || inputLower.includes("ប្ដឹង")) {
    return {
      fields: formSchemas["ដាក់ពាក្យបណ្តឹង"],
      title: "ទម្រង់ដាក់ពាក្យបណ្តឹង",
    };
  }
  if (inputLower.includes("complaint") || inputLower.includes("report issue")) {
    return {
      fields: formSchemas.complaint,
      title: "Complaint Form",
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
    inputLower.includes("ជួបពេទ្យ")
  ) {
    return {
      fields: formSchemas["កក់ការណាត់ជួប"],
      title: "ទម្រង់កក់ការណាត់ជួប",
    };
  }
  if (
    inputLower.includes("appointment") ||
    inputLower.includes("booking") ||
    inputLower.includes("schedule")
  ) {
    return {
      fields: formSchemas.appointmentBooking,
      title: "Appointment Booking Form",
    };
  }

  // 6. Registration / ចុះឈ្មោះទូទៅ
  if (
    inputLower.includes("ចុះឈ្មោះ") ||
    inputLower.includes("register") ||
    inputLower.includes("sign up")
  ) {
    return {
      fields: formSchemas["ចុះឈ្មោះសកម្មភាព"] || formSchemas.registration,
      title: "ទម្រង់ចុះឈ្មោះសកម្មភាព",
    };
  }

  // 7. Event RSVP / សកម្មភាពចូលរួម
  if (
    inputLower.includes("event rsvp") ||
    inputLower.includes("សកម្មភាពចូលរួម") ||
    inputLower.includes("ចូលរួមកម្មវិធី")
  ) {
    return {
      fields: formSchemas.eventRSVP,
      title: "Event RSVP Form",
    };
  }

  // 8. Product Feedback / មតិយោបល់ផលិតផល
  if (
    inputLower.includes("product feedback") ||
    inputLower.includes("មតិយោបល់ផលិតផល") ||
    inputLower.includes("feedback")
  ) {
    return {
      fields: formSchemas.productFeedback,
      title: "Product Feedback Form",
    };
  }

  // 9. Volunteer Sign-Up / ចុះឈ្មោះស្ម័គ្រចិត្ត
  if (inputLower.includes("volunteer") || inputLower.includes("ស្ម័គ្រចិត្ត")) {
    return {
      fields: formSchemas.volunteerSignup,
      title: "Volunteer Sign-Up Form",
    };
  }

  // 10. Contact / ទាក់ទង
  if (inputLower.includes("contact") || inputLower.includes("ទាក់ទង")) {
    return {
      fields: formSchemas.contact,
      title: "Contact Form",
    };
  }

  // Default Fallback / ជម្រើសទូទៅ
  return {
    fields: formSchemas.general,
    title: "General Form",
  };
};

module.exports = matchTemplate;

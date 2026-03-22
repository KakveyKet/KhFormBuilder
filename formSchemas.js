// This file stores all the form templates.
// You can easily add, edit, or remove templates here without touching the main server logic.
// The keys (e.g., "registration", "អាពាហ៍ពិពាហ៍") are used by the AI to categorize user requests.

const formSchemas = {
  registration: [
    { id: 1, label: "Full Name", type: "text", placeholder: "John Doe" },
    {
      id: 2,
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
    },
    { id: 3, label: "Password", type: "password", placeholder: "********" },
  ],
  contact: [
    { id: 1, label: "Name", type: "text", placeholder: "Your Name" },
    { id: 2, label: "Email", type: "email", placeholder: "Your Email" },
    // 🌟 CHANGED: Now uses a textarea for longer messages!
    {
      id: 3,
      label: "Message",
      type: "textarea",
      placeholder: "How can we help?",
    },
  ],
  // 🌟 NEW: A complex survey template demonstrating Select dropdowns and Checkboxes!
  survey: [
    {
      id: 1,
      label: "How did you hear about us?",
      type: "select",
      options: ["Facebook", "Google", "Friend", "Other"],
    },
    {
      id: 2,
      label: "Would you recommend us?",
      type: "radio",
      options: ["Yes", "No", "Maybe"],
    },
    {
      id: 3,
      label: "Subscribe to newsletter?",
      type: "checkbox",
      placeholder: "",
    },
    {
      id: 4,
      label: "Additional Feedback",
      type: "textarea",
      placeholder: "Tell us more...",
    },
  ],
  general: [
    { id: 1, label: "Title", type: "text", placeholder: "Enter title here" },
    {
      id: 2,
      label: "Description",
      type: "textarea",
      placeholder: "Enter details...",
    },
  ],
  // 🌟 KHMER TEMPLATES:
  អាពាហ៍ពិពាហ៍: [
    {
      id: 1,
      label: "ឈ្មោះភ្ញៀវ",
      type: "text",
      placeholder: "បញ្ចូលឈ្មោះរបស់អ្នក...",
    },
    { id: 2, label: "លេខទូរស័ព្ទ", type: "text", placeholder: "០១២ ៣៤៥ ៦៧៨" },
    {
      id: 3,
      label: "តើអ្នកនឹងចូលរួមទេ?",
      type: "select",
      options: ["ចូលរួម", "មិនបានចូលរួម"],
    },
    {
      id: 4,
      label: "ចំណងដៃ / សារជូនពរ",
      type: "textarea",
      placeholder: "សរសេរសាររបស់អ្នកនៅទីនេះ...",
    },
  ],
  ចុះឈ្មោះសកម្មភាព: [
    {
      id: 1,
      label: "ឈ្មោះពេញ",
      type: "text",
      placeholder: "បញ្ចូលឈ្មោះពេញ...",
    },
    {
      id: 2,
      label: "ភេទ",
      type: "select",
      options: ["ប្រុស", "ស្រី", "ផ្សេងៗ"],
    },
    { id: 3, label: "លេខទូរស័ព្ទ", type: "text", placeholder: "០១២ ៣៤៥ ៦៧៨" },
    { id: 4, label: "អ៊ីមែល", type: "email", placeholder: "example@email.com" },
  ],
  ចុះឈ្មោះចូលលេងកីឡា: [
    {
      id: 1,
      label: "ឈ្មោះពេញ",
      type: "text",
      placeholder: "បញ្ចូលឈ្មោះរបស់អ្នក",
    },
    {
      id: 2,
      label: "ភេទ",
      type: "radio",
      options: ["មនុស្សប្រុស", "មនុស្សស្រី"],
    },
    {
      id: 3,
      label: "ជ្រើសរើសក្រុម",
      type: "select",
      options: ["ក្រុម A", "ក្រុម B", "ក្រុម C"],
    },
    { id: 4, label: "លេខទូរស័ព្ទ", type: "text", placeholder: "០១២ ៣៤៥ ៦៧៨" },
  ],
};

module.exports = formSchemas;

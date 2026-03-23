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
    {
      id: 3,
      label: "Message",
      type: "textarea",
      placeholder: "How can we help?",
    },
  ],
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
  eventRSVP: [
    { id: 1, label: "Full Name", type: "text", placeholder: "John Doe" },
    {
      id: 2,
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
    },
    { id: 3, label: "Phone Number", type: "text", placeholder: "012 345 6789" },
    {
      id: 4,
      label: "Will You Attend?",
      type: "select",
      options: ["Yes", "No", "Maybe"],
    },
    {
      id: 5,
      label: "Dietary Restrictions",
      type: "textarea",
      placeholder: "Vegetarian, Gluten-Free, etc.",
    },
    {
      id: 6,
      label: "Additional Comments",
      type: "textarea",
      placeholder: "Any other details?",
    },
  ],
  productFeedback: [
    { id: 1, label: "Product Name", type: "text", placeholder: "Product ABC" },
    {
      id: 2,
      label: "Rating",
      type: "select",
      options: [
        "1 - Poor",
        "2 - Fair",
        "3 - Good",
        "4 - Very Good",
        "5 - Excellent",
      ],
    },
    {
      id: 3,
      label: "Would You Recommend This Product?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      label: "What Did You Like?",
      type: "textarea",
      placeholder: "Explain what you liked about the product.",
    },
    {
      id: 5,
      label: "What Can Be Improved?",
      type: "textarea",
      placeholder: "Explain what can be improved.",
    },
  ],
  volunteerSignup: [
    { id: 1, label: "Full Name", type: "text", placeholder: "John Doe" },
    {
      id: 2,
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
    },
    { id: 3, label: "Phone Number", type: "text", placeholder: "012 345 6789" },
    {
      id: 4,
      label: "Availability",
      type: "select",
      options: ["Morning", "Afternoon", "Evening"],
    },
    {
      id: 5,
      label: "Preferred Volunteer Role",
      type: "text",
      placeholder: "e.g., Event Coordinator",
    },
    {
      id: 6,
      label: "Why Do You Want to Volunteer?",
      type: "textarea",
      placeholder: "Share your motivation for volunteering.",
    },
    {
      id: 7,
      label: "Previous Experience",
      type: "textarea",
      placeholder: "Any relevant volunteer experience?",
    },
  ],
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

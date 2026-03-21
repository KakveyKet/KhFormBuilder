    // This file stores all the form templates. 
// You can easily add, edit, or remove templates here without touching the main server logic.
// The keys (e.g., "registration", "អាពាហ៍ពិពាហ៍") are used by the AI to categorize user requests.

const formSchemas = {
  registration: [
    { id: 1, label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: 2, label: "Email Address", type: "email", placeholder: "john@example.com" },
    { id: 3, label: "Password", type: "password", placeholder: "********" },
  ],
  contact: [
    { id: 1, label: "Name", type: "text", placeholder: "Your Name" },
    { id: 2, label: "Email", type: "email", placeholder: "Your Email" },
    { id: 3, label: "Message", type: "text", placeholder: "How can we help?" },
  ],
  feedback: [
    { id: 1, label: "Rating (1-5)", type: "number", placeholder: "5" },
    { id: 2, label: "Suggestions", type: "text", placeholder: "Tell us more..." },
  ],
  general: [
    { id: 1, label: "Title", type: "text", placeholder: "Enter title here" },
    { id: 2, label: "Description", type: "text", placeholder: "Enter details..." },
  ],
  // 🌟 KHMER TEMPLATES:
  "អាពាហ៍ពិពាហ៍": [
    { id: 1, label: "ឈ្មោះភ្ញៀវ", type: "text", placeholder: "បញ្ចូលឈ្មោះរបស់អ្នក..." },
    { id: 2, label: "លេខទូរស័ព្ទ", type: "text", placeholder: "០១២ ៣៤៥ ៦៧៨" },
    { id: 3, label: "ចំនួនអ្នកចូលរួម", type: "number", placeholder: "ឧទាហរណ៍៖ ២" },
    { id: 4, label: "ចំណងដៃ / សារជូនពរ", type: "text", placeholder: "សរសេរសាររបស់អ្នកនៅទីនេះ..." },
  ],
  "ចុះឈ្មោះសកម្មភាព": [
    { id: 1, label: "ឈ្មោះពេញ", type: "text", placeholder: "បញ្ចូលឈ្មោះពេញ..." },
    { id: 2, label: "ភេទ", type: "text", placeholder: "ប្រុស / ស្រី" },
    { id: 3, label: "លេខទូរស័ព្ទ", type: "text", placeholder: "០១២ ៣៤៥ ៦៧៨" },
    { id: 4, label: "អ៊ីមែល", type: "email", placeholder: "example@email.com" },
  ],
};

module.exports = formSchemas;
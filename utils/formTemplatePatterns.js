/**
 * 🌟 Form Template Patterns Library
 * This file stores all the visual themes available for your forms.
 * Access is restricted based on the user's subscription plan.
 */

const formTemplatePatterns = [
  // ==========================================
  // 🟢 FREE PLAN TEMPLATES (Access: All Users)
  // ==========================================
  { 
    id: "minimal-light", 
    name: "Minimal Light", 
    requiredPlan: "free", 
    colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" }, 
    font: "Inter",
    designStyle: "clean"
  },
  { 
    id: "classic-blue", 
    name: "Classic Blue", 
    requiredPlan: "free", 
    colors: { primary: "#2563EB", bg: "#F8FAFC", text: "#1E293B", border: "#CBD5E1" }, 
    font: "Roboto",
    designStyle: "standard"
  },
  { 
    id: "nature-green", 
    name: "Nature Green", 
    requiredPlan: "free", 
    colors: { primary: "#10B981", bg: "#F0FDF4", text: "#064E3B", border: "#A7F3D0" }, 
    font: "Inter",
    designStyle: "soft"
  },
  { 
    id: "warm-orange", 
    name: "Warm Orange", 
    requiredPlan: "free", 
    colors: { primary: "#F59E0B", bg: "#FFFBEB", text: "#78350F", border: "#FDE68A" }, 
    font: "Lora",
    designStyle: "warm"
  },
  { 
    id: "soft-pink", 
    name: "Soft Pink", 
    requiredPlan: "free", 
    colors: { primary: "#EC4899", bg: "#FDF2F8", text: "#831843", border: "#FBCFE8" }, 
    font: "Inter",
    designStyle: "playful"
  },

  // ==========================================
  // 🔵 PRO PLAN TEMPLATES (Access: Pro, Enterprise)
  // ==========================================
  { 
    id: "dark-knight", 
    name: "Dark Knight", 
    requiredPlan: "pro", 
    colors: { primary: "#818CF8", bg: "#0F172A", text: "#F8FAFC", border: "#334155" }, 
    font: "Inter",
    designStyle: "dark-mode"
  },
  { 
    id: "elegant-serif", 
    name: "Elegant Serif", 
    requiredPlan: "pro", 
    colors: { primary: "#0F172A", bg: "#FAFAFA", text: "#171717", border: "#E5E5E5" }, 
    font: "Lora",
    designStyle: "professional"
  },
  { 
    id: "neon-cyber", 
    name: "Neon Cyber", 
    requiredPlan: "pro", 
    colors: { primary: "#22D3EE", bg: "#171717", text: "#FFFFFF", border: "#22D3EE" }, 
    font: "Roboto",
    designStyle: "modern"
  },
  { 
    id: "corporate-slate", 
    name: "Corporate Slate", 
    requiredPlan: "pro", 
    colors: { primary: "#334155", bg: "#E2E8F0", text: "#0F172A", border: "#94A3B8" }, 
    font: "Inter",
    designStyle: "corporate"
  },
  { 
    id: "midnight-purple", 
    name: "Midnight Purple", 
    requiredPlan: "pro", 
    colors: { primary: "#C084FC", bg: "#2E1065", text: "#FAF5FF", border: "#5B21B6" }, 
    font: "Inter",
    designStyle: "vibrant"
  },

  // ==========================================
  // 🟣 ENTERPRISE PLAN (Access: Enterprise Only)
  // ==========================================
  { 
    id: "enterprise-gold", 
    name: "Enterprise Gold", 
    requiredPlan: "enterprise", 
    colors: { primary: "#EAB308", bg: "#000000", text: "#FFFFFF", border: "#CA8A04" }, 
    font: "Inter",
    designStyle: "premium"
  },
  { 
    id: "custom-brand-kit", 
    name: "Custom Brand Kit", 
    requiredPlan: "enterprise", 
    colors: { primary: "custom", bg: "custom", text: "custom", border: "custom" }, 
    font: "custom",
    designStyle: "unlimited"
  }
];

/**
 * Helper function to return only the templates a user is allowed to see
 * based on their current plan ID.
 * * @param {string} userPlan - The user's plan name (e.g., 'free', 'pro', 'enterprise', 'admin')
 * @returns {Array} - Filtered list of allowed template objects
 */
const getAvailableTemplates = (userPlan) => {
  // Normalize the input
  const plan = (userPlan || 'free').toLowerCase();

  // Admins and Enterprise users get access to absolutely everything
  if (plan === "enterprise" || plan === "admin") {
    return formTemplatePatterns;
  } 
  
  // Pro users get 'free' and 'pro' templates
  else if (plan === "pro" || plan === "professional") {
    return formTemplatePatterns.filter(
      (t) => t.requiredPlan === "free" || t.requiredPlan === "pro"
    );
  } 
  
  // Free users ONLY get 'free' templates
  else {
    return formTemplatePatterns.filter(
      (t) => t.requiredPlan === "free"
    );
  }
};

module.exports = {
  formTemplatePatterns,
  getAvailableTemplates
};
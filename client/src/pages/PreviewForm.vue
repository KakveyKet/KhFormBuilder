<template>
  <div class="min-h-screen bg-[#F8FAFF] py-12 px-4 sm:px-6 font-inter flex justify-center items-start">
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center pt-20">
      <svg class="animate-spin h-10 w-10 text-theme-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-theme-muted font-medium">Loading form...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="max-w-xl w-full bg-white p-10 rounded-2xl shadow-sm border border-red-100 text-center mt-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-theme-error mx-auto mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Form Unavailable</h2>
      <p class="text-theme-muted">{{ errorMessage }}</p>
    </div>

    <!-- Success / Thank You State -->
    <div v-else-if="isSubmitted" class="max-w-xl w-full bg-white p-12 rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 text-center mt-10 animate-fade-up">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-theme-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-3">Thank you!</h2>
      <p class="text-theme-muted mb-8">Your response has been successfully recorded.</p>
      <button @click="resetForm" class="px-6 py-2.5 bg-gray-50 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
        Submit another response
      </button>
    </div>

    <!-- Form Rendering State -->
    <div v-else class="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 mt-6 animate-fade-up">
      
      <!-- Form Header -->
      <div class="mb-8 border-b border-gray-100 pb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-theme-text mb-3 leading-tight">{{ formData.title }}</h1>
        <p class="text-theme-muted text-[15px] leading-relaxed">{{ formData.description }}</p>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div v-for="field in formData.schema" :key="field.id" class="flex flex-col">
          <label class="mb-2 text-[14px] font-bold text-gray-700">{{ field.label }}</label>

          <!-- Standard Inputs -->
          <input 
            v-if="['text', 'email', 'number', 'password', 'date'].includes(field.type)"
            :type="field.type" 
            :placeholder="field.placeholder" 
            v-model="answers[field.id]"
            required
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary focus:bg-white transition-all text-[15px] text-gray-800 w-full"
          />

          <!-- Textarea -->
          <textarea 
            v-else-if="field.type === 'textarea'"
            :placeholder="field.placeholder" 
            v-model="answers[field.id]"
            required
            rows="4" 
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary focus:bg-white transition-all text-[15px] text-gray-800 w-full resize-y"
          ></textarea>

          <!-- Select Dropdown -->
          <select 
            v-else-if="field.type === 'select'"
            v-model="answers[field.id]"
            required
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary focus:bg-white transition-all text-[15px] text-gray-800 w-full appearance-none cursor-pointer"
          >
            <option disabled value="">Select an option...</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>

          <!-- Radio Buttons -->
          <div v-else-if="field.type === 'radio'" class="space-y-3 mt-1">
            <label v-for="opt in field.options" :key="opt" class="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" :class="{ 'border-theme-primary bg-theme-primary/5': answers[field.id] === opt }">
              <input type="radio" :name="'radio-' + field.id" :value="opt" v-model="answers[field.id]" required class="w-4 h-4 text-theme-primary focus:ring-theme-primary border-gray-300" />
              <span class="text-[15px] text-gray-700 font-medium">{{ opt }}</span>
            </label>
          </div>

          <!-- Checkbox -->
          <label v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 cursor-pointer mt-1 group">
            <div class="relative flex items-center justify-center">
              <input type="checkbox" v-model="answers[field.id]" class="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-theme-primary/20 checked:bg-theme-primary checked:border-theme-primary transition-all cursor-pointer" />
              <svg class="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
            </div>
            <span class="text-[15px] text-gray-700 font-medium select-none group-hover:text-gray-900 transition-colors">{{ field.placeholder || 'Yes, I agree' }}</span>
          </label>
          
        </div>

        <button type="submit" :disabled="isSubmitting" class="w-full mt-8 px-6 py-4 bg-theme-primary text-white font-bold text-[16px] rounded-xl hover:bg-theme-primary/90 transition-all shadow-md shadow-theme-primary/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2">
          <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ isSubmitting ? 'Submitting...' : 'Submit Response' }}
        </button>
      </form>
      
      <!-- Footer Branding -->
      <div class="mt-10 pt-6 border-t border-gray-100 text-center">
        <a href="/" class="text-[12px] font-bold text-gray-400 hover:text-theme-primary transition-colors flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="currentColor" /><circle cx="16" cy="16" r="6" fill="white" /></svg>
          Powered by លំហ.AI Form
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State
const formId = ref("");
const formData = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");
const isSubmitting = ref(false);
const isSubmitted = ref(false);

// Stores user's answers. Key = field.id, Value = user input
const answers = ref({});

onMounted(() => {
  // Grab ID from URL path (e.g. /f/1234 or /preview/1234)
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const targetId = pathParts[pathParts.length - 1]; // Assume last segment is ID
  
  if (targetId && targetId !== 'f' && targetId !== 'preview') {
    formId.value = targetId;
    fetchForm();
  } else {
    isLoading.value = false;
    errorMessage.value = "Invalid Form URL.";
  }
});

const fetchForm = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/forms/${formId.value}`);
    formData.value = response.data;
    
    // Initialize answers object
    formData.value.schema.forEach(field => {
      answers.value[field.id] = field.type === 'checkbox' ? false : "";
    });
  } catch (error) {
    errorMessage.value = "This form is no longer available or does not exist.";
  } finally {
    isLoading.value = false;
  }
};

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // Note: You will eventually need a backend route (POST /api/submissions) to save this data!
    // For now, we simulate a successful API call.
    console.log("Submitting payload:", {
      form_id: formData.value._id,
      answers: answers.value
    });
    
    // Fake network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    isSubmitted.value = true;
  } catch (error) {
    alert("Failed to submit form. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  // Clear answers
  Object.keys(answers.value).forEach(key => {
    answers.value[key] = typeof answers.value[key] === 'boolean' ? false : "";
  });
  isSubmitted.value = false;
};
</script>
<template>
  <div class="min-h-screen bg-[#F8FAFF] py-12 px-4 sm:px-6   flex justify-center items-start">

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center pt-20">
      <svg class="animate-spin h-10 w-10 text-theme-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <p class="text-theme-muted font-medium">Loading form...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage"
      class="max-w-xl w-full bg-white p-10 rounded-2xl shadow-sm border border-red-100 text-center mt-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-theme-error mx-auto mb-4 opacity-80" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Form Unavailable</h2>
      <p class="text-theme-muted">{{ errorMessage }}</p>
    </div>

    <!-- Success / Thank You State -->
    <div v-else-if="isSubmitted"
      class="max-w-xl w-full bg-white p-12 rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 text-center mt-10 animate-fade-up">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-theme-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-3">Thank you!</h2>
      <p class="text-theme-muted mb-8">Your response has been successfully recorded.</p>
      <button @click="resetForm"
        class="px-6 py-2.5 bg-gray-50 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
        Submit another response
      </button>
    </div>

    <!-- Form Rendering State -->
    <div v-else
      class="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 mt-6 animate-fade-up">

      <!-- Form Header -->
      <div class="mb-8 border-b border-gray-100 pb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-theme-text mb-3 leading-tight">{{ formData.title }}</h1>
        <p class="text-theme-muted text-[15px] leading-relaxed">{{ formData.description }}</p>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div v-for="field in formData.schema" :key="field.id" class="flex flex-col">
          <label class="mb-2 text-[14px] font-bold text-gray-700">{{ field.label }}</label>

          <!-- 1. Standard Inputs (text, email, number, password, date, time, url, tel) -->
          <input
            v-if="['text', 'email', 'number', 'password', 'date', 'time', 'datetime-local', 'url', 'tel'].includes(field.type)"
            :type="field.type" :placeholder="field.placeholder" v-model="answers[field.id]" required
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5855F6]/20 focus:border-[#5855F6] focus:bg-white transition-all text-[15px] text-gray-800 w-full" />

          <!-- 2. Textarea -->
          <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" v-model="answers[field.id]"
            required rows="4"
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5855F6]/20 focus:border-[#5855F6] focus:bg-white transition-all text-[15px] text-gray-800 w-full resize-y"></textarea>

          <!-- 3. Select Dropdown -->
          <select v-else-if="field.type === 'select'" v-model="answers[field.id]" required
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5855F6]/20 focus:border-[#5855F6] focus:bg-white transition-all text-[15px] text-gray-800 w-full cursor-pointer">
            <option disabled value="">Select an option...</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>

          <!-- 4. Radio Buttons -->
          <div v-else-if="field.type === 'radio'" class="space-y-3 mt-1">
            <label v-for="opt in field.options" :key="opt"
              class="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              :class="{ 'border-[#5855F6] bg-[#5855F6]/5': answers[field.id] === opt }">
              <input type="radio" :name="'radio-' + field.id" :value="opt" v-model="answers[field.id]" required
                class="w-4 h-4 text-[#5855F6] focus:ring-[#5855F6] border-gray-300" />
              <span class="text-[15px] text-gray-700 font-medium">{{ opt }}</span>
            </label>
          </div>

          <!-- 5. Checkbox -->
          <label v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 cursor-pointer mt-1 group w-fit">
            <div class="relative flex items-center justify-center">
              <input type="checkbox" v-model="answers[field.id]"
                class="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#5855F6]/20 checked:bg-[#5855F6] checked:border-[#5855F6] transition-all cursor-pointer" />
              <svg
                class="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <span
              class="text-[15px] text-gray-700 font-medium select-none group-hover:text-gray-900 transition-colors">{{
                field.placeholder || 'Yes, I agree' }}</span>
          </label>

          <!-- 🌟 6. Color Picker -->
          <div v-else-if="field.type === 'color'" class="flex items-center gap-4 mt-1">
            <input type="color" v-model="answers[field.id]" required
              class="h-12 w-20 p-1 cursor-pointer bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5855F6]/20 transition-all" />
            <span
              class="text-sm font-mono text-gray-500 uppercase bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">{{
                answers[field.id] || '#000000' }}</span>
          </div>

          <!-- 🌟 7. Range Slider -->
          <div v-else-if="field.type === 'range'"
            class="flex items-center gap-4 mt-2 bg-gray-50/50 border border-gray-200 p-4 rounded-xl">
            <input type="range" v-model="answers[field.id]" required
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5855F6]" />
            <span class="text-sm font-bold text-white bg-[#5855F6] px-3 py-1 rounded-md w-12 text-center">{{
              answers[field.id] || 50 }}</span>
          </div>

          <!-- 🌟 8. File Upload -->
          <div v-else-if="field.type === 'file'" class="mt-1">
            <input type="file" @change="(e) => handleFileUpload(e, field.id)" required
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] text-gray-500 
                     file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold 
                     file:bg-[#5855F6]/10 file:text-[#5855F6] hover:file:bg-[#5855F6]/20 transition-all cursor-pointer" />
          </div>

          <!-- Fallback -->
          <input v-else type="text" :placeholder="field.placeholder" v-model="answers[field.id]" required
            class="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5855F6]/20 focus:border-[#5855F6] transition-all text-[15px] text-gray-800 w-full" />

        </div>

        <button type="submit" :disabled="isSubmitting"
          class="w-full mt-8 px-6 py-4 bg-[#5855F6] text-white font-bold text-[16px] rounded-xl hover:bg-[#4338CA] transition-all shadow-md shadow-[#5855F6]/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2">
          <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isSubmitting ? 'Submitting...' : 'Submit Response' }}
        </button>
      </form>

      <!-- Footer Branding -->
      <div class="mt-10 pt-6 border-t border-gray-100 text-center">
        <a href="/"
          class="text-[12px] font-bold text-gray-400 hover:text-[#5855F6] transition-colors flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <circle cx="16" cy="16" r="6" fill="white" />
          </svg>
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

    // Initialize answers object based on type
    formData.value.schema.forEach(field => {
      if (field.type === 'checkbox') {
        answers.value[field.id] = false;
      } else if (field.type === 'color') {
        answers.value[field.id] = "#000000"; // Default color
      } else if (field.type === 'range') {
        answers.value[field.id] = 50; // Default range value
      } else {
        answers.value[field.id] = "";
      }
    });
  } catch (error) {
    errorMessage.value = "This form is no longer available or does not exist.";
  } finally {
    isLoading.value = false;
  }
};

// Handle file uploads specifically since v-model doesn't work on input type="file"
const handleFileUpload = (event, fieldId) => {
  const file = event.target.files[0];
  if (file) {
    // In a real app, you might upload this file to S3/AWS immediately 
    // or append it to a FormData object during submission
    answers.value[fieldId] = file.name;
  }
};

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    // Note: You will eventually need a backend route (POST /api/submissions) to save this data!
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
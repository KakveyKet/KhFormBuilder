<template>
  <div class="gen-layout">
    <div class="gen-container">

      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0">
        <div v-if="!currentUser" class="gen-login-warning">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" class="text-orange-500">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p class="text-sm font-medium text-orange-800">You must be logged in to generate forms and use your tokens.
            </p>
          </div>
          <a href="/login" class="gen-login-btn">Log in</a>
        </div>
      </transition>

      <div class="gen-header">
        <h1 class="gen-title">What do you want to build today?</h1>
        <p class="gen-subtitle">Describe your ideal data collection form in plain English or Khmer, and our AI will
          generate a production-ready interface in seconds.</p>
      </div>

      <div class="gen-prompt-wrapper" :class="{ 'opacity-50 pointer-events-none': !currentUser || isLoading }">
        <div class="flex items-center px-4 py-2 border-b border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" class="text-[#5855F6]">
            <path
              d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">AI Assistant</span>
        </div>
        <div class="relative flex items-end p-2">
          <textarea v-model="inputText" :disabled="!currentUser || isLoading"
            placeholder="e.g., សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ" class="gen-input" rows="3"
            @keyup.enter.prevent="predictMask"></textarea>
          <button @click="predictMask" :disabled="isLoading || !currentUser || !inputText.trim()"
            class="gen-submit-btn group">
            <span v-if="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Thinking
            </span>
            <span v-else class="flex items-center gap-2">
              Generate
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5"
                class="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div v-if="!prediction && !isLoading" class="gen-suggestions animate-fade-up">
        <p class="text-xs font-bold text-gray-400 uppercase mb-3 text-center">Try these examples</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button @click="fillSuggestion('A simple contact form with name, email, and a message box.')"
            class="gen-suggestion-pill">Contact Form</button>
          <button @click="fillSuggestion('Job application form asking for resume, experience, and role.')"
            class="gen-suggestion-pill">Job Application</button>
          <button @click="fillSuggestion('សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ')" class="gen-suggestion-pill">Wedding
            RSVP (Khmer)</button>
        </div>
      </div>

      <div v-if="errorMessage" class="gen-error-banner animate-fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <div v-if="isLoading" class="gen-loading-state animate-fade">
        <div class="gen-skeleton-header"></div>
        <div class="space-y-4">
          <div class="gen-skeleton-input"></div>
          <div class="gen-skeleton-input w-3/4"></div>
          <div class="gen-skeleton-input h-20"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 animate-pulse"></div>
      </div>

      <div v-if="generatedFields?.length > 0 && !isLoading" class="gen-results-area animate-fade-up">

        <div v-if="formId && publicHash" class="gen-success-card">
          <div class="flex items-start sm:items-center gap-4">
            
            <!-- Visual Indicator for Status (Draft/Published) -->
            <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
              :class="isPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 border-2 border-dashed border-gray-300 text-gray-400'">
              
              <!-- Published Icon -->
              <svg v-if="isPublished" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              
              <!-- Draft Icon -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>

            <div>
              <h3 class="text-lg font-bold" :class="isPublished ? 'text-gray-900' : 'text-gray-600'">
                {{ isPublished ? 'Form Published Successfully!' : 'Form Saved as Draft' }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ isPublished ? 'Your form is now live and ready to collect responses.' : 'Your form is generated. Click publish to make it live.' }}
              </p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-0">
            <router-link :to="'/edit/' + formId" class="btn-primary-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              Open in AI Studio
            </router-link>

            <!-- Publish Action Button -->
            <button 
              v-if="!isPublished"
              @click="publishForm"
              :disabled="isToggling"
              class="btn-secondary-action bg-white border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
            >
              <svg v-if="isToggling" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              {{ isToggling ? 'Publishing...' : 'Publish Form' }}
            </button>
            
            <!-- Disabled State when Published -->
            <button v-else disabled class="btn-secondary-action bg-emerald-50 border-emerald-100 text-emerald-600 opacity-80 cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Published
            </button>
          </div>
        </div>

        <div class="gen-preview-card">
          <div class="gen-preview-header">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Preview</h3>
            <span class="text-xs font-bold text-[#5855F6] bg-indigo-50 px-2 py-1 rounded">Read-Only</span>
          </div>

          <form @submit.prevent class="space-y-5 p-6 pointer-events-none opacity-80">
            <div class="mb-6 pb-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900">{{ prediction || 'Generated Form' }}</h2>
            </div>

            <div v-for="field in generatedFields" :key="field.id" class="gen-form-group">
              <label class="gen-form-label">{{ field.label }}</label>

              <input v-if="['text', 'email', 'number', 'password', 'date'].includes(field.type)" :type="field.type"
                :placeholder="field.placeholder" class="gen-form-input" />

              <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" rows="3"
                class="gen-form-input resize-none"></textarea>

              <select v-else-if="field.type === 'select'" class="gen-form-input bg-white appearance-none">
                <option disabled selected value="">Select an option...</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>

              <div v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 mt-2">
                <input type="checkbox" class="w-5 h-5 text-[#5855F6] rounded border-gray-300" />
                <span class="text-sm text-gray-700 font-medium">{{ field.placeholder || 'Yes, I agree' }}</span>
              </div>

              <div v-else-if="field.type === 'radio'" class="flex flex-col gap-3 mt-2">
                <label v-for="option in field.options" :key="option" class="flex items-center gap-3">
                  <input type="radio" :name="'radio-' + field.id" :value="option"
                    class="w-5 h-5 text-[#5855F6] border-gray-300" />
                  <span class="text-sm text-gray-700 font-medium">{{ option }}</span>
                </label>
              </div>

              <input v-else type="text" :placeholder="field.placeholder" class="gen-form-input" />
            </div>

            <button type="submit" class="w-full mt-6 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-md">
              Submit Form
            </button>
          </form>
        </div>
      </div>

      <div v-else-if="prediction && generatedFields?.length === 0" class="gen-error-banner animate-fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>The AI failed to generate fields from that description. Please try rephrasing!</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// State
const inputText = ref("");
const prediction = ref(null);
const generatedFields = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);

// Variables to store the database response & User
const formId = ref(null);
const publicHash = ref(null);
const currentUser = ref(null);

// 🌟 NEW: Publish State (Default to false so they must click to publish)
const isPublished = ref(false); 
const isToggling = ref(false);

// Fetch logged-in user on mount
onMounted(() => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) {
    currentUser.value = JSON.parse(storedUserStr);
  }
});

const fillSuggestion = (text) => {
  inputText.value = text;
};

// 🌟 NEW: Publish Method
const publishForm = async () => {
  if (!formId.value) return;
  
  isToggling.value = true;
  
  try {
    // Updates backend endpoint to the correct /api/forms/ to prevent 404
    await axios.put(`http://localhost:3000/api/forms/${formId.value}`, {
      is_published: true
    });
    
    // Update local state if successful
    isPublished.value = true;
    
  } catch (error) {
    console.error("Failed to publish form", error);
  } finally {
    isToggling.value = false;
  }
};

// Methods
const predictMask = async () => {
  if (!currentUser.value) {
    errorMessage.value = "Please log in to generate forms.";
    return;
  }

  if (inputText.value.trim() !== "") {
    isLoading.value = true;
    prediction.value = null;
    generatedFields.value = [];
    errorMessage.value = null;

    // Reset database variables on new request
    formId.value = null;
    publicHash.value = null;
    isPublished.value = false; // 🌟 Reset to draft state on new generation

    try {
      const response = await axios.post("http://localhost:3000/predict", {
        inputText: inputText.value,
        creator_id: currentUser.value._id
      });

      prediction.value = response.data.prediction;
      generatedFields.value = response.data.fields || [];

      // Capture the newly generated MongoDB ID and Public Hash
      formId.value = response.data.form_id;
      publicHash.value = response.data.public_hash;
      
      // Update tokens locally so the UI stays in sync without a refresh
      if (currentUser.value && response.data.form_id) {
        currentUser.value.tokens_used += 1;
        localStorage.setItem("user", JSON.stringify(currentUser.value));
      }

    } catch (error) {
      console.error("Error making the API request", error);

      if (error.response?.status === 403) {
        errorMessage.value = error.response.data.error || "Token limit reached. Please upgrade your plan!";
      } else {
        errorMessage.value =
          error.response?.data?.error ||
          "Internal Server Error (500). The Node.js backend failed to connect to Hugging Face or save to the database.";
      }
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = "Please describe the form you want to build.";
  }
};
</script>

<style lang="scss" scoped>
/* Scoped styles kept minimal; bulk logic is in styles.css */
</style>
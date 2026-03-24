<template>
  <div class="gen-layout">
    <div class="gen-container">

      <!-- Login Warning -->
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
            <p class="text-sm font-bold text-orange-800">Authentication Required</p>
            <p class="text-sm font-medium text-orange-700 hidden sm:block">- Log in to generate and save your forms.</p>
          </div>
          <a href="/login" class="gen-login-btn">Log in</a>
        </div>
      </transition>

      <!-- Header & Logo -->
      <div class="gen-header flex flex-col items-center text-center">
        <!-- 🌟 UPDATED: Added your Logo here! -->
        <div class="flex items-center gap-2 mb-6 animate-fade-down">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shadow-sm rounded-xl">
            <rect width="32" height="32" rx="8" fill="#5855F6"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
          <span class="font-bold text-2xl text-gray-900 tracking-tight">លំហ.AI <span class="text-[#5855F6]">Form</span></span>
        </div>
        
        <h1 class="gen-title">What do you want to build today?</h1>
        <p class="gen-subtitle">Describe your ideal data collection form in plain English or Khmer, and our AI will
          generate a production-ready interface instantly.</p>
      </div>

      <!-- The Magic Prompt Box -->
      <div class="gen-prompt-card" :class="{ 'opacity-50 pointer-events-none': !currentUser || isLoading }">
        <!-- Input Area -->
        <div class="relative">
          <textarea v-model="inputText" :disabled="!currentUser || isLoading"
            :placeholder="isRecording ? 'Listening... Speak now...' : 'e.g., សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ (Create a wedding RSVP form)'"
            class="gen-prompt-textarea" :class="isRecording ? 'text-gray-900 placeholder-red-400' : ''"
            @keyup.enter.prevent="predictMask"></textarea>
        </div>

        <!-- Footer / Actions -->
        <div class="gen-prompt-footer">
          <!-- Left: Voice / Status -->
          <div class="flex items-center gap-3">
            <button v-if="hasSpeechRecognition" @click="toggleRecording" :disabled="!currentUser || isLoading"
              :title="isRecording ? 'Stop recording' : 'Start voice typing'" class="gen-voice-btn"
              :class="isRecording ? 'active bg-red-50 text-red-500 border-red-200 animate-pulse' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
            <span v-if="isRecording"
              class="text-xs font-bold text-red-500 animate-pulse flex items-center gap-1.5 uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-red-500"></span> Recording...
            </span>
          </div>

          <!-- Right: Submit -->
          <button @click="predictMask" :disabled="isLoading || !currentUser || !inputText.trim()"
            class="gen-submit-btn group">
            <span v-if="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Generating
            </span>
            <span v-else class="flex items-center gap-2">
              Generate Form
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

      <!-- Suggestions -->
      <div v-if="!prediction && !isLoading" class="gen-suggestions animate-fade-up">
        <p class="text-xs font-bold text-gray-400 uppercase mb-3 text-center tracking-widest">Try these examples</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button @click="fillSuggestion('A simple contact form with name, email, and a message box.')"
            class="gen-suggestion-pill">Contact Form</button>
          <button @click="fillSuggestion('Job application form asking for resume, experience, and role.')"
            class="gen-suggestion-pill">Job Application</button>
          <button @click="fillSuggestion('សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ')" class="gen-suggestion-pill">Wedding
            RSVP (Khmer)</button>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="errorMessage" class="gen-error-banner animate-fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" class="flex-shrink-0">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Loading Skeleton (Shows while predicting) -->
      <div v-if="isLoading" class="gen-loading-state animate-fade">
        <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div class="h-6 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-8 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div class="space-y-5">
          <div class="gen-skeleton-input"></div>
          <div class="gen-skeleton-input w-3/4"></div>
          <div class="gen-skeleton-input h-24"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 animate-pulse"></div>
      </div>

      <!-- RESULTS AREA -->
      <div v-if="generatedFields?.length > 0 && !isLoading" class="gen-results-area animate-fade-up">

        <!-- Status & Actions Panel -->
        <div v-if="formId && publicHash" class="gen-action-panel">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5">

            <!-- Left: Status Indicator -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                :class="isPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'">
                <!-- Published Icon -->
                <svg v-if="isPublished" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <!-- Draft Icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 leading-tight">
                  {{ isPublished ? 'Form Published Successfully' : 'Form Saved as Draft' }}
                </h3>
                <p class="text-sm text-gray-500 mt-0.5">
                  {{ isPublished ? 'Your form is now live and ready to collect responses.' : 'Your form is generated. Review it and click publish.' }}
                </p>
              </div>
            </div>

            <!-- Right: Action Buttons -->
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <router-link :to="'/edit/' + formId" class="btn-studio-shortcut flex-1 sm:flex-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                AI Studio
              </router-link>

              <button v-if="!isPublished" @click="publishForm" :disabled="isToggling"
                class="btn-publish-shortcut flex-1 sm:flex-none">
                <svg v-if="isToggling" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {{ isToggling ? 'Publishing...' : 'Publish' }}
              </button>

              <button v-else disabled class="btn-published-state flex-1 sm:flex-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Live
              </button>
            </div>
          </div>
        </div>

        <!-- 🌟 Mock Browser Window for Preview -->
        <div class="gen-browser-window">
          <div class="gen-browser-header">
            <div class="flex items-center gap-1.5">
              <div class="gen-browser-dot bg-red-400"></div>
              <div class="gen-browser-dot bg-amber-400"></div>
              <div class="gen-browser-dot bg-emerald-400"></div>
            </div>
            
            <div class="flex-1 text-center flex justify-center">
              <span class="text-xs font-mono text-gray-400 bg-white px-3 py-1 rounded-md border border-gray-200 truncate max-w-[200px] sm:max-w-xs">
                preview.local/{{ formId || 'new-form' }}
              </span>
            </div>
            <div class="w-10"></div> <!-- Spacer for centering -->
          </div>

          <form @submit.prevent class="p-6 sm:p-10 pointer-events-none bg-white relative">
            
            <!-- 🌟 UPDATED: Added your Logo to the Preview Header -->
            <div class="mb-8 pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ prediction || 'Generated Form' }}</h2>
                <p class="text-sm text-gray-500">Please fill out the form below.</p>
              </div>
              
              <!-- Logo injected here -->
              <div class="flex items-center justify-center sm:justify-end gap-2 opacity-70">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="#5855F6"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
                <span class="text-xs font-bold text-gray-500">លំហ.AI Form</span>
              </div>
            </div>

            <div class="space-y-5">
              <div v-for="field in generatedFields" :key="field.id" class="flex flex-col gap-1.5">
                <label class="text-sm font-bold text-gray-700">{{ field.label }}</label>

                <!-- Standard Inputs -->
                <input v-if="['text', 'email', 'number', 'password', 'date'].includes(field.type)" :type="field.type"
                  :placeholder="field.placeholder" class="gen-form-input" />
                <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" rows="3"
                  class="gen-form-input resize-none"></textarea>
                <select v-else-if="field.type === 'select'" class="gen-form-input bg-white appearance-none">
                  <option disabled selected value="">Select an option...</option>
                  <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                </select>

                <!-- Checkbox -->
                <div v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 mt-1">
                  <input type="checkbox" class="w-5 h-5 text-[#5855F6] rounded border-gray-300" />
                  <span class="text-sm text-gray-700 font-medium">{{ field.placeholder || 'Yes, I agree' }}</span>
                </div>

                <!-- Radio Buttons -->
                <div v-else-if="field.type === 'radio'" class="flex flex-col gap-3 mt-1">
                  <label v-for="option in field.options" :key="option" class="flex items-center gap-3">
                    <input type="radio" :name="'radio-' + field.id" :value="option"
                      class="w-5 h-5 text-[#5855F6] border-gray-300" />
                    <span class="text-sm text-gray-700 font-medium">{{ option }}</span>
                  </label>
                </div>

                <!-- Fallback -->
                <input v-else type="text" :placeholder="field.placeholder" class="gen-form-input" />
              </div>
            </div>

            <button type="submit" class="w-full mt-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-md">
              Submit Form
            </button>
          </form>
        </div>
      </div>

      <!-- Failed Generation State -->
      <div v-else-if="prediction && generatedFields?.length === 0" class="gen-error-banner animate-fade-up mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" class="flex-shrink-0">
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
import { ref, onMounted, onUnmounted } from "vue";
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

// Publish State
const isPublished = ref(false);
const isToggling = ref(false);

// Speech Recognition State
const hasSpeechRecognition = ref(false);
const isRecording = ref(false);
let recognition = null;

// Fetch logged-in user and setup speech recognition on mount
onMounted(() => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) {
    currentUser.value = JSON.parse(storedUserStr);
  }

  // Setup Web Speech API if supported by the browser
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    hasSpeechRecognition.value = true;
    recognition = new SpeechRecognition();

    // Config: False means it will stop listening automatically when the user stops speaking
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording.value = true;
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      // Append the text if they already typed something, or replace if empty
      if (inputText.value.trim().length > 0) {
        inputText.value += ' ' + transcript;
      } else {
        inputText.value = transcript;
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isRecording.value = false;
    };

    recognition.onend = () => {
      isRecording.value = false;
    };
  }
});

// Clean up recognition if component is destroyed
onUnmounted(() => {
  if (recognition && isRecording.value) {
    recognition.stop();
  }
});

// Voice Record Toggle
const toggleRecording = () => {
  if (!recognition) return;

  if (isRecording.value) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start recording", e);
    }
  }
};

const fillSuggestion = (text) => {
  inputText.value = text;
};

// Publish Method
const publishForm = async () => {
  if (!formId.value) return;

  isToggling.value = true;

  try {
    await axios.put(`http://localhost:3000/api/forms/${formId.value}`, {
      is_published: true
    });
    isPublished.value = true;
  } catch (error) {
    console.error("Failed to publish form", error);
  } finally {
    isToggling.value = false;
  }
};

// Generation Method
const predictMask = async () => {
  if (!currentUser.value) {
    errorMessage.value = "Please log in to generate forms.";
    return;
  }

  if (inputText.value.trim() !== "") {
    // Stop recording if they hit generate while speaking
    if (isRecording.value && recognition) recognition.stop();

    isLoading.value = true;
    prediction.value = null;
    generatedFields.value = [];
    errorMessage.value = null;
    formId.value = null;
    publicHash.value = null;
    isPublished.value = false;

    try {
      const response = await axios.post("http://localhost:3000/predict", {
        inputText: inputText.value,
        creator_id: currentUser.value._id
      });

      prediction.value = response.data.prediction;
      generatedFields.value = response.data.fields || [];

      formId.value = response.data.form_id;
      publicHash.value = response.data.public_hash;

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
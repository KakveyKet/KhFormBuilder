<template>
  <div class="gen-layout">
    <div class="gen-grid-container">

      <!-- ================= LEFT COLUMN: THEMES ================= -->
      <aside class="gen-sidebar-left">
        <transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 -translate-x-4"
          enter-to-class="opacity-100 translate-x-0">
          <div v-if="generatedFields?.length > 0 && !isLoading" class="gen-sidebar-card">
            <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" class="text-[#5855F6]">
                <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Appearance
            </h3>

            <div class="flex flex-col gap-2">
              <button v-for="tpl in templates" :key="tpl.id" @click="changeTheme(tpl.id)"
                class="flex items-center gap-3 p-3 rounded-xl border text-left transition-all"
                :class="selectedTemplate === tpl.id ? 'bg-[#5855F6]/5 border-[#5855F6] ring-1 ring-[#5855F6]' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'">
                <!-- Mini Swatches -->
                <div class="flex-shrink-0 flex gap-0.5">
                  <div class="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-inner"
                    :style="{ backgroundColor: tpl.colors.primary }"></div>
                  <div class="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-inner"
                    :style="{ backgroundColor: tpl.colors.bg }"></div>
                </div>
                <span class="text-sm font-bold truncate"
                  :class="selectedTemplate === tpl.id ? 'text-[#5855F6]' : 'text-gray-700'">
                  {{ tpl.name }}
                </span>

                <svg v-if="selectedTemplate === tpl.id" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                  stroke-linejoin="round" class="ml-auto text-[#5855F6] flex-shrink-0">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </transition>
      </aside>

      <!-- ================= CENTER COLUMN: CHAT & PREVIEW ================= -->
      <main class="gen-main-center">

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
              <p class="text-sm font-medium text-orange-700 hidden sm:block">- Log in to save forms.</p>
            </div>
            <a href="/login" class="gen-login-btn">Log in</a>
          </div>
        </transition>

        <!-- Header & Logo -->
        <div v-if="!prediction && !isLoading" class="gen-header flex flex-col items-center text-center">
          <div class="flex items-center gap-2 mb-6 animate-fade-down">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="shadow-sm rounded-xl">
              <rect width="32" height="32" rx="8" fill="#5855F6" />
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
            <span class="font-bold text-2xl text-gray-900 tracking-tight">លំហ.AI <span
                class="text-[#5855F6]">Form</span></span>
          </div>

          <h1 class="gen-title">What do you want to build?</h1>
          <p class="gen-subtitle">Describe your ideal data collection form in plain English or Khmer, and our AI will
            generate it instantly.</p>
        </div>

        <!-- The Magic Prompt Box -->
        <div class="gen-prompt-card" :class="{ 'opacity-50 pointer-events-none': !currentUser || isLoading }">
          <div class="relative">
            <textarea v-model="inputText" :disabled="!currentUser || isLoading"
              :placeholder="isRecording ? 'Listening... Speak now...' : 'e.g., សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ (Create a wedding RSVP form)'"
              class="gen-prompt-textarea" :class="isRecording ? 'text-gray-900 placeholder-red-400' : ''"
              @keyup.enter.prevent="predictMask"></textarea>
          </div>

          <div class="gen-prompt-footer">
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

              <select v-if="hasSpeechRecognition" v-model="voiceLanguage"
                :disabled="isRecording || !currentUser || isLoading"
                class="text-xs font-medium bg-gray-50 border border-gray-200 text-gray-600 rounded-md px-2 py-1.5 outline-none focus:border-[#5855F6] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <option value="en-US">English</option>
                <option value="km-KH">Khmer</option>
              </select>

              <span v-if="isRecording"
                class="text-xs font-bold text-red-500 animate-pulse flex items-center gap-1.5 uppercase tracking-widest hidden sm:flex">
                <span class="w-2 h-2 rounded-full bg-red-500"></span> Recording
              </span>
            </div>

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

        <!-- Loading Skeleton -->
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

        <!-- Results: Mock Browser Window for Preview -->
        <div v-if="generatedFields?.length > 0 && !isLoading" class="gen-browser-window animate-fade-up"
          :style="activeThemeStyle">
          <div class="gen-browser-header">
            <div class="flex items-center gap-1.5">
              <div class="gen-browser-dot bg-red-400"></div>
              <div class="gen-browser-dot bg-amber-400"></div>
              <div class="gen-browser-dot bg-emerald-400"></div>
            </div>
            <div class="flex-1 text-center flex justify-center">
              <span
                class="text-xs font-mono text-gray-400 bg-white px-3 py-1 rounded-md border border-gray-200 truncate max-w-[150px] sm:max-w-xs">
                preview.local/{{ formId || "new" }}
              </span>
            </div>
            <div class="w-10"></div>
          </div>

          <form @submit.prevent
            class="p-6 sm:p-10 pointer-events-none bg-[var(--tpl-bg)] text-[var(--tpl-text)] border-x border-b border-[var(--tpl-border)] rounded-b-2xl relative transition-colors duration-500">
            <!-- Header -->
            <div
              class="mb-8 pb-6 border-b border-[var(--tpl-border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div class="text-center sm:text-left">
                <!-- <h2 class="text-2xl font-bold mb-2">{{ prediction || "Generated Form" }}</h2> -->
                <p class="text-sm opacity-70">Please fill out the form below.</p>
              </div>
              <div class="flex items-center justify-center sm:justify-end gap-2 hidden sm:flex"
                style="color: var(--tpl-primary)">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor" />
                  <circle cx="16" cy="16" r="6" fill="var(--tpl-bg)" />
                </svg>
                <span class="text-xs font-bold text-[var(--tpl-text)]">លំហ.AI</span>
              </div>
            </div>

            <!-- Fields -->
            <div class="space-y-5">
              <div v-for="field in generatedFields" :key="field.id" class="flex flex-col gap-1.5">
                <label class="text-sm font-bold">{{ field.label }}</label>

                <!-- Standard Inputs -->
                <input v-if="['text', 'email', 'number', 'password', 'date'].includes(field.type)" :type="field.type"
                  :placeholder="field.placeholder"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors"
                  style="background-color: color-mix(in srgb, var(--tpl-text) 3%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);" />

                <!-- Textarea -->
                <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" rows="3"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors resize-none"
                  style="background-color: color-mix(in srgb, var(--tpl-text) 3%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);"></textarea>

                <!-- Select -->
                <select v-else-if="field.type === 'select'"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors appearance-none"
                  style="background-color: color-mix(in srgb, var(--tpl-text) 3%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);">
                  <option disabled selected value="">Select an option...</option>
                  <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                </select>

                <!-- Checkbox -->
                <div v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 mt-1">
                  <input type="checkbox" class="w-5 h-5 rounded border"
                    style="accent-color: var(--tpl-primary); border-color: var(--tpl-border);" />
                  <span class="text-sm font-medium">{{ field.placeholder || "Yes, I agree" }}</span>
                </div>

                <!-- Radio -->
                <div v-else-if="field.type === 'radio'" class="flex flex-col gap-3 mt-1">
                  <label v-for="option in field.options" :key="option" class="flex items-center gap-3">
                    <input type="radio" :name="'radio-' + field.id" :value="option" class="w-5 h-5 border"
                      style="accent-color: var(--tpl-primary); border-color: var(--tpl-border);" />
                    <span class="text-sm font-medium">{{ option }}</span>
                  </label>
                </div>

                <!-- Fallback -->
                <input v-else type="text" :placeholder="field.placeholder"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors"
                  style="background-color: color-mix(in srgb, var(--tpl-text) 3%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);" />
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit"
              class="w-full mt-8 py-3.5 font-bold rounded-xl shadow-md transition-transform hover:-translate-y-0.5"
              style="background-color: var(--tpl-primary); color: #ffffff">
              Submit Form
            </button>
          </form>
        </div>

        <!-- Failed Generation State -->
        <div v-if="prediction && generatedFields?.length === 0" class="gen-error-banner animate-fade-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" class="flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>The AI failed to generate fields from that description. Please try rephrasing!</span>
        </div>

      </main>

      <!-- ================= RIGHT COLUMN: ACTIONS ================= -->
      <aside class="gen-sidebar-right">
        <transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0">
          <div v-if="generatedFields?.length > 0 && !isLoading" class="flex flex-col gap-6">

            <!-- Status Card -->
            <div class="gen-sidebar-card flex flex-col items-center text-center py-6">
              <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors"
                :class="isPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'">
                <svg v-if="isPublished" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h4 class="font-extrabold text-gray-900 text-lg">{{ isPublished ? 'Published' : 'Draft' }}</h4>
              <p class="text-xs text-gray-500 mt-1 leading-relaxed px-4">
                {{ isPublished ? 'Live and ready to collect responses.' : 'Generated successfully. Review and publish.'
                }}
              </p>
            </div>

            <!-- Quick Actions Card -->
            <div class="gen-sidebar-card flex flex-col gap-3">
              <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Quick Actions</h3>

              <button v-if="!isPublished" @click="publishForm" :disabled="isToggling"
                class="btn-publish-shortcut w-full">
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
                {{ isToggling ? "Publishing..." : "Publish Form" }}
              </button>

              <button v-else disabled class="btn-published-state w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Live Form
              </button>

              <router-link :to="'/edit/' + formId" class="btn-studio-shortcut w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Open in AI Studio
              </router-link>
            </div>

          </div>
        </transition>
      </aside>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import { url } from "../../api";
// State
const inputText = ref("");
const prediction = ref(null);
const generatedFields = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);

const formId = ref(null);
const publicHash = ref(null);
const currentUser = ref(null);

const isPublished = ref(false);
const isToggling = ref(false);

const templates = ref([]);
const selectedTemplate = ref("minimal-light");

// Voice State
const hasSpeechRecognition = ref(false);
const isRecording = ref(false);
const voiceLanguage = ref("en-US");
let recognition = null;

// Compute Dynamic CSS Variables based on the selected theme
const activeThemeStyle = computed(() => {
  const themeId = selectedTemplate.value || "minimal-light";
  const theme = templates.value.find((t) => t.id === themeId) || {
    colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" },
    font: "Inter",
  };

  return {
    "--tpl-primary": theme.colors?.primary || "#5855F6",
    "--tpl-bg": theme.colors?.bg || "#FFFFFF",
    "--tpl-text": theme.colors?.text || "#0F172A",
    "--tpl-border": theme.colors?.border || "#E2E8F0",
    fontFamily: theme.font === "custom" ? "Inter, sans-serif" : `"${theme.font}", sans-serif`,
  };
});

onMounted(async () => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) {
    currentUser.value = JSON.parse(storedUserStr);

    try {
      const templateRes = await axios.get(`${url}/api/templateRouter?userId=${currentUser.value._id}`);
      templates.value = templateRes.data;
    } catch (err) {
      console.warn("Failed to load templates", err);
      templates.value = [
        { id: "minimal-light", name: "Minimal Light", colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" }, font: "Inter" },
        { id: "classic-blue", name: "Classic Blue", colors: { primary: "#2563EB", bg: "#F8FAFC", text: "#1E293B", border: "#CBD5E1" }, font: "Roboto" },
        { id: "nature-green", name: "Nature Green", colors: { primary: "#10B981", bg: "#F0FDF4", text: "#064E3B", border: "#A7F3D0" }, font: "Inter" },
        { id: "warm-orange", name: "Warm Orange", colors: { primary: "#F59E0B", bg: "#FFFBEB", text: "#78350F", border: "#FDE68A" }, font: "Lora" },
        { id: "soft-pink", name: "Soft Pink", colors: { primary: "#EC4899", bg: "#FDF2F8", text: "#831843", border: "#FBCFE8" }, font: "Inter" },
      ];
    }
  }

  // Setup Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    hasSpeechRecognition.value = true;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => { isRecording.value = true; };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (inputText.value.trim().length > 0) {
        inputText.value += " " + transcript;
      } else {
        inputText.value = transcript;
      }
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      isRecording.value = false;
    };
    recognition.onend = () => { isRecording.value = false; };
  }
});

onUnmounted(() => {
  if (recognition && isRecording.value) recognition.stop();
});

const toggleRecording = () => {
  if (!recognition) return;
  if (isRecording.value) {
    recognition.stop();
  } else {
    try {
      recognition.lang = voiceLanguage.value;
      recognition.start();
    } catch (e) {
      console.error("Failed to start", e);
    }
  }
};

const fillSuggestion = (text) => {
  inputText.value = text;
};

const changeTheme = async (templateId) => {
  if (!formId.value) return;
  selectedTemplate.value = templateId;
  try {
    await axios.put(`${url}/api/forms/${formId.value}`, { template_id: templateId });
  } catch (err) {
    console.error("Failed to update theme", err);
  }
};

const publishForm = async () => {
  if (!formId.value) return;
  isToggling.value = true;
  try {
    await axios.put(`${url}/api/forms/${formId.value}`, {
      is_published: true,
      template_id: selectedTemplate.value,
    });
    isPublished.value = true;
  } catch (error) {
    console.error("Failed to publish form", error);
  } finally {
    isToggling.value = false;
  }
};

const predictMask = async () => {
  if (!currentUser.value) {
    errorMessage.value = "Please log in to generate forms.";
    return;
  }

  if (inputText.value.trim() !== "") {
    if (isRecording.value && recognition) recognition.stop();

    isLoading.value = true;
    prediction.value = null;
    generatedFields.value = [];
    errorMessage.value = null;
    formId.value = null;
    publicHash.value = null;
    isPublished.value = false;
    selectedTemplate.value = "minimal-light";

    try {
      const response = await axios.post(`${url}/predict`, {
        inputText: inputText.value,
        creator_id: currentUser.value._id,
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
        errorMessage.value = error.response?.data?.error || "Internal Server Error (500).";
      }
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = "Please describe the form you want to build.";
  }
};
</script>
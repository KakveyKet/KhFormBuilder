<template>
  <div class="gen-layout">
    <div class="gen-container">
      <!-- Login Warning -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="!currentUser" class="gen-login-warning">
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-orange-500"
            >
              <path
                d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
              />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p class="text-sm font-bold text-orange-800">
              Authentication Required
            </p>
            <p class="text-sm font-medium text-orange-700 hidden sm:block">
              - Log in to generate and save your forms.
            </p>
          </div>
          <a href="/login" class="gen-login-btn">Log in</a>
        </div>
      </transition>

      <!-- Header & Logo -->
      <div class="gen-header flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-6 animate-fade-down">
          <svg
            width="36"
            height="36"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="shadow-sm rounded-xl"
          >
            <rect width="32" height="32" rx="8" fill="#5855F6" />
            <circle cx="16" cy="16" r="6" fill="white" />
          </svg>
          <span class="font-bold text-2xl text-gray-900 tracking-tight"
            >លំហ.AI <span class="text-[#5855F6]">Form</span></span
          >
        </div>

        <h1 class="gen-title">What do you want to build today?</h1>
        <p class="gen-subtitle">
          Describe your ideal data collection form in plain English or Khmer,
          and our AI will generate a production-ready interface instantly.
        </p>
      </div>

      <!-- The Magic Prompt Box -->
      <div
        class="gen-prompt-card"
        :class="{ 'opacity-50 pointer-events-none': !currentUser || isLoading }"
      >
        <div class="relative">
          <textarea
            v-model="inputText"
            :disabled="!currentUser || isLoading"
            :placeholder="
              isRecording
                ? 'Listening... Speak now...'
                : 'e.g., សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ (Create a wedding RSVP form)'
            "
            class="gen-prompt-textarea"
            :class="isRecording ? 'text-gray-900 placeholder-red-400' : ''"
            @keyup.enter.prevent="predictMask"
          ></textarea>
        </div>

        <div class="gen-prompt-footer">
          <div class="flex items-center gap-3">
            <button
              v-if="hasSpeechRecognition"
              @click="toggleRecording"
              :disabled="!currentUser || isLoading"
              :title="isRecording ? 'Stop recording' : 'Start voice typing'"
              class="gen-voice-btn"
              :class="
                isRecording
                  ? 'active bg-red-50 text-red-500 border-red-200 animate-pulse'
                  : ''
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
                />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>

            <!-- 🌟 NEW: Voice Language Selector -->
            <select
              v-if="hasSpeechRecognition"
              v-model="voiceLanguage"
              :disabled="isRecording || !currentUser || isLoading"
              class="text-xs font-medium bg-gray-50 border border-gray-200 text-gray-600 rounded-md px-2 py-1.5 outline-none focus:border-[#5855F6] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="en-US">English</option>
              <option value="km-KH">Khmer</option>
            </select>

            <span
              v-if="isRecording"
              class="text-xs font-bold text-red-500 animate-pulse flex items-center gap-1.5 uppercase tracking-widest"
            >
              <span class="w-2 h-2 rounded-full bg-red-500"></span> Recording...
            </span>
          </div>

          <button
            @click="predictMask"
            :disabled="isLoading || !currentUser || !inputText.trim()"
            class="gen-submit-btn group"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <svg
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating
            </span>
            <span v-else class="flex items-center gap-2">
              Generate Form
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div
        v-if="!prediction && !isLoading"
        class="gen-suggestions animate-fade-up"
      >
        <p
          class="text-xs font-bold text-gray-400 uppercase mb-3 text-center tracking-widest"
        >
          Try these examples
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            @click="
              fillSuggestion(
                'A simple contact form with name, email, and a message box.',
              )
            "
            class="gen-suggestion-pill"
          >
            Contact Form
          </button>
          <button
            @click="
              fillSuggestion(
                'Job application form asking for resume, experience, and role.',
              )
            "
            class="gen-suggestion-pill"
          >
            Job Application
          </button>
          <button
            @click="fillSuggestion('សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ')"
            class="gen-suggestion-pill"
          >
            Wedding RSVP (Khmer)
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="gen-error-banner animate-fade-up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="flex-shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <div v-if="isLoading" class="gen-loading-state animate-fade">
        <div
          class="flex items-center justify-between mb-8 pb-6 border-b border-gray-100"
        >
          <div class="h-6 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
          <div class="h-8 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div class="space-y-5">
          <div class="gen-skeleton-input"></div>
          <div class="gen-skeleton-input w-3/4"></div>
          <div class="gen-skeleton-input h-24"></div>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 animate-pulse"
        ></div>
      </div>

      <!-- RESULTS AREA -->
      <div
        v-if="generatedFields?.length > 0 && !isLoading"
        class="gen-results-area animate-fade-up"
      >
        <div v-if="formId && publicHash" class="gen-action-panel mb-4">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                :class="
                  isPublished
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-amber-100 text-amber-600'
                "
              >
                <svg
                  v-if="isPublished"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 leading-tight">
                  {{
                    isPublished
                      ? "Form Published Successfully"
                      : "Form Saved as Draft"
                  }}
                </h3>
                <p class="text-sm text-gray-500 mt-0.5">
                  {{
                    isPublished
                      ? "Your form is now live and ready to collect responses."
                      : "Your form is generated. Review it and click publish."
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <router-link
                :to="'/edit/' + formId"
                class="btn-studio-shortcut flex-1 sm:flex-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                AI Studio
              </router-link>

              <button
                v-if="!isPublished"
                @click="publishForm"
                :disabled="isToggling"
                class="btn-publish-shortcut flex-1 sm:flex-none"
              >
                <svg
                  v-if="isToggling"
                  class="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {{ isToggling ? "Publishing..." : "Publish" }}
              </button>

              <button
                v-else
                disabled
                class="btn-published-state flex-1 sm:flex-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Live
              </button>
            </div>
          </div>
        </div>

        <!-- Theme Selector Gallery -->
        <div v-if="templates.length > 0" class="mb-6">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3"
            >Quick Style Selector</label
          >
          <div
            class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            <button
              v-for="tpl in templates"
              :key="tpl.id"
              @click="changeTheme(tpl.id)"
              class="flex-shrink-0 px-4 py-2 border rounded-xl text-sm font-bold transition-all shadow-sm"
              :class="
                selectedTemplate === tpl.id
                  ? 'bg-[#5855F6] border-[#5855F6] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              "
            >
              {{ tpl.name }}
            </button>
          </div>
        </div>

        <!-- Mock Browser Window for Preview (Injecting CSS Variables) -->
        <div class="gen-browser-window" :style="activeThemeStyle">
          <div class="gen-browser-header">
            <div class="flex items-center gap-1.5">
              <div class="gen-browser-dot bg-red-400"></div>
              <div class="gen-browser-dot bg-amber-400"></div>
              <div class="gen-browser-dot bg-emerald-400"></div>
            </div>
            <div class="flex-1 text-center flex justify-center">
              <span
                class="text-xs font-mono text-gray-400 bg-white px-3 py-1 rounded-md border border-gray-200 truncate max-w-[200px] sm:max-w-xs"
              >
                preview.local/{{ formId || "new-form" }}
              </span>
            </div>
            <div class="w-10"></div>
          </div>

          <!-- The Live Form Preview styling is now purely dynamic! -->
          <form
            @submit.prevent
            class="p-6 sm:p-10 pointer-events-none bg-[var(--tpl-bg)] text-[var(--tpl-text)] border-x border-b border-[var(--tpl-border)] rounded-b-xl relative transition-colors duration-500"
          >
            <!-- Header -->
            <div
              class="mb-8 pb-6 border-b border-[var(--tpl-border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold mb-2">
                  {{ prediction || "Generated Form" }}
                </h2>
                <p class="text-sm opacity-70">
                  Please fill out the form below.
                </p>
              </div>
              <div
                class="flex items-center justify-center sm:justify-end gap-2"
                style="color: var(--tpl-primary)"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="8" fill="currentColor" />
                  <circle cx="16" cy="16" r="6" fill="var(--tpl-bg)" />
                </svg>
                <span class="text-xs font-bold text-[var(--tpl-text)]"
                  >លំហ.AI Form</span
                >
              </div>
            </div>

            <!-- Fields -->
            <div class="space-y-5">
              <div
                v-for="field in generatedFields"
                :key="field.id"
                class="flex flex-col gap-1.5"
              >
                <label class="text-sm font-bold">{{ field.label }}</label>

                <!-- Standard Inputs -->
                <input
                  v-if="
                    ['text', 'email', 'number', 'password', 'date'].includes(
                      field.type,
                    )
                  "
                  :type="field.type"
                  :placeholder="field.placeholder"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors"
                  style="
                    background-color: color-mix(
                      in srgb,
                      var(--tpl-text) 3%,
                      var(--tpl-bg)
                    );
                    border-color: var(--tpl-border);
                    color: var(--tpl-text);
                  "
                />

                <!-- Textarea -->
                <textarea
                  v-else-if="field.type === 'textarea'"
                  :placeholder="field.placeholder"
                  rows="3"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors resize-none"
                  style="
                    background-color: color-mix(
                      in srgb,
                      var(--tpl-text) 3%,
                      var(--tpl-bg)
                    );
                    border-color: var(--tpl-border);
                    color: var(--tpl-text);
                  "
                ></textarea>

                <!-- Select -->
                <select
                  v-else-if="field.type === 'select'"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors appearance-none"
                  style="
                    background-color: color-mix(
                      in srgb,
                      var(--tpl-text) 3%,
                      var(--tpl-bg)
                    );
                    border-color: var(--tpl-border);
                    color: var(--tpl-text);
                  "
                >
                  <option disabled selected value="">
                    Select an option...
                  </option>
                  <option
                    v-for="option in field.options"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <!-- Checkbox -->
                <div
                  v-else-if="field.type === 'checkbox'"
                  class="flex items-center gap-3 mt-1"
                >
                  <input
                    type="checkbox"
                    class="w-5 h-5 rounded border"
                    style="
                      accent-color: var(--tpl-primary);
                      border-color: var(--tpl-border);
                    "
                  />
                  <span class="text-sm font-medium">{{
                    field.placeholder || "Yes, I agree"
                  }}</span>
                </div>

                <!-- Radio -->
                <div
                  v-else-if="field.type === 'radio'"
                  class="flex flex-col gap-3 mt-1"
                >
                  <label
                    v-for="option in field.options"
                    :key="option"
                    class="flex items-center gap-3"
                  >
                    <input
                      type="radio"
                      :name="'radio-' + field.id"
                      :value="option"
                      class="w-5 h-5 border"
                      style="
                        accent-color: var(--tpl-primary);
                        border-color: var(--tpl-border);
                      "
                    />
                    <span class="text-sm font-medium">{{ option }}</span>
                  </label>
                </div>

                <input
                  v-else
                  type="text"
                  :placeholder="field.placeholder"
                  class="w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors"
                  style="
                    background-color: color-mix(
                      in srgb,
                      var(--tpl-text) 3%,
                      var(--tpl-bg)
                    );
                    border-color: var(--tpl-border);
                    color: var(--tpl-text);
                  "
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full mt-8 py-3.5 font-bold rounded-xl shadow-md transition-transform hover:-translate-y-0.5"
              style="background-color: var(--tpl-primary); color: #ffffff"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>

      <div
        v-else-if="prediction && generatedFields?.length === 0"
        class="gen-error-banner animate-fade-up mt-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="flex-shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span
          >The AI failed to generate fields from that description. Please try
          rephrasing!</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";

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
const voiceLanguage = ref("en-US"); // 🌟 NEW: Language state
let recognition = null;

// Compute Dynamic CSS Variables based on the selected theme
const activeThemeStyle = computed(() => {
  const themeId = selectedTemplate.value || "minimal-light";
  const theme = templates.value.find((t) => t.id === themeId) || {
    colors: {
      primary: "#5855F6",
      bg: "#FFFFFF",
      text: "#0F172A",
      border: "#E2E8F0",
    },
    font: "Inter",
  };

  return {
    "--tpl-primary": theme.colors?.primary || "#5855F6",
    "--tpl-bg": theme.colors?.bg || "#FFFFFF",
    "--tpl-text": theme.colors?.text || "#0F172A",
    "--tpl-border": theme.colors?.border || "#E2E8F0",
    fontFamily:
      theme.font === "custom"
        ? "Inter, sans-serif"
        : `"${theme.font}", sans-serif`,
  };
});

onMounted(async () => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) {
    currentUser.value = JSON.parse(storedUserStr);

    try {
      const templateRes = await axios.get(
        `http://localhost:3000/api/templateRouter?userId=${currentUser.value._id}`,
      );
      templates.value = templateRes.data;
    } catch (err) {
      console.warn("Failed to load templates", err);
      templates.value = [
        {
          id: "minimal-light",
          name: "Minimal Light",
          requiredPlan: "free",
          colors: {
            primary: "#5855F6",
            bg: "#FFFFFF",
            text: "#0F172A",
            border: "#E2E8F0",
          },
          font: "Inter",
          designStyle: "clean",
        },
        {
          id: "classic-blue",
          name: "Classic Blue",
          requiredPlan: "free",
          colors: {
            primary: "#2563EB",
            bg: "#F8FAFC",
            text: "#1E293B",
            border: "#CBD5E1",
          },
          font: "Roboto",
          designStyle: "standard",
        },
        {
          id: "nature-green",
          name: "Nature Green",
          requiredPlan: "free",
          colors: {
            primary: "#10B981",
            bg: "#F0FDF4",
            text: "#064E3B",
            border: "#A7F3D0",
          },
          font: "Inter",
          designStyle: "soft",
        },
        {
          id: "warm-orange",
          name: "Warm Orange",
          requiredPlan: "free",
          colors: {
            primary: "#F59E0B",
            bg: "#FFFBEB",
            text: "#78350F",
            border: "#FDE68A",
          },
          font: "Lora",
          designStyle: "warm",
        },
        {
          id: "soft-pink",
          name: "Soft Pink",
          requiredPlan: "free",
          colors: {
            primary: "#EC4899",
            bg: "#FDF2F8",
            text: "#831843",
            border: "#FBCFE8",
          },
          font: "Inter",
          designStyle: "playful",
        },
      ];
    }
  }

  // Setup Web Speech API if supported by the browser
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    hasSpeechRecognition.value = true;
    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording.value = true;
    };

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

    recognition.onend = () => {
      isRecording.value = false;
    };
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
      // 🌟 FIXED: Dynamically apply the selected language right before starting!
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
    await axios.put(`http://localhost:3000/api/forms/${formId.value}`, {
      template_id: templateId,
    });
  } catch (err) {
    console.error("Failed to update theme", err);
  }
};

const publishForm = async () => {
  if (!formId.value) return;
  isToggling.value = true;
  try {
    await axios.put(`http://localhost:3000/api/forms/${formId.value}`, {
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
      const response = await axios.post("http://localhost:3000/predict", {
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
        errorMessage.value =
          error.response.data.error ||
          "Token limit reached. Please upgrade your plan!";
      } else {
        errorMessage.value =
          error.response?.data?.error || "Internal Server Error (500).";
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
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

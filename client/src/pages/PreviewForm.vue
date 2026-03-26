<template>
  <!-- Main Wrapper with dynamic background color & font -->
  <div class="min-h-screen py-12 px-4 sm:px-6 flex justify-center items-start transition-colors duration-500"
    :style="activeThemeStyle" style="background-color: color-mix(in srgb, var(--tpl-bg) 95%, var(--tpl-text));">

    <!-- 1. Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center pt-32">
      <svg class="animate-spin h-10 w-10 mb-4" style="color: var(--tpl-primary);" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <p class="font-medium" style="color: var(--tpl-text); opacity: 0.7;">Loading form...</p>
    </div>

    <!-- 2. Error / Not Found State -->
    <div v-else-if="errorMessage" class="max-w-xl w-full p-10 rounded-2xl shadow-xl text-center mt-20"
      style="background-color: var(--tpl-bg); border: 1px solid var(--tpl-border);">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" style="color: var(--tpl-text);"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2" style="color: var(--tpl-text);">Form Unavailable</h2>
      <p style="color: var(--tpl-text); opacity: 0.7;">{{ errorMessage }}</p>
    </div>

    <!-- 3. Success / Thank You State -->
    <div v-else-if="isSubmitted" class="max-w-xl w-full p-12 rounded-2xl shadow-2xl text-center mt-20 animate-fade-up"
      style="background-color: var(--tpl-bg); border: 1px solid var(--tpl-border);">
      <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style="background-color: color-mix(in srgb, var(--tpl-primary) 15%, transparent); color: var(--tpl-primary);">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold mb-3" style="color: var(--tpl-text);">Thank you!</h2>
      <p class="mb-8 text-lg" style="color: var(--tpl-text); opacity: 0.7;">Your response has been successfully
        recorded.</p>
      <button @click="resetForm"
        class="px-8 py-3 font-bold rounded-xl transition-transform hover:-translate-y-0.5 shadow-md"
        style="background-color: var(--tpl-primary); color: #ffffff;">
        Submit another response
      </button>
    </div>

    <!-- 4. Main Form Area -->
    <div v-else
      class="max-w-3xl w-full bg-[var(--tpl-bg)] rounded-2xl shadow-2xl overflow-hidden mt-6 animate-fade-up flex flex-col">

      <!-- Top Accent Bar -->
      <div class="h-3 w-full flex-shrink-0" style="background-color: var(--tpl-primary);"></div>

      <!-- Cover Image Display -->
      <div v-if="formData.cover_image && formData.cover_image.url"
        class="w-full h-32 sm:h-48 lg:h-56 border-b flex-shrink-0" style="border-color: var(--tpl-border);">
        <img :src="formData.cover_image.url" class="w-full h-full object-cover" alt="Form Cover" />
      </div>

      <div class="p-8 sm:p-12">

        <!-- Header Attachment Display (Logo/Doc) -->
        <div v-if="formData.header_file && formData.header_file.url" class="mb-8 flex"
          :style="{ justifyContent: formData.typography?.title?.align || 'left' }">
          <img v-if="formData.header_file.type === 'image'" :src="formData.header_file.url"
            class="max-h-32 object-contain rounded-lg shadow-sm border" style="border-color: var(--tpl-border);" />
          <a v-else :href="formData.header_file.url" :download="formData.header_file.name"
            class="flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            style="border-color: var(--tpl-primary); color: var(--tpl-primary); background-color: color-mix(in srgb, var(--tpl-primary) 5%, transparent);">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download {{ formData.header_file.name }}
          </a>
        </div>

        <!-- Form Header (Only show on first step) -->
        <div v-if="currentStep === 0" class="mb-10 pb-8 border-b" style="border-color: var(--tpl-border);">
          <h1 class="text-3xl sm:text-4xl mb-4 leading-tight" :style="{
            color: formData.typography?.title?.color || 'var(--tpl-text)',
            textAlign: formData.typography?.title?.align || 'left',
            textDecoration: formData.typography?.title?.decoration || 'none',
            fontWeight: formData.typography?.title?.weight || 'bold',
            fontStyle: formData.typography?.title?.style || 'normal'
          }">
            {{ formData.title }}
          </h1>
          <p class="text-[16px] leading-relaxed whitespace-pre-wrap" :style="{
            color: formData.typography?.description?.color || 'var(--tpl-text)',
            textAlign: formData.typography?.description?.align || 'left',
            textDecoration: formData.typography?.description?.decoration || 'none',
            fontWeight: formData.typography?.description?.weight || 'normal',
            fontStyle: formData.typography?.description?.style || 'normal',
            opacity: formData.typography?.description?.color ? 1 : 0.75
          }">
            {{ formData.description }}
          </p>
        </div>

        <!-- Form Body -->
        <form ref="formRef" @submit.prevent="submitForm" class="space-y-8">

          <!-- Step Progress Indicator -->
          <div v-if="formSteps.length > 1" class="mb-8">
            <p class="text-sm font-bold mb-3" style="color: var(--tpl-text); opacity: 0.6;">
              Step {{ currentStep + 1 }} of {{ formSteps.length }}
            </p>
            <div class="w-full rounded-full h-1.5 overflow-hidden"
              style="background-color: color-mix(in srgb, var(--tpl-text) 10%, transparent);">
              <div class="h-1.5 rounded-full transition-all duration-300" style="background-color: var(--tpl-primary);"
                :style="{ width: ((currentStep + 1) / formSteps.length * 100) + '%' }"></div>
            </div>
            <h3 v-if="formSteps[currentStep].title !== formData.title" class="text-2xl font-bold mt-6 mb-2"
              style="color: var(--tpl-text);">
              {{ formSteps[currentStep].title }}
            </h3>
          </div>

          <!-- Render fields for the current step -->
          <div v-for="field in formSteps[currentStep].fields" :key="field.id" class="flex flex-col">
            <label class="mb-2.5 text-[15px] font-bold" style="color: var(--tpl-text);">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500 ml-1">*</span>
            </label>

            <!-- 1. Standard Inputs -->
            <input
              v-if="['text', 'email', 'number', 'password', 'date', 'time', 'datetime-local', 'url', 'tel'].includes(field.type)"
              :type="field.type" :placeholder="field.placeholder" v-model="answers[field.id]" :required="field.required"
              class="px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-[16px] w-full"
              style="background-color: color-mix(in srgb, var(--tpl-text) 2%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);"
              :style="`--tw-ring-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent);`" />

            <!-- 2. Textarea -->
            <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" v-model="answers[field.id]"
              :required="field.required" rows="4"
              class="px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-[16px] w-full resize-y"
              style="background-color: color-mix(in srgb, var(--tpl-text) 2%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);"
              :style="`--tw-ring-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent);`"></textarea>

            <!-- 3. Select Dropdown -->
            <div v-else-if="field.type === 'select'" class="relative">
              <select v-model="answers[field.id]" :required="field.required"
                class="px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-[16px] w-full cursor-pointer appearance-none"
                style="background-color: color-mix(in srgb, var(--tpl-text) 2%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);"
                :style="`--tw-ring-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent);`">
                <option disabled value="">Select an option...</option>
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                style="color: var(--tpl-text); opacity: 0.5;">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <!-- 4. Radio Buttons -->
            <div v-else-if="field.type === 'radio'" class="space-y-3 mt-1">
              <label v-for="opt in field.options" :key="opt"
                class="flex items-center gap-3 cursor-pointer p-4 border rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
                :style="answers[field.id] === opt ? 'border-color: var(--tpl-primary); background-color: color-mix(in srgb, var(--tpl-primary) 5%, transparent);' : 'border-color: var(--tpl-border); background-color: var(--tpl-bg);'">
                <input type="radio" :name="'radio-' + field.id" :value="opt" v-model="answers[field.id]"
                  :required="field.required" class="w-5 h-5 border"
                  style="accent-color: var(--tpl-primary); border-color: var(--tpl-border);" />
                <span class="text-[16px] font-medium" style="color: var(--tpl-text);">{{ opt }}</span>
              </label>
            </div>

            <!-- 5. Checkbox -->
            <label v-else-if="field.type === 'checkbox'"
              class="flex items-center gap-3 cursor-pointer mt-1 group w-fit">
              <div class="relative flex items-center justify-center">
                <input type="checkbox" v-model="answers[field.id]" :required="field.required"
                  class="peer appearance-none w-6 h-6 border-2 rounded transition-all cursor-pointer"
                  style="border-color: var(--tpl-border); accent-color: var(--tpl-primary);" />
                <div
                  class="absolute inset-0 rounded pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center"
                  style="background-color: var(--tpl-primary);">
                  <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <span class="text-[16px] font-medium select-none transition-colors opacity-90 hover:opacity-100"
                style="color: var(--tpl-text);">
                {{ field.placeholder || 'Yes, I agree' }}
              </span>
            </label>

            <!-- 6. Color Picker -->
            <div v-else-if="field.type === 'color'" class="flex items-center gap-4 mt-1">
              <input type="color" v-model="answers[field.id]" :required="field.required"
                class="h-14 w-24 p-1 cursor-pointer border rounded-xl focus:outline-none focus:ring-2 transition-all"
                style="background-color: color-mix(in srgb, var(--tpl-text) 2%, var(--tpl-bg)); border-color: var(--tpl-border);"
                :style="`--tw-ring-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent);`" />
              <span class="text-md font-mono uppercase px-4 py-2 rounded-lg border opacity-80"
                style="border-color: var(--tpl-border); color: var(--tpl-text);">
                {{ answers[field.id] || '#000000' }}
              </span>
            </div>

            <!-- 7. Range Slider -->
            <div v-else-if="field.type === 'range'" class="flex items-center gap-5 mt-2 border p-5 rounded-xl shadow-sm"
              style="background-color: var(--tpl-bg); border-color: var(--tpl-border);">
              <input type="range" v-model="answers[field.id]" :required="field.required"
                class="w-full h-2.5 rounded-lg appearance-none cursor-pointer"
                style="background-color: color-mix(in srgb, var(--tpl-text) 15%, transparent); accent-color: var(--tpl-primary);" />
              <span class="text-sm font-bold text-white px-4 py-1.5 rounded-md w-14 text-center"
                style="background-color: var(--tpl-primary);">
                {{ answers[field.id] || 50 }}
              </span>
            </div>

            <!-- 8. File Upload -->
            <div v-else-if="field.type === 'file'" class="mt-1">
              <input type="file" @change="(e) => handleFileUpload(e, field.id)" :required="field.required"
                class="w-full px-5 py-4 border rounded-xl text-[15px] transition-all cursor-pointer"
                style="background-color: color-mix(in srgb, var(--tpl-text) 2%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);" />
            </div>

          </div>

          <!-- 🌟 UPDATED: Multi-step navigation buttons with Modern Icons (< and >) -->
          <div class="flex items-center gap-4 mt-10 border-t pt-8" style="border-color: var(--tpl-border);">

            <button v-if="currentStep > 0" type="button" @click="prevStep"
              class="w-14 h-14 flex items-center justify-center font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5 flex-shrink-0"
              style="background-color: color-mix(in srgb, var(--tpl-text) 5%, transparent); color: var(--tpl-text);"
              title="Previous Step">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button v-if="currentStep < formSteps.length - 1" type="button" @click="nextStep"
              class="flex-1 h-14 flex justify-center items-center gap-3 font-bold rounded-xl transition-all shadow-md hover:-translate-y-0.5 text-[18px]"
              style="background-color: var(--tpl-primary); color: #ffffff;">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button v-else type="submit" :disabled="isSubmitting"
              class="flex-1 h-14 flex justify-center items-center gap-3 text-white font-bold text-[18px] rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              style="background-color: var(--tpl-primary);">
              <svg v-if="isSubmitting" class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <template v-else>
                Submit Form
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer Branding -->
    <div v-if="!isLoading && !errorMessage" class="mt-12 mb-8 text-center w-full max-w-3xl">
      <a href="/"
        class="text-[13px] font-bold opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        style="color: var(--tpl-text);">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <circle cx="16" cy="16" r="6" fill="var(--tpl-bg)" />
        </svg>
        Powered by លំហ.AI Form
      </a>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from "vue-router";

const route = useRoute();

// State
const formId = ref("");
const formData = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");
const isSubmitting = ref(false);
const isSubmitted = ref(false);

const currentStep = ref(0);
const formRef = ref(null);

const answers = ref({});

const templates = [
  { id: "minimal-light", colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" }, font: "Inter" },
  { id: "classic-blue", colors: { primary: "#2563EB", bg: "#F8FAFC", text: "#1E293B", border: "#CBD5E1" }, font: "Roboto" },
  { id: "nature-green", colors: { primary: "#10B981", bg: "#F0FDF4", text: "#064E3B", border: "#A7F3D0" }, font: "Inter" },
  { id: "warm-orange", colors: { primary: "#F59E0B", bg: "#FFFBEB", text: "#78350F", border: "#FDE68A" }, font: "Lora" },
  { id: "soft-pink", colors: { primary: "#EC4899", bg: "#FDF2F8", text: "#831843", border: "#FBCFE8" }, font: "Inter" },
  { id: "dark-knight", colors: { primary: "#818CF8", bg: "#0F172A", text: "#F8FAFC", border: "#334155" }, font: "Inter" },
  { id: "elegant-serif", colors: { primary: "#0F172A", bg: "#FAFAFA", text: "#171717", border: "#E5E5E5" }, font: "Lora" },
  { id: "neon-cyber", colors: { primary: "#22D3EE", bg: "#171717", text: "#FFFFFF", border: "#22D3EE" }, font: "Roboto" },
  { id: "corporate-slate", colors: { primary: "#334155", bg: "#E2E8F0", text: "#0F172A", border: "#94A3B8" }, font: "Inter" },
  { id: "midnight-purple", colors: { primary: "#C084FC", bg: "#2E1065", text: "#FAF5FF", border: "#5B21B6" }, font: "Inter" },
  { id: "enterprise-gold", colors: { primary: "#EAB308", bg: "#000000", text: "#FFFFFF", border: "#CA8A04" }, font: "Inter" },
  { id: "custom-brand-kit", colors: { primary: "#111827", bg: "#FFFFFF", text: "#111827", border: "#D1D5DB" }, font: "Inter" }
];

const activeThemeStyle = computed(() => {
  if (!formData.value) return { '--tpl-bg': '#F8FAFF', '--tpl-text': '#0F172A', '--tpl-primary': '#5855F6' };

  const themeId = formData.value.template_id || 'minimal-light';
  const theme = templates.find(t => t.id === themeId) || templates[0];

  return {
    '--tpl-primary': theme.colors?.primary || '#5855F6',
    '--tpl-bg': theme.colors?.bg || '#FFFFFF',
    '--tpl-text': theme.colors?.text || '#0F172A',
    '--tpl-border': theme.colors?.border || '#E2E8F0',
    fontFamily: theme.font === 'custom' ? 'Inter, sans-serif' : `"${theme.font}", sans-serif`
  };
});

// Chunk the schema into steps separated by "page-break"
const formSteps = computed(() => {
  if (!formData.value || !formData.value.schema) return [];

  const steps = [];
  let currentFields = [];
  let currentTitle = formData.value.title;

  formData.value.schema.forEach((field) => {
    if (field.type === 'page-break') {
      steps.push({ title: currentTitle, fields: currentFields });
      currentFields = [];
      currentTitle = field.label || 'Next Step';
    } else {
      currentFields.push(field);
    }
  });

  steps.push({ title: currentTitle, fields: currentFields });
  return steps;
});

// Navigate and auto-validate HTML5 required fields
const nextStep = () => {
  if (formRef.value && formRef.value.reportValidity()) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const targetId = pathParts[pathParts.length - 1];

  if (targetId && targetId !== 'f' && targetId !== 'preview' && targetId !== 'public') {
    formId.value = targetId;
    fetchForm();
  } else {
    isLoading.value = false;
    errorMessage.value = "Invalid Form URL.";
  }
});

const fetchForm = async () => {
  try {
    // Note: Assuming your endpoint maps to formRoutes as specified by your controller
    const response = await axios.get(`http://localhost:3000/api/formRoutes/${formId.value}`);
    const data = response.data;

    if (!data.typography) {
      data.typography = {
        title: { align: "left", color: "", decoration: "none", weight: "bold", style: "normal", size: "" },
        description: { align: "left", color: "", decoration: "none", weight: "normal", style: "normal", size: "" }
      };
    }

    formData.value = data;

    if (Array.isArray(formData.value.schema)) {
      formData.value.schema.forEach(field => {
        if (field.type !== 'page-break') {
          if (field.type === 'checkbox') {
            answers.value[field.id] = false;
          } else if (field.type === 'color') {
            answers.value[field.id] = "#000000";
          } else if (field.type === 'range') {
            answers.value[field.id] = 50;
          } else {
            answers.value[field.id] = "";
          }
        }
      });
    } else {
      formData.value.schema = [];
    }

  } catch (error) {
    errorMessage.value = "This form is no longer available or does not exist.";
  } finally {
    isLoading.value = false;
  }
};

const handleFileUpload = (event, fieldId) => {
  const file = event.target.files[0];
  if (file) {
    answers.value[fieldId] = file.name;
  }
};

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    console.log("Submitting payload:", {
      form_id: formData.value._id,
      answers: answers.value
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    isSubmitted.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    alert("Failed to submit form. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.keys(answers.value).forEach(key => {
    answers.value[key] = typeof answers.value[key] === 'boolean' ? false : "";
  });
  isSubmitted.value = false;
  currentStep.value = 0;
};
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
</style>
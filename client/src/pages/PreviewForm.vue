<template>
  <div
    class="min-h-screen py-12 px-4 sm:px-6 flex justify-center items-start transition-colors duration-500 form-wrapper-bg"
    :style="activeThemeStyle">

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

    <div v-else-if="errorMessage" class="max-w-xl w-full p-10 rounded-2xl shadow-xl text-center mt-20"
      style="background-color: var(--tpl-bg); border: 1px solid var(--tpl-border);">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" style="color: var(--tpl-text);"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2" style="color: var(--tpl-text);">Form Unavailable</h2>
      <p style="color: var(--tpl-text); opacity: 0.7;">{{ errorMessage }}</p>
    </div>

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

    <!-- Main Form Area -->
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
            class="form-header-attachment">
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
            <div class="flex items-center justify-between mb-3">
              <h3 v-if="formSteps[currentStep].title !== formData.title" class="text-xl font-bold"
                style="color: var(--tpl-text);">
                {{ formSteps[currentStep].title }}
              </h3>
              <p class="text-sm font-bold" style="color: var(--tpl-text); opacity: 0.6;">
                Step {{ currentStep + 1 }} of {{ formSteps.length }}
              </p>
            </div>
            <div class="w-full rounded-full h-2 overflow-hidden"
              style="background-color: color-mix(in srgb, var(--tpl-text) 10%, transparent);">
              <div class="h-2 rounded-full transition-all duration-500 ease-out"
                style="background-color: var(--tpl-primary);"
                :style="{ width: ((currentStep + 1) / formSteps.length * 100) + '%' }"></div>
            </div>
          </div>

          <!-- Render fields for the current step -->
          <div v-for="field in formSteps[currentStep].fields" :key="field.id" class="flex flex-col">
            <label class="mb-2 text-[15px] font-bold" style="color: var(--tpl-text);">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500 ml-1" title="Required">*</span>
            </label>

            <!-- 1. Standard Text Inputs -->
            <input v-if="['text', 'email', 'number', 'password', 'url', 'tel'].includes(field.type)" :type="field.type"
              :placeholder="field.placeholder" v-model="answers[field.id]" :required="field.required"
              class="form-input-base" />

            <!-- 2. Date & Time Inputs -->
            <div v-else-if="['date', 'time', 'datetime-local'].includes(field.type)" class="form-date-wrapper">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors form-date-icon">
                <svg v-if="field.type === 'date' || field.type === 'datetime-local'" xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <input :type="field.type" :placeholder="field.placeholder" v-model="answers[field.id]"
                :required="field.required" class="form-input-base custom-date-input pl-12" />
            </div>

            <!-- 3. Textarea -->
            <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" v-model="answers[field.id]"
              :required="field.required" rows="4" class="form-input-base resize-y"></textarea>

            <!-- 4. Select Dropdown -->
            <div v-else-if="field.type === 'select'" class="form-select-wrapper">
              <select v-model="answers[field.id]" :required="field.required"
                class="form-input-base appearance-none cursor-pointer pr-10">
                <option disabled value="">Select an option...</option>
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-4 flex items-center transition-all form-select-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <!-- 5. Radio Buttons -->
            <div v-else-if="field.type === 'radio'" class="flex flex-col gap-2 mt-2">
              <label v-for="opt in field.options" :key="opt" class="form-radio-card"
                :class="{ 'is-active': answers[field.id] === opt }">

                <div class="form-radio-circle">
                  <div class="form-radio-dot"></div>
                </div>

                <input type="radio" class="sr-only" :name="'radio-' + field.id" :value="opt" v-model="answers[field.id]"
                  :required="field.required" />
                <span class="text-[15px] font-medium" style="color: var(--tpl-text);">{{ opt }}</span>
              </label>
            </div>

            <!-- 6. Checkbox -->
            <label v-else-if="field.type === 'checkbox'" class="form-checkbox-wrapper">
              <div class="flex items-center h-6">
                <input type="checkbox" class="form-checkbox-input peer sr-only" v-model="answers[field.id]"
                  :required="field.required" />
                <div class="form-checkbox-box">
                  <svg class="form-checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="form-checkbox-label">
                  {{ field.placeholder || 'Yes, I agree' }}
                </span>
              </div>
            </label>

            <!-- 7. Color Picker -->
            <div v-else-if="field.type === 'color'" class="form-color-wrapper">
              <div class="form-color-inner">
                <input type="color" v-model="answers[field.id]" :required="field.required"
                  class="absolute -inset-2 w-14 h-14 cursor-pointer" />
              </div>
              <span class="font-mono text-[15px] font-bold px-2 pr-3" style="color: var(--tpl-text);">
                {{ answers[field.id] || '#000000' }}
              </span>
            </div>

            <!-- 8. Range Slider -->
            <div v-else-if="field.type === 'range'" class="form-range-wrapper">
              <input type="range" v-model="answers[field.id]" :required="field.required" class="form-range-input" />
              <div class="form-range-badge">
                {{ answers[field.id] || 50 }}
              </div>
            </div>

            <!-- 9. File Upload -->
            <div v-else-if="field.type === 'file'">
              <label class="form-dropzone" :class="{ 'is-active': answers[field.id] }">
                <div class="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <svg v-if="!answers[field.id]" class="form-dropzone-icon-empty" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <svg v-else class="form-dropzone-icon-filled" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <p class="mb-1 text-sm font-bold truncate max-w-full" style="color: var(--tpl-text);">
                    <span v-if="answers[field.id]">{{ answers[field.id] }}</span>
                    <span v-else>Click to upload file</span>
                  </p>
                  <p v-if="!answers[field.id]" class="text-xs" style="color: var(--tpl-text); opacity: 0.6;">Any
                    document or image</p>
                </div>
                <input type="file" class="sr-only" @change="(e) => handleFileUpload(e, field.id)"
                  :required="field.required && !answers[field.id]" />
              </label>
            </div>

          </div>

          <!-- Multi-step navigation buttons (< and >) -->
          <div class="flex items-center gap-4 mt-10 border-t pt-8" style="border-color: var(--tpl-border);">
            <button v-if="currentStep > 0" type="button" @click="prevStep" class="form-btn-nav" title="Previous Step">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button v-if="currentStep < formSteps.length - 1" type="button" @click="nextStep" class="form-btn-primary">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button v-else type="submit" :disabled="isSubmitting" class="form-btn-primary">
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
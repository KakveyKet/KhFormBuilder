<template>
  <div class="h-screen w-full flex flex-col bg-[#F8FAFF] font-inter overflow-hidden">

    <!-- ================= TOP TOOLBAR ================= -->
    <header
      class="h-14 bg-white border-b border-theme-border flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div class="flex items-center gap-4">
        <a href="/dashboard"
          class="flex items-center gap-2 text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </a>
        <div class="h-5 w-px bg-gray-200"></div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-[#5855F6] rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-900 tracking-tight">លំហរ Studio</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <span v-if="successMessage" class="text-xs font-bold text-theme-success flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          {{ successMessage }}
        </span>

        <router-link v-if="currentFormId && formLoaded" :to="`/preview/f/${currentFormId}`" target="_blank"
          class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </router-link>

        <button @click="saveChanges" :disabled="isSaving"
          class="px-5 py-2 bg-theme-primary text-white text-sm font-bold rounded-lg hover:bg-theme-primary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2">
          <svg v-if="isSaving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span>{{ isSaving ? "Saving..." : "Publish Changes" }}</span>
        </button>
      </div>
    </header>

    <!-- ================= MAIN STUDIO LAYOUT ================= -->
    <div class="flex-1 flex overflow-hidden">

      <!-- LEFT SIDEBAR: Project Settings -->
      <aside class="w-64 bg-white border-r border-theme-border flex-shrink-0 overflow-y-auto p-5">
        <div class="mb-8">
          <label class="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-3">Project Details</label>
          <div class="space-y-4">
            <div>
              <label class="block text-[11px] text-gray-500 mb-1">Form Title</label>
              <input v-model="formData.title"
                class="w-full px-3 py-2 bg-gray-50 border border-theme-border rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-theme-primary outline-none transition-all"
                placeholder="Form Title" />
            </div>
            <div>
              <label class="block text-[11px] text-gray-500 mb-1">Internal Description</label>
              <textarea v-model="formData.description"
                class="w-full px-3 py-2 bg-gray-50 border border-theme-border rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-theme-primary outline-none transition-all h-24 resize-none"
                placeholder="Internal description..."></textarea>
            </div>
          </div>
        </div>

        <div class="h-px bg-gray-100 mb-6"></div>

        <div>
          <label class="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-3">Global Styles</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">Standard</button>
            <button
              class="px-2 py-2 bg-theme-primary/5 border border-theme-primary/20 rounded-lg text-xs font-bold text-theme-primary ring-1 ring-theme-primary/30">Modern</button>
          </div>
        </div>
      </aside>

      <!-- CENTRAL CANVAS: Drag & Drop Editor -->
      <main class="flex-1 overflow-y-auto p-8 flex justify-center scroll-smooth">

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <svg class="animate-spin h-8 w-8 text-theme-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-theme-muted font-medium text-sm">Booting AI Studio...</p>
        </div>

        <!-- Editor Paper -->
        <div v-else-if="formLoaded"
          class="w-full max-w-2xl bg-white shadow-xl shadow-gray-200/50 rounded-xl min-h-[800px] border border-theme-border relative flex flex-col">

          <div
            class="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-theme-primary to-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            Intelligent View
          </div>

          <!-- Paper Header (Title/Desc edit on paper) -->
          <div class="p-10 pb-6 border-b border-gray-100">
            <input v-model="formData.title"
              class="w-full text-3xl font-bold text-theme-text placeholder-gray-300 border-none focus:ring-0 p-0 mb-2 outline-none"
              placeholder="Enter Form Title..." />
            <input v-model="formData.description"
              class="w-full text-sm text-theme-muted placeholder-gray-300 border-none focus:ring-0 p-0 outline-none"
              placeholder="Type a description for your users..." />
          </div>

          <!-- 🌟 DRAG & DROP FIELD LIST -->
          <div class="flex-1 p-10 pt-6 space-y-3">
            <div v-for="(field, index) in formData.schema" :key="field.id || index" draggable="true"
              @dragstart="onDragStart(index, $event)" @dragover.prevent @dragenter.prevent @drop="onDrop(index)"
              class="relative flex items-center gap-3 p-4 bg-white border border-transparent rounded-xl transition-all group cursor-pointer"
              :class="[
                activeFieldIndex === index ? 'ring-2 ring-theme-primary bg-theme-primary/5 border-transparent shadow-sm' : 'hover:border-gray-200 hover:bg-gray-50',
                draggedIndex === index ? 'opacity-40 border-dashed border-gray-400 bg-gray-100' : ''
              ]" @click="activeFieldIndex = index">

              <!-- Drag Handle Icon -->
              <div class="cursor-grab active:cursor-grabbing text-gray-300 group-hover:text-gray-500 p-1 -ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="5" r="1" />
                  <circle cx="9" cy="19" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <circle cx="15" cy="5" r="1" />
                  <circle cx="15" cy="19" r="1" />
                </svg>
              </div>

              <!-- 🌟 NEW: Visual Component Icon -->
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 bg-white border border-gray-200 shadow-sm"
                :class="activeFieldIndex === index ? 'text-theme-primary border-theme-primary/30' : ''">
                <span v-html="getFieldIcon(field.type)"></span>
              </div>

              <!-- Field Content -->
              <div class="flex-1 flex flex-col gap-1.5 pointer-events-none">
                <label class="text-sm font-bold text-theme-text">{{ field.label || 'Untitled Field' }}</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-400 truncate">
                  {{ field.type === "checkbox" ? "Check to agree" : field.placeholder || "Input field preview..." }}
                </div>
              </div>

              <!-- Delete Action -->
              <button @click.stop="removeField(index)"
                class="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-theme-error hover:bg-red-50 rounded-md transition-all z-10"
                title="Remove Component">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Add Field Button inside paper -->
            <button @click="addField"
              class="w-full mt-4 py-4 border-2 border-dashed border-gray-200 rounded-xl text-theme-muted font-bold hover:border-theme-primary/50 hover:text-theme-primary hover:bg-theme-primary/5 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New Component
            </button>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-20 m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Instance Not Found</h2>
          <p class="text-theme-muted mb-6">{{ errorMessage || "Could not find a valid form ID." }}</p>
          <router-link to="/dashboard"
            class="px-6 py-2 bg-theme-primary text-white font-bold rounded-lg shadow-sm">Return to Hub</router-link>
        </div>
      </main>

      <!-- RIGHT SIDEBAR: Field Properties -->
      <aside class="w-72 bg-white border-l border-theme-border flex-shrink-0 overflow-y-auto">

        <div v-if="activeField" class="p-5">
          <label class="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-5 flex items-center gap-2">
            <!-- Dynamic Icon in properties sidebar too -->
            <span v-html="getFieldIcon(activeField.type)" class="text-theme-primary w-4 h-4"></span>
            Component Properties
          </label>

          <div class="space-y-5">
            <div>
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Label Text</label>
              <input v-model="activeField.label"
                class="w-full px-3 py-2 bg-gray-50 border border-theme-border rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-theme-primary outline-none transition-all" />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Input Placeholder</label>
              <input v-model="activeField.placeholder"
                class="w-full px-3 py-2 bg-gray-50 border border-theme-border rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-theme-primary outline-none transition-all" />
            </div>

            <!-- 🌟 NEW: Custom Dropdown Component with Icons -->
            <div class="relative">
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Component Type</label>

              <!-- Custom Select Trigger Box -->
              <div @click="isTypeDropdownOpen = !isTypeDropdownOpen"
                class="w-full px-3 py-2 bg-gray-50 border border-theme-border rounded-md text-sm flex items-center justify-between cursor-pointer hover:bg-white transition-all"
                :class="isTypeDropdownOpen ? 'ring-2 ring-theme-primary bg-white' : ''">
                <div class="flex items-center gap-2 text-gray-700">
                  <span v-html="getFieldIcon(activeField.type)" class="w-4 h-4 text-theme-primary"></span>
                  <span class="font-medium">{{ getFieldLabel(activeField.type) }}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-gray-400 transition-transform" :class="isTypeDropdownOpen ? 'rotate-180' : ''">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              <!-- Invisible Backdrop to close dropdown when clicking outside -->
              <div v-if="isTypeDropdownOpen" @click="isTypeDropdownOpen = false" class="fixed inset-0 z-10"></div>

              <!-- Dropdown Menu List -->
              <div v-if="isTypeDropdownOpen"
                class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto py-1">
                <div v-for="group in fieldTypes" :key="group.group">
                  <div class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/80">{{
                    group.group }}</div>

                  <div v-for="item in group.items" :key="item.value" @click="selectType(item.value)"
                    class="px-3 py-2 text-sm flex items-center gap-3 cursor-pointer transition-colors"
                    :class="activeField.type === item.value ? 'bg-theme-primary/10 text-theme-primary font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'">

                    <!-- Icon render -->
                    <span v-html="getFieldIcon(item.value)" class="w-4 h-4"
                      :class="activeField.type === item.value ? 'text-theme-primary' : 'text-gray-400'"></span>
                    <span>{{ item.label }}</span>

                    <!-- Checkmark if currently selected -->
                    <svg v-if="activeField.type === item.value" xmlns="http://www.w3.org/2000/svg" width="14"
                      height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                      stroke-linecap="round" stroke-linejoin="round" class="ml-auto text-theme-primary">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Custom Dropdown -->

          </div>

          <!-- Options for Choice-based fields -->
          <div v-if="['select', 'radio'].includes(activeField.type)" class="mt-8 pt-6 border-t border-gray-100">
            <label class="block text-[11px] font-bold text-gray-500 mb-3">Choice Options</label>
            <div class="space-y-2">
              <div v-for="(opt, oIdx) in activeField.options" :key="oIdx" class="flex gap-2">
                <input v-model="activeField.options[oIdx]"
                  class="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm focus:border-theme-primary outline-none" />
                <button @click="removeOption(activeField, oIdx)"
                  class="text-gray-400 hover:text-theme-error hover:bg-red-50 p-1.5 rounded-md transition-colors"
                  title="Remove Option">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="12" />
                  </svg>
                </button>
              </div>
              <button @click="addOption(activeField)"
                class="w-full mt-2 py-2 border border-dashed border-theme-primary/30 text-theme-primary text-xs font-bold rounded-md hover:bg-theme-primary/5 transition-colors">
                + Add Option
              </button>
            </div>
          </div>
        </div>

        <!-- Empty Properties View -->
        <div v-else class="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1" class="mb-4 opacity-30">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p class="text-xs font-bold uppercase tracking-widest text-gray-300">No Selection</p>
          <p class="text-[11px] mt-2 max-w-[180px] leading-relaxed">Select a component on the canvas to edit its
            properties.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

// State
const currentFormId = ref("");
const formLoaded = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const activeFieldIndex = ref(null);

// 🌟 NEW: Custom Dropdown State & Data mapping
const isTypeDropdownOpen = ref(false);
const fieldTypes = [
  {
    group: 'Basic', items: [
      { value: 'text', label: 'Short Text' },
      { value: 'textarea', label: 'Long Text' },
      { value: 'email', label: 'Email Address' },
      { value: 'number', label: 'Numeric Value' },
      { value: 'date', label: 'Date Picker' }
    ]
  },
  {
    group: 'Choices', items: [
      { value: 'select', label: 'Selection Dropdown' },
      { value: 'radio', label: 'Choice Buttons' },
      { value: 'checkbox', label: 'Toggle/Check' }
    ]
  }
];

const getFieldLabel = (type) => {
  for (const group of fieldTypes) {
    const found = group.items.find(item => item.value === type);
    if (found) return found.label;
  }
  return 'Unknown Component';
};

const selectType = (typeValue) => {
  if (!activeField.value) return;
  activeField.value.type = typeValue;
  handleTypeChange(activeField.value);
  isTypeDropdownOpen.value = false;
};

// Drag and Drop State
const draggedIndex = ref(null);

const formData = ref({
  _id: "",
  title: "",
  description: "",
  schema: [],
});

const activeField = computed(() => {
  if (activeFieldIndex.value === null) return null;
  return formData.value.schema[activeFieldIndex.value];
});

onMounted(() => {
  const idFromUrl = route.params.id || route.query.id;

  if (idFromUrl) {
    currentFormId.value = idFromUrl;
    fetchForm();
  } else {
    isLoading.value = false;
  }
});

const fetchForm = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/forms/${currentFormId.value}`
    );
    formData.value = response.data;
    formLoaded.value = true;

    // Auto-select the first field if available
    if (formData.value.schema.length > 0) {
      activeFieldIndex.value = 0;
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Form not found.";
    formLoaded.value = false;
  } finally {
    isLoading.value = false;
  }
};

const saveChanges = async () => {
  isSaving.value = true;
  successMessage.value = "";
  try {
    await axios.put(`http://localhost:3000/api/forms/${formData.value._id}`, {
      title: formData.value.title,
      description: formData.value.description,
      schema: formData.value.schema,
    });
    successMessage.value = "Saved successfully!";
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

// --- FIELD ACTIONS ---
const addField = () => {
  formData.value.schema.push({
    id: Date.now(),
    label: "New Component",
    type: "text",
    placeholder: "Type here...",
  });
  activeFieldIndex.value = formData.value.schema.length - 1;
};

const removeField = (index) => {
  formData.value.schema.splice(index, 1);
  if (activeFieldIndex.value === index) {
    activeFieldIndex.value = null;
  } else if (activeFieldIndex.value > index) {
    activeFieldIndex.value--;
  }
};

const handleTypeChange = (field) => {
  if (["select", "radio"].includes(field.type)) {
    if (!field.options || field.options.length === 0) {
      field.options = ["Option 1", "Option 2"];
    }
  }
};

const addOption = (field) => {
  if (!field.options) field.options = [];
  field.options.push(`Option ${field.options.length + 1}`);
};

const removeOption = (field, optIndex) => {
  field.options.splice(optIndex, 1);
};

// --- DRAG AND DROP LOGIC ---
const onDragStart = (index, event) => {
  draggedIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
};

const onDrop = (targetIndex) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) {
    draggedIndex.value = null;
    return;
  }

  const draggedItem = formData.value.schema.splice(draggedIndex.value, 1)[0];
  formData.value.schema.splice(targetIndex, 0, draggedItem);

  if (activeFieldIndex.value === draggedIndex.value) {
    activeFieldIndex.value = targetIndex;
  } else if (activeFieldIndex.value !== null) {
    if (draggedIndex.value < activeFieldIndex.value && targetIndex >= activeFieldIndex.value) {
      activeFieldIndex.value--;
    } else if (draggedIndex.value > activeFieldIndex.value && targetIndex <= activeFieldIndex.value) {
      activeFieldIndex.value++;
    }
  }

  draggedIndex.value = null;
};

// 🌟 NEW: SVG Icon Mapping Function
const getFieldIcon = (type) => {
  const icons = {
    // "ABC" or Type cursor
    text: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
    // Paragraph lines
    textarea: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="12" y1="18" y2="18"/></svg>`,
    // Envelope
    email: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
    // Hashtag / Number
    number: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>`,
    // Calendar
    date: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    // Chevron Down Square
    select: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 10 4 4 4-4"/></svg>`,
    // Radio Button (Circle inside Circle)
    radio: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    // Checkbox Square
    checkbox: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>`
  };

  // Return the specific icon or a default generic circle
  return icons[type] || `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
};
</script>
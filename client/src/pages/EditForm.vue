<template>
  <div class="studio-layout">
    <!-- TOP TOOLBAR -->
    <header class="studio-top-bar">
      <div class="flex items-center gap-4">
        <a href="/workspace" class="studio-back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </a>
        <div class="h-6 w-px bg-gray-200"></div>
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 bg-[#5855F6] rounded-md flex items-center justify-center"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-900">លំហរ Studio</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span
          v-if="successMessage"
          class="text-xs font-bold text-emerald-500 animate-fade"
          >{{ successMessage }}</span
        >
        <button
          @click="saveChanges"
          :disabled="isSaving"
          class="btn-studio-save"
        >
          <svg
            v-if="isSaving"
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
          <span>{{ isSaving ? "Saving..." : "Publish Changes" }}</span>
        </button>
      </div>
    </header>

    <div class="studio-main">
      <!-- LEFT SIDEBAR: Structure & Settings -->
      <aside class="studio-sidebar">
        <div class="studio-prop-group">
          <label class="studio-prop-label">Project Details</label>
          <div class="space-y-3">
            <input
              v-model="formData.title"
              class="studio-prop-input"
              placeholder="Form Title"
            />
            <textarea
              v-model="formData.description"
              class="studio-prop-input h-20"
              placeholder="Internal description..."
            ></textarea>
          </div>
        </div>

        <div class="h-px bg-gray-100"></div>

        <div class="studio-prop-group">
          <label class="studio-prop-label">Global Styles</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-500"
            >
              Standard
            </button>
            <button
              class="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-bold text-indigo-600"
            >
              Modern AI
            </button>
          </div>
        </div>
      </aside>

      <!-- CENTRAL CANVAS -->
      <main class="studio-canvas">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center py-20"
        >
          <div class="studio-spinner mb-4"></div>
          <p class="text-gray-400 font-medium">Booting AI Studio...</p>
        </div>

        <!-- Editor Paper -->
        <div v-else-if="formLoaded" class="studio-paper animate-fade-up">
          <div class="studio-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              class="animate-pulse"
            >
              <path
                d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
              />
            </svg>
            Intelligent View
          </div>

          <input
            v-model="formData.title"
            class="studio-title-input"
            placeholder="Enter title..."
          />
          <input
            v-model="formData.description"
            class="studio-desc-input"
            placeholder="Type a description for your form..."
          />

          <div class="studio-field-list">
            <div
              v-for="(field, index) in formData.schema"
              :key="index"
              class="studio-field-item"
              @click="activeFieldIndex = index"
              :class="{ active: activeFieldIndex === index }"
            >
              <div class="flex flex-col gap-1">
                <label class="studio-label-input">{{ field.label }}</label>
                <div class="studio-input-mock">
                  {{
                    field.type === "checkbox"
                      ? "Check to agree"
                      : field.placeholder || "Input field preview..."
                  }}
                </div>
              </div>

              <!-- Inline Actions -->
              <div class="studio-field-actions">
                <button
                  @click.stop="removeField(index)"
                  class="btn-studio-action"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Add Field Action -->
          <div class="studio-add-field-zone">
            <button @click="addField" class="btn-studio-add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New Component
            </button>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-20">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Instance Not Found
          </h2>
          <a href="/workspace" class="btn-studio-save">Return to Hub</a>
        </div>
      </main>

      <!-- RIGHT SIDEBAR: Field Properties -->
      <aside
        v-if="activeField"
        class="studio-sidebar border-l border-r-0 border-gray-200"
      >
        <div class="studio-prop-group">
          <label class="studio-prop-label">Field Properties</label>
          <div class="space-y-4">
            <div>
              <label class="text-[10px] font-bold text-gray-400 uppercase"
                >Label Text</label
              >
              <input
                v-model="activeField.label"
                class="studio-prop-input mt-1"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-400 uppercase"
                >Input Placeholder</label
              >
              <input
                v-model="activeField.placeholder"
                class="studio-prop-input mt-1"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-400 uppercase"
                >Component Type</label
              >
              <select
                v-model="activeField.type"
                @change="handleTypeChange(activeField)"
                class="studio-prop-select mt-1"
              >
                <option value="text">Short Text</option>
                <option value="textarea">Long Text</option>
                <option value="email">Email Address</option>
                <option value="number">Numeric Value</option>
                <option value="date">Date Picker</option>
                <option value="select">Selection Dropdown</option>
                <option value="radio">Choice Buttons</option>
                <option value="checkbox">Toggle/Check</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Options for Choice-based fields -->
        <div
          v-if="['select', 'radio'].includes(activeField.type)"
          class="studio-prop-group mt-6"
        >
          <label class="studio-prop-label">Options</label>
          <div class="space-y-2">
            <div
              v-for="(opt, oIdx) in activeField.options"
              :key="oIdx"
              class="flex gap-2"
            >
              <input
                v-model="activeField.options[oIdx]"
                class="studio-prop-input"
              />
              <button
                @click="removeOption(activeField, oIdx)"
                class="text-gray-300 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="12" />
                </svg>
              </button>
            </div>
            <button
              @click="addOption(activeField)"
              class="text-xs font-bold text-[#5855F6] mt-2"
            >
              + Add Option
            </button>
          </div>
        </div>
      </aside>

      <!-- Empty Properties View -->
      <aside
        v-else
        class="studio-sidebar border-l border-r-0 border-gray-200 items-center justify-center text-center"
      >
        <div class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            class="mx-auto mb-4 opacity-20"
          >
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p class="text-xs font-bold uppercase tracking-widest">
            No Selection
          </p>
          <p class="text-[11px] mt-1 max-w-[150px] mx-auto">
            Select a field on the canvas to edit its properties.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// State
const currentFormId = ref("");
const formLoaded = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const activeFieldIndex = ref(null);

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
  const urlParams = new URLSearchParams(window.location.search);
  let idFromUrl = urlParams.get("id");

  if (!idFromUrl) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (pathParts.includes("edit")) {
      const editIndex = pathParts.indexOf("edit");
      if (pathParts[editIndex + 1]) idFromUrl = pathParts[editIndex + 1];
    }
  }

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
      `http://localhost:3000/api/forms/${currentFormId.value}`,
    );
    formData.value = response.data;
    formLoaded.value = true;
  } catch (error) {
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
    successMessage.value = "Changes published!";
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

const addField = () => {
  formData.value.schema.push({
    id: Date.now(),
    label: "New Field",
    type: "text",
    placeholder: "Type here...",
  });
  activeFieldIndex.value = formData.value.schema.length - 1;
};

const removeField = (index) => {
  formData.value.schema.splice(index, 1);
  if (activeFieldIndex.value === index) activeFieldIndex.value = null;
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
</script>

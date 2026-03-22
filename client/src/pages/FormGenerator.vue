<template>
  <div class="max-w-2xl mx-auto my-10 p-6 font-inter">
    <h1 class="text-2xl font-bold text-theme-text mb-2">AI Form Generator</h1>
    <p class="text-theme-muted mb-6">
      Try typing what you want in natural language (e.g.,
      <strong class="font-medium text-theme-text"
        >សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ</strong
      >)
    </p>

    <!-- 🌟 NEW: Login Warning -->
    <div
      v-if="!currentUser"
      class="mb-6 p-4 bg-theme-secondary/10 border-l-4 border-theme-secondary text-theme-secondary rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <p>
        <strong class="font-bold">Notice:</strong> You must be logged in to
        generate forms and use your tokens.
      </p>
      <a
        href="/login"
        class="px-5 py-2 bg-theme-secondary text-white text-sm font-bold rounded-md hover:bg-theme-secondary/90 transition-colors whitespace-nowrap"
        >Log in</a
      >
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="inputText"
        :disabled="!currentUser"
        placeholder="Describe the form you want..."
        class="flex-grow px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow disabled:bg-gray-100 disabled:cursor-not-allowed"
        @keyup.enter="predictMask"
      />
      <button
        @click="predictMask"
        :disabled="isLoading || !currentUser"
        class="px-6 py-2 bg-theme-primary text-white font-medium rounded-md hover:bg-theme-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {{ isLoading ? "Thinking..." : "Generate Form" }}
      </button>
    </div>

    <!-- Show detailed error messages on the screen -->
    <div
      v-if="errorMessage"
      class="mb-6 p-4 bg-theme-error/10 border-l-4 border-theme-error text-theme-error rounded-md"
    >
      <p><strong class="font-bold">Error:</strong> {{ errorMessage }}</p>
    </div>

    <!-- Show prediction result -->
    <div
      v-if="prediction"
      class="mb-6 p-4 bg-theme-primary/10 border-l-4 border-theme-primary text-theme-text rounded-md"
    >
      <p>
        <strong class="font-bold">AI Decoded Intent:</strong> {{ prediction }}
      </p>
    </div>

    <!-- SAFELY render the form fields if the array exists and has items -->
    <div
      v-if="generatedFields?.length > 0"
      class="mt-4 p-6 border border-theme-border rounded-lg bg-white shadow-sm"
    >
      <div
        class="flex items-center justify-between mb-5 pb-3 border-b border-theme-border"
      >
        <h3 class="text-lg font-bold text-theme-text">Live Form Preview</h3>
      </div>

      <form @submit.prevent class="space-y-4">
        <div
          v-for="field in generatedFields"
          :key="field.id"
          class="flex flex-col"
        >
          <label class="mb-1.5 text-sm font-bold text-theme-text">
            {{ field.label }}
          </label>

          <!-- 1. Standard Inputs (text, email, number, password, date) -->
          <input
            v-if="
              ['text', 'email', 'number', 'password', 'date'].includes(
                field.type,
              )
            "
            :type="field.type"
            :placeholder="field.placeholder"
            class="px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow"
          />

          <!-- 2. Textarea for long text -->
          <textarea
            v-else-if="field.type === 'textarea'"
            :placeholder="field.placeholder"
            rows="4"
            class="px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow resize-y"
          ></textarea>

          <!-- 3. Select Dropdown -->
          <select
            v-else-if="field.type === 'select'"
            class="px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow bg-white"
          >
            <option disabled selected value="">Select an option...</option>
            <option
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <!-- 4. Checkbox -->
          <div
            v-else-if="field.type === 'checkbox'"
            class="flex items-center gap-2 mt-1"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-theme-primary rounded border-theme-border focus:ring-theme-primary"
            />
            <span class="text-sm text-theme-text">{{
              field.placeholder || "Yes, I agree"
            }}</span>
          </div>

          <!-- 5. Radio Buttons -->
          <div
            v-else-if="field.type === 'radio'"
            class="flex flex-col gap-2 mt-1"
          >
            <label
              v-for="option in field.options"
              :key="option"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                :name="'radio-' + field.id"
                :value="option"
                class="w-4 h-4 text-theme-primary border-theme-border focus:ring-theme-primary"
              />
              <span class="text-sm text-theme-text">{{ option }}</span>
            </label>
          </div>

          <!-- 6. Fallback (If AI invents an unknown type, just show a text input) -->
          <input
            v-else
            type="text"
            :placeholder="field.placeholder"
            class="px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow"
          />
        </div>

        <button
          type="submit"
          class="w-full mt-4 px-4 py-2 bg-theme-info text-white font-medium rounded-md hover:bg-theme-info/90 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </div>

    <!-- 🌟 NEW: Show Database Success & Shareable Link -->
    <div
      v-if="formId && publicHash"
      class="mt-6 p-5 border border-theme-success/20 bg-theme-success/5 rounded-lg"
    >
      <h4 class="font-bold text-theme-success flex items-center gap-2 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Successfully saved to MongoDB!
      </h4>

      <div class="space-y-2 text-sm text-theme-text">
        <p>
          <span class="font-semibold text-theme-muted w-24 inline-block"
            >Database ID:</span
          >
          <code class="bg-gray-100 px-2 py-0.5 rounded">{{ formId }}</code>
        </p>
        <p>
          <span class="font-semibold text-theme-muted w-24 inline-block"
            >Public Link:</span
          >
          <a
            :href="'/edit/' + publicHash"
            target="_blank"
            class="text-theme-info hover:underline font-medium"
          >
            http://localhost:5173/edit/{{ publicHash }}
          </a>
        </p>
      </div>

      <!-- 🌟 UPDATED: Direct Link to the Editor via Query Parameter -->
      <div class="mt-4 pt-4 border-t border-theme-success/20 flex gap-4">
        <a
          :href="'/edit?id=' + formId"
          class="inline-block text-sm font-bold text-theme-primary hover:text-theme-primary/80 transition-colors"
        >
          Edit Form Settings &rarr;
        </a>
      </div>
    </div>

    <!-- Show message if AI guessed a word we don't have a template for -->
    <div
      v-else-if="prediction && generatedFields?.length === 0"
      class="mt-6 p-4 bg-theme-secondary/10 border-l-4 border-theme-secondary rounded-md"
    >
      <p class="font-medium text-theme-secondary">
        The AI failed to generate fields. Please try asking differently!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// State
const inputText = ref("សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ");
const prediction = ref(null);
const generatedFields = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);

// Variables to store the database response & User
const formId = ref(null);
const publicHash = ref(null);
const currentUser = ref(null);

// Fetch logged-in user on mount
onMounted(() => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) {
    currentUser.value = JSON.parse(storedUserStr);
  }
});

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

    try {
      const response = await axios.post("http://localhost:3000/predict", {
        inputText: inputText.value,
        creator_id: currentUser.value._id,
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
        errorMessage.value =
          error.response.data.error ||
          "Token limit reached. Please upgrade your plan!";
      } else {
        errorMessage.value =
          error.response?.data?.error ||
          "Internal Server Error (500). The Node.js backend failed to connect to Hugging Face or save to the database. Check the terminal.";
      }
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = "Please describe the form you want to build.";
  }
};
</script>

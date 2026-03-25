<template>
  <div class="max-w-2xl mx-auto my-10 p-6  ">
    <h1 class="text-2xl font-bold text-theme-text mb-2">AI Form Generator</h1>
    <p class="text-theme-muted mb-6">
      Try typing what you want in natural language (e.g.,
      <strong class="font-medium text-theme-text">សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ</strong>)
    </p>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="inputText"
        placeholder="Describe the form you want..."
        class="flex-grow px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow"
        @keyup.enter="predictMask"
      />
      <button 
        @click="predictMask" 
        :disabled="isLoading"
        class="px-6 py-2 bg-theme-primary text-white font-medium rounded-md hover:bg-theme-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {{ isLoading ? "Thinking..." : "Generate Form" }}
      </button>
    </div>

    <!-- Show detailed error messages on the screen -->
    <div v-if="errorMessage" class="mb-6 p-4 bg-theme-error/10 border-l-4 border-theme-error text-theme-error rounded-md">
      <p><strong class="font-bold">Error:</strong> {{ errorMessage }}</p>
    </div>

    <!-- Show prediction result -->
    <div v-if="prediction" class="mb-6 p-4 bg-theme-primary/10 border-l-4 border-theme-primary text-theme-text rounded-md">
      <p><strong class="font-bold">AI Decoded Intent:</strong> {{ prediction }}</p>
    </div>

    <!-- SAFELY render the form fields if the array exists and has items -->
    <div v-if="generatedFields?.length > 0" class="mt-4 p-6 border border-theme-border rounded-lg bg-white shadow-sm">
      <h3 class="text-lg font-bold text-theme-text mb-5 pb-3 border-b border-theme-border">Live Form Preview:</h3>
      
      <form @submit.prevent class="space-y-4">
        <div
          v-for="field in generatedFields"
          :key="field.id"
          class="flex flex-col"
        >
          <label class="mb-1.5 text-sm font-bold text-theme-text">{{ field.label }}</label>
          <input 
            :type="field.type" 
            :placeholder="field.placeholder" 
            class="px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text transition-shadow"
          />
        </div>
        
        <button type="submit" class="w-full mt-4 px-4 py-2 bg-theme-info text-white font-medium rounded-md hover:bg-theme-info/90 transition-colors">
          Submit Form
        </button>
      </form>
    </div>

    <!-- Show message if AI guessed a word we don't have a template for -->
    <div
      v-else-if="prediction && generatedFields?.length === 0"
      class="mt-6 p-4 bg-theme-secondary/10 border-l-4 border-theme-secondary rounded-md"
    >
      <p class="font-medium text-theme-secondary">The AI guessed a category, but we don't have a template for it yet!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State
const inputText = ref("សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ");
const prediction = ref(null);
const generatedFields = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);

// Methods
const predictMask = async () => {
  if (inputText.value.trim() !== "") {
    isLoading.value = true;
    prediction.value = null;
    generatedFields.value = [];
    errorMessage.value = null;

    try {
      const response = await axios.post("http://localhost:3000/predict", {
        inputText: inputText.value,
      });

      prediction.value = response.data.prediction;
      generatedFields.value = response.data.fields || [];
    } catch (error) {
      console.error("Error making the API request", error);

      errorMessage.value =
        error.response?.data?.error ||
        "Internal Server Error (500). The Node.js backend failed to connect to Hugging Face. Please check your Node.js terminal for the exact reason.";
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = "Please describe the form you want to build.";
  }
};
</script>
<template>
  <div class="container">
    <h1>AI Form Generator</h1>
    <p>
      Try typing what you want in natural language (e.g.,
      <strong>សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ</strong>)
    </p>

    <div class="input-area">
      <input
        v-model="inputText"
        placeholder="Describe the form you want..."
        class="main-input"
      />
      <button @click="predictMask" :disabled="isLoading">
        {{ isLoading ? "Thinking..." : "Generate Form" }}
      </button>
    </div>

    <!-- Show detailed error messages on the screen -->
    <div v-if="errorMessage" class="error-box">
      <p><strong>Error:</strong> {{ errorMessage }}</p>
    </div>

    <!-- Show prediction result -->
    <div v-if="prediction" class="result-box">
      <p><strong>AI Decoded Intent:</strong> {{ prediction }}</p>
    </div>

    <!-- SAFELY render the form fields if the array exists and has items -->
    <div v-if="generatedFields?.length > 0" class="form-preview">
      <h3>Live Form Preview:</h3>
      <form @submit.prevent>
        <div
          v-for="field in generatedFields"
          :key="field.id"
          class="form-group"
        >
          <label>{{ field.label }}</label>
          <input :type="field.type" :placeholder="field.placeholder" />
        </div>
        <button type="submit" class="submit-btn">Submit Form</button>
      </form>
    </div>

    <!-- Show message if AI guessed a word we don't have a template for -->
    <div
      v-else-if="prediction && generatedFields?.length === 0"
      class="no-template"
    >
      <p>The AI guessed a category, but we don't have a template for it yet!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Set the default test to Khmer!
      inputText: "សូមបង្កើតទម្រង់អាពាហ៍ពិពាហ៍ឱ្យខ្ញុំ",
      prediction: null,
      generatedFields: [],
      isLoading: false,
      errorMessage: null,
    };
  },
  methods: {
    async predictMask() {
      if (this.inputText.trim() !== "") {
        this.isLoading = true;
        this.prediction = null;
        this.generatedFields = [];
        this.errorMessage = null;

        try {
          const response = await axios.post("http://localhost:3000/predict", {
            inputText: this.inputText,
          });

          this.prediction = response.data.prediction;
          this.generatedFields = response.data.fields || [];
        } catch (error) {
          console.error("Error making the API request", error);

          this.errorMessage =
            error.response?.data?.error ||
            "Internal Server Error (500). The Node.js backend failed to connect to Hugging Face. Please check your Node.js terminal for the exact reason.";
        } finally {
          this.isLoading = false;
        }
      } else {
        this.errorMessage = "Please describe the form you want to build.";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.main-input {
  padding: 10px;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #45a049;
}
.error-box {
  margin-bottom: 20px;
  padding: 15px;
  background: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
  color: #d32f2f;
}
.result-box {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}
.form-preview {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
}
.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-btn {
  background-color: #007bff;
  margin-top: 10px;
  width: 100%;
}
.submit-btn:hover {
  background-color: #0056b3;
}
.no-template {
  margin-top: 20px;
  color: #d32f2f;
  font-weight: bold;
}
</style>

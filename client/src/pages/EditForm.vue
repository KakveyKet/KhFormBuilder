<template>
    <div class="max-w-3xl mx-auto my-10 p-6 font-inter">
        <h1 class="text-2xl font-bold text-theme-text mb-6 border-b border-theme-border pb-4">Edit Form Editor</h1>

        <!-- 1. Form ID Fetcher (For testing/standalone usage) -->
        <div v-if="!formLoaded" class="mb-8 p-6 bg-gray-50 border border-theme-border rounded-lg">
            <h2 class="text-lg font-bold text-theme-text mb-2">Load Form</h2>
            <p class="text-theme-muted mb-4 text-sm">Paste your MongoDB form _id here to edit it.</p>
            <div class="flex gap-3">
                <input v-model="formIdInput" placeholder="e.g. 64a7b2... "
                    class="flex-grow px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary text-theme-text" />
                <button @click="fetchForm" :disabled="isLoading"
                    class="px-6 py-2 bg-theme-primary text-white font-medium rounded-md hover:bg-theme-primary/90 transition-colors disabled:opacity-50">
                    {{ isLoading ? "Loading..." : "Fetch Form" }}
                </button>
            </div>
            <p v-if="errorMessage" class="mt-3 text-theme-error text-sm font-medium">{{ errorMessage }}</p>
        </div>

        <!-- 2. The Actual Editor -->
        <div v-else class="space-y-6">

            <!-- Basic Details -->
            <div class="p-6 bg-white border border-theme-border rounded-lg shadow-sm">
                <h3 class="text-lg font-bold text-theme-text mb-4">Form Details</h3>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-theme-text mb-1">Form Title</label>
                        <input v-model="formData.title"
                            class="w-full px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-theme-text mb-1">Description (Internal)</label>
                        <input v-model="formData.description"
                            class="w-full px-4 py-2 border border-theme-border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary" />
                    </div>
                </div>
            </div>

            <!-- Field Editor -->
            <div class="p-6 bg-white border border-theme-border rounded-lg shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-theme-text">Form Fields</h3>
                    <button @click="addField" class="text-sm text-theme-primary font-medium hover:underline">
                        + Add New Field
                    </button>
                </div>

                <div class="space-y-4">
                    <div v-for="(field, index) in formData.schema" :key="index"
                        class="p-4 border border-gray-200 rounded-md bg-gray-50 flex flex-col sm:flex-row gap-4 relative group">
                        <!-- Delete Button -->
                        <button @click="removeField(index)"
                            class="absolute top-2 right-2 text-gray-400 hover:text-theme-error opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <div class="flex-grow">
                            <label class="block text-xs font-bold text-theme-muted uppercase mb-1">Label</label>
                            <input v-model="field.label" class="w-full px-3 py-1.5 border rounded-md text-sm" />
                        </div>

                        <div class="flex-grow">
                            <label class="block text-xs font-bold text-theme-muted uppercase mb-1">Placeholder</label>
                            <input v-model="field.placeholder" class="w-full px-3 py-1.5 border rounded-md text-sm" />
                        </div>

                        <div class="w-full sm:w-32">
                            <label class="block text-xs font-bold text-theme-muted uppercase mb-1">Type</label>
                            <select v-model="field.type" class="w-full px-3 py-1.5 border rounded-md text-sm bg-white">
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                                <option value="password">Password</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center pt-4">
                <button @click="formLoaded = false"
                    class="px-4 py-2 text-theme-muted hover:text-theme-text font-medium">
                    &larr; Back to Load
                </button>

                <button @click="saveChanges" :disabled="isSaving"
                    class="px-8 py-2 bg-theme-success text-white font-medium rounded-md hover:bg-theme-success/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                    <span v-if="!isSaving">Save Changes</span>
                    <span v-else>Saving...</span>
                </button>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage"
                class="p-4 bg-theme-success/10 text-theme-success border border-theme-success/20 rounded-md font-medium text-center">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage && formLoaded"
                class="p-4 bg-theme-error/10 text-theme-error border border-theme-error/20 rounded-md font-medium text-center">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State
const formIdInput = ref('');
const formLoaded = ref(false);
const isLoading = ref(false);
const isSaving = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// The reactive object to hold our form data
const formData = ref({
    _id: '',
    title: '',
    description: '',
    schema: []
});

// Methods
const fetchForm = async () => {
    if (!formIdInput.value.trim()) {
        errorMessage.value = "Please enter a Form ID";
        return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await axios.get(`http://localhost:3000/api/formRoutes/${formIdInput.value}`);
        formData.value = response.data;
        formLoaded.value = true;
    } catch (error) {
        console.error(error);
        errorMessage.value = error.response?.data?.error || "Could not find a form with that ID.";
    } finally {
        isLoading.value = false;
    }
};

const saveChanges = async () => {
    isSaving.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    try {
        const response = await axios.put(`http://localhost:3000/api/formRoutes/${formData.value._id}`, {
            title: formData.value.title,
            description: formData.value.description,
            schema: formData.value.schema
        });

        successMessage.value = "Form updated successfully!";

        // Clear success message after 3 seconds
        setTimeout(() => { successMessage.value = ''; }, 3000);
    } catch (error) {
        console.error(error);
        errorMessage.value = "Failed to save changes.";
    } finally {
        isSaving.value = false;
    }
};

// Field Manipulation
const addField = () => {
    formData.value.schema.push({
        id: Date.now(), // Generate a unique temporary ID
        label: "New Field",
        type: "text",
        placeholder: "Enter details..."
    });
};

const removeField = (index) => {
    formData.value.schema.splice(index, 1);
};
</script>
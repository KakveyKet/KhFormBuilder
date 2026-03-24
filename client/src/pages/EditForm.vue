<template>
  <div class="h-screen w-full flex flex-col bg-[#F8FAFF] font-inter overflow-hidden">

    <!-- ================= TOP TOOLBAR ================= -->
    <header
      class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
      <div class="flex items-center gap-4">
        <a href="/dashboard"
          class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#5855F6] transition-colors">
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

      <div class="flex items-center gap-2 sm:gap-4">
        <span v-if="successMessage"
          class="text-xs font-bold text-emerald-500 flex items-center gap-1 animate-pulse hidden sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          {{ successMessage }}
        </span>

        <!-- 🌟 NEW: Share/Copy Link Button -->
        <button v-if="currentFormId && formLoaded" @click="copyShareLink"
          class="px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span class="hidden sm:inline">Share</span>
        </button>

        <router-link v-if="currentFormId && formLoaded" :to="`/preview/f/${currentFormId}`" target="_blank"
          class="px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span class="hidden sm:inline">Preview</span>
        </router-link>

        <button @click="saveChanges" :disabled="isSaving"
          class="px-4 sm:px-5 py-2 bg-[#5855F6] text-white text-sm font-bold rounded-lg hover:bg-[#4338CA] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2">
          <svg v-if="isSaving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span>{{ isSaving ? "Saving..." : "Publish" }}</span>
        </button>
      </div>
    </header>

    <!-- ================= MAIN STUDIO LAYOUT ================= -->
    <div class="flex-1 flex overflow-hidden">

      <!-- LEFT SIDEBAR: Elementor-Style Palette -->
      <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col hidden md:flex">
        <!-- Settings Block -->
        <div class="p-5 border-b border-gray-100 flex-shrink-0">
          <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Form Details</label>
          <div class="space-y-3">
            <input v-model="formData.title"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all"
              placeholder="Form Title" />
            <textarea v-model="formData.description"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all h-20 resize-none"
              placeholder="Internal description..."></textarea>
          </div>
        </div>

        <div class="p-5 border-b border-gray-100 flex-shrink-0">
          <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Form Theme</label>
          <div v-if="templates.length === 0" class="text-xs text-gray-400 animate-pulse">Loading themes...</div>
          <div v-else class="grid grid-cols-2 gap-2">
            <button v-for="tpl in templates" :key="tpl.id" @click="formData.template_id = tpl.id"
              class="px-2 py-2 border rounded-lg text-[10px] font-bold transition-all truncate"
              :class="formData.template_id === tpl.id ? 'bg-[#5855F6]/10 border-[#5855F6]/30 text-[#5855F6] ring-1 ring-[#5855F6]' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'"
              :title="tpl.name">
              {{ tpl.name }}
            </button>
          </div>
        </div>

        <!-- Draggable Elements Palette -->
        <div class="flex-1 overflow-y-auto p-5 bg-gray-50/50">
          <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Components</label>
          <p class="text-[11px] text-gray-400 mb-4 leading-tight">Drag and drop elements into your canvas.</p>

          <draggable :list="paletteElements" :group="{ name: 'form-builder', pull: 'clone', put: false }"
            :clone="cloneElement" :sort="false" class="grid grid-cols-2 gap-3">
            <div v-for="element in paletteElements" :key="element.type"
              class="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-xl cursor-grab hover:border-[#5855F6] hover:bg-[#5855F6]/5 hover:text-[#5855F6] transition-all shadow-sm group"
              :title="`Drag ${element.label} to form`">
              <span v-html="getFieldIcon(element.type)"
                class="w-6 h-6 text-gray-500 group-hover:text-[#5855F6] mb-2 transition-colors"></span>
              <span
                class="text-[11px] font-bold text-gray-600 group-hover:text-[#5855F6] text-center transition-colors">{{
                element.label }}</span>
            </div>
          </draggable>
        </div>
      </aside>

      <!-- CENTRAL CANVAS: Form Builder Area -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center scroll-smooth bg-[#F8FAFF]">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <svg class="animate-spin h-8 w-8 text-[#5855F6] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-gray-500 font-medium text-sm">Booting AI Studio...</p>
        </div>

        <!-- Editor Paper with Dynamic Theme Injection -->
        <div v-else-if="formLoaded" :style="activeThemeStyle"
          class="w-full max-w-2xl shadow-xl shadow-gray-200/50 rounded-xl min-h-[800px] border border-[var(--tpl-border)] bg-[var(--tpl-bg)] text-[var(--tpl-text)] relative flex flex-col animate-fade-up transition-colors duration-500 overflow-hidden">

          <!-- Intelligent View Badge -->
          <div
            class="absolute top-0 right-4 sm:right-8 -translate-y-1/2 px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5 z-20"
            style="background-color: var(--tpl-primary);">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Studio View
          </div>

          <!-- Paper Header -->
          <div class="p-6 sm:p-10 pb-6 border-b border-[var(--tpl-border)] flex-shrink-0 relative">
            <!-- 🌟 NEW: Direct link display inside paper -->
            <div class="absolute top-4 right-4 cursor-pointer group" @click="copyShareLink"
              title="Click to copy live link">
              <span
                class="text-[10px] font-mono opacity-40 group-hover:opacity-100 group-hover:text-theme-primary transition-all bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-800">
                Click to copy link
              </span>
            </div>

            <input v-model="formData.title"
              class="w-full mt-4 text-2xl sm:text-3xl font-bold bg-transparent border-none focus:ring-0 p-0 mb-2 outline-none text-[var(--tpl-text)]"
              placeholder="Enter Form Title..." />
            <input v-model="formData.description"
              class="w-full text-sm bg-transparent border-none focus:ring-0 p-0 outline-none opacity-70 text-[var(--tpl-text)]"
              placeholder="Type a description for your users..." />
          </div>

          <!-- Canvas Drop Area Container -->
          <div class="relative flex-1 p-6 sm:p-10 pt-6">

            <div v-if="formData.schema.length === 0"
              class="absolute inset-x-10 top-6 bottom-10 flex flex-col items-center justify-center border-2 border-dashed rounded-xl pointer-events-none"
              style="border-color: var(--tpl-border); background-color: color-mix(in srgb, var(--tpl-text) 3%, transparent);">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                class="mb-3 opacity-30">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p class="font-bold opacity-50">Drag & Drop components here</p>
              <p class="text-xs opacity-40 mt-1">Select an element from the left sidebar.</p>
            </div>

            <!-- Dynamic Fields -->
            <draggable v-if="Array.isArray(formData.schema)" :list="formData.schema" :animation="200"
              group="form-builder" handle=".drag-handle-zone" ghost-class="opacity-40"
              class="relative z-10 min-h-[300px] space-y-3 w-full" @start="activeFieldIndex = null"
              @change="onCanvasChange">
              <div v-for="(element, index) in formData.schema" :key="element.id || index"
                class="relative flex items-center gap-3 p-3 sm:p-4 border rounded-xl transition-all cursor-pointer group"
                :class="activeFieldIndex === index ? 'border-transparent shadow-sm' : 'border-[var(--tpl-border)] bg-[var(--tpl-bg)]'"
                :style="activeFieldIndex === index ? 'box-shadow: 0 0 0 2px var(--tpl-primary); background-color: color-mix(in srgb, var(--tpl-primary) 5%, transparent);' : ''"
                @click="activeFieldIndex = index">
                <!-- Drag Handle Icon -->
                <div
                  class="drag-handle-zone cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 p-1 -ml-2 hidden sm:block">
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

                <!-- Visual Component Icon -->
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm flex-shrink-0 transition-colors"
                  :style="activeFieldIndex === index ? 'color: var(--tpl-primary); border-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent); background-color: var(--tpl-bg);' : 'color: #9ca3af; background-color: var(--tpl-bg); border-color: var(--tpl-border);'">
                  <span v-html="getFieldIcon(element.type)"></span>
                </div>

                <!-- Field Content (Mock UI) -->
                <div class="flex-1 flex flex-col gap-1.5 pointer-events-none min-w-0">
                  <label class="text-sm font-bold truncate" style="color: var(--tpl-text);">{{ element.label ||
                    "Untitled Field" }}</label>

                  <div class="px-3 py-2 border rounded-md text-sm truncate flex items-center opacity-70"
                    style="background-color: color-mix(in srgb, var(--tpl-text) 5%, var(--tpl-bg)); border-color: var(--tpl-border); color: var(--tpl-text);">
                    <template v-if="element.type === 'checkbox'">Check to agree</template>
                    <template v-else-if="element.type === 'color'">
                      <div class="w-4 h-4 rounded mr-2 flex-shrink-0" style="background-color: var(--tpl-primary);">
                      </div>Pick a color
                    </template>
                    <template v-else-if="element.type === 'file'">
                      <div class="border px-2 py-0.5 rounded text-xs mr-2 font-bold shadow-sm"
                        style="background-color: var(--tpl-bg); border-color: var(--tpl-border); color: var(--tpl-text);">
                        Choose File</div>No file chosen
                    </template>
                    <template v-else-if="element.type === 'range'">
                      <input type="range" class="w-full pointer-events-none opacity-50"
                        style="accent-color: var(--tpl-primary);" />
                    </template>
                    <template v-else>{{ element.placeholder || "Input field preview..." }}</template>
                  </div>
                </div>

                <!-- Delete Action -->
                <div
                  class="absolute top-3 right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button @click.stop="removeField(index)"
                    class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                    title="Remove Component">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </draggable>
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
          <p class="text-gray-500 mb-6">{{ errorMessage || "Could not find a valid form ID." }}</p>
          <router-link to="/dashboard" class="px-6 py-2.5 bg-[#5855F6] text-white font-bold rounded-lg shadow-sm">Return
            to
            Hub</router-link>
        </div>
      </main>

      <!-- RIGHT SIDEBAR: Field Properties Inspector -->
      <aside class="w-72 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto hidden lg:block">
        <div v-if="activeField" class="p-6">
          <label
            class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <span v-html="getFieldIcon(activeField.type)" class="text-[#5855F6] w-4 h-4"></span>
            Inspector
          </label>

          <div class="space-y-5">
            <div>
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Label Text</label>
              <input v-model="activeField.label"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all" />
            </div>

            <div v-if="!['checkbox', 'color', 'range', 'file'].includes(activeField.type)">
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Input Placeholder</label>
              <input v-model="activeField.placeholder"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all" />
            </div>

            <!-- Component Type Dropdown -->
            <div class="relative">
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Component Type</label>
              <div @click="isTypeDropdownOpen = !isTypeDropdownOpen"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm flex items-center justify-between cursor-pointer hover:bg-white transition-all"
                :class="isTypeDropdownOpen ? 'ring-2 ring-[#5855F6] bg-white' : ''">
                <div class="flex items-center gap-2 text-gray-700 truncate">
                  <span v-html="getFieldIcon(activeField.type)" class="w-4 h-4 text-[#5855F6] flex-shrink-0"></span>
                  <span class="font-medium truncate">{{ getFieldLabel(activeField.type) }}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-gray-400 transition-transform flex-shrink-0 ml-2"
                  :class="isTypeDropdownOpen ? 'rotate-180' : ''">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              <div v-if="isTypeDropdownOpen" @click="isTypeDropdownOpen = false" class="fixed inset-0 z-10"></div>

              <div v-if="isTypeDropdownOpen"
                class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto py-1">
                <div v-for="group in fieldTypes" :key="group.group">
                  <div
                    class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/80 sticky top-0 backdrop-blur-sm z-10">
                    {{ group.group }}</div>
                  <div v-for="item in group.items" :key="item.value" @click="selectType(item.value)"
                    class="px-3 py-2 text-[13px] flex items-center gap-3 cursor-pointer transition-colors"
                    :class="activeField.type === item.value ? 'bg-[#5855F6]/10 text-[#5855F6] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'">
                    <span v-html="getFieldIcon(item.value)" class="w-4 h-4 flex-shrink-0"
                      :class="activeField.type === item.value ? 'text-[#5855F6]' : 'text-gray-400'"></span>
                    <span class="truncate">{{ item.label }}</span>
                    <svg v-if="activeField.type === item.value" xmlns="http://www.w3.org/2000/svg" width="14"
                      height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                      stroke-linecap="round" stroke-linejoin="round" class="ml-auto text-[#5855F6] flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="['select', 'radio'].includes(activeField.type)" class="mt-8 pt-6 border-t border-gray-100">
            <label class="block text-[11px] font-bold text-gray-500 mb-3">Choice Options</label>
            <div class="space-y-2">
              <div v-for="(opt, oIdx) in activeField.options" :key="oIdx" class="flex gap-2">
                <input v-model="activeField.options[oIdx]"
                  class="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm focus:border-[#5855F6] outline-none transition-colors" />
                <button @click="removeOption(activeField, oIdx)"
                  class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                  title="Remove Option">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="12" />
                  </svg>
                </button>
              </div>
              <button @click="addOption(activeField)"
                class="w-full mt-2 py-2 border border-dashed border-[#5855F6]/30 text-[#5855F6] text-xs font-bold rounded-md hover:bg-[#5855F6]/5 transition-colors">
                + Add Option
              </button>
            </div>
          </div>
        </div>

        <div v-else class="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1" class="mb-4 opacity-30">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p class="text-xs font-bold uppercase tracking-widest text-gray-300">No Selection</p>
          <p class="text-[11px] mt-2 max-w-[180px] leading-relaxed">Select a component on the canvas to edit its
            properties.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { VueDraggableNext as draggable } from "vue-draggable-next";

const route = useRoute();

// --- State ---
const currentFormId = ref("");
const currentUser = ref(null);
const formLoaded = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const activeFieldIndex = ref(null);

// Templates State
const templates = ref([]);

const formData = ref({
  _id: "",
  title: "",
  description: "",
  template_id: "minimal-light", // Default Theme
  schema: [],
});

// Compute Dynamic CSS Variables based on the selected theme
const activeThemeStyle = computed(() => {
  const themeId = formData.value.template_id || 'minimal-light';
  const theme = templates.value.find(t => t.id === themeId) || {
    colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" },
    font: "Inter"
  };

  return {
    '--tpl-primary': theme.colors?.primary || '#5855F6',
    '--tpl-bg': theme.colors?.bg || '#FFFFFF',
    '--tpl-text': theme.colors?.text || '#0F172A',
    '--tpl-border': theme.colors?.border || '#E2E8F0',
    fontFamily: theme.font === 'custom' ? 'Inter, sans-serif' : `"${theme.font}", sans-serif`
  };
});

// --- Lifecycle & Fetching ---
onMounted(async () => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) currentUser.value = JSON.parse(storedUserStr);

  // Fetch Allowed Templates based on user
  if (currentUser.value) {
    try {
      const templateRes = await axios.get(`http://localhost:3000/api/templates?userId=${currentUser.value._id}`);
      templates.value = templateRes.data;
    } catch (err) {
      console.warn("Failed to load templates from API, using fallbacks.", err);
      templates.value = [
        { id: "minimal-light", name: "Minimal Light" },
        { id: "classic-blue", name: "Classic Blue" },
        { id: "nature-green", name: "Nature Green" },
        { id: "warm-orange", name: "Warm Orange" },
        { id: "soft-pink", name: "Soft Pink" }
      ];
    }
  }

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
    const response = await axios.get(`http://localhost:3000/api/forms/${currentFormId.value}`);
    formData.value = response.data;

    // Ensure template_id is initialized if it's missing from DB
    if (!formData.value.template_id) formData.value.template_id = "minimal-light";

    if (!Array.isArray(formData.value.schema)) formData.value.schema = [];
    formLoaded.value = true;
    if (formData.value.schema.length > 0) activeFieldIndex.value = 0;
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Form not found.";
    formLoaded.value = false;
  } finally {
    isLoading.value = false;
  }
};

// 🌟 NEW: Copy Link Function
const copyShareLink = () => {
  if (!currentFormId.value) return;
  const link = `${window.location.origin}/preview/f/${currentFormId.value}`;

  // Safe way to copy to clipboard handling iframe limitations
  const el = document.createElement('textarea');
  el.value = link;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  successMessage.value = "Link copied to clipboard!";
  setTimeout(() => { successMessage.value = ""; }, 3000);
};

const saveChanges = async () => {
  isSaving.value = true;
  successMessage.value = "";
  try {
    await axios.put(`http://localhost:3000/api/forms/${formData.value._id}`, {
      title: formData.value.title,
      description: formData.value.description,
      template_id: formData.value.template_id,
      schema: formData.value.schema,
    });
    successMessage.value = "Saved successfully!";
    setTimeout(() => { successMessage.value = ""; }, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

// ... Drag & Drop, Field Types, and getFieldIcon logic below remains exactly the same
const draggedIndex = ref(null);
const activeField = computed(() => {
  if (activeFieldIndex.value === null) return null;
  return formData.value.schema[activeFieldIndex.value];
});

const paletteElements = [
  { type: "text", label: "Short Text", placeholder: "Type text here..." },
  { type: "textarea", label: "Long Text", placeholder: "Type paragraph here..." },
  { type: "email", label: "Email Address", placeholder: "email@example.com" },
  { type: "number", label: "Number", placeholder: "0" },
  { type: "select", label: "Dropdown", options: ["Option 1", "Option 2"] },
  { type: "radio", label: "Radio Buttons", options: ["Option 1", "Option 2"] },
  { type: "checkbox", label: "Checkbox", placeholder: "Check me" },
  { type: "date", label: "Date Picker", placeholder: "" },
  { type: "file", label: "File Upload", placeholder: "" },
  { type: "color", label: "Color Picker", placeholder: "" },
];

const cloneElement = (element) => {
  return {
    ...JSON.parse(JSON.stringify(element)),
    id: `f-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  };
};

const onCanvasChange = (evt) => {
  if (evt.added) {
    activeFieldIndex.value = evt.added.newIndex;
  }
};

const isTypeDropdownOpen = ref(false);
const fieldTypes = [
  { group: "Text Inputs", items: [{ value: "text", label: "Short Text" }, { value: "textarea", label: "Long Text" }, { value: "email", label: "Email Address" }, { value: "tel", label: "Phone Number" }, { value: "url", label: "Website URL" }, { value: "password", label: "Password" }] },
  { group: "Numeric & Data", items: [{ value: "number", label: "Numeric Value" }, { value: "range", label: "Slider (Range)" }, { value: "file", label: "File Upload" }, { value: "color", label: "Color Picker" }] },
  { group: "Date & Time", items: [{ value: "date", label: "Date Picker" }, { value: "time", label: "Time Picker" }, { value: "datetime-local", label: "Date & Time" }] },
  { group: "Choices", items: [{ value: "select", label: "Selection Dropdown" }, { value: "radio", label: "Choice Buttons" }, { value: "checkbox", label: "Toggle/Check" }] },
];

const getFieldLabel = (type) => {
  for (const group of fieldTypes) {
    const found = group.items.find((item) => item.value === type);
    if (found) return found.label;
  }
  return "Unknown Component";
};

const selectType = (typeValue) => {
  if (!activeField.value) return;
  activeField.value.type = typeValue;
  handleTypeChange(activeField.value);
  isTypeDropdownOpen.value = false;
};

const removeField = (index) => {
  formData.value.schema.splice(index, 1);
  if (activeFieldIndex.value === index) activeFieldIndex.value = null;
  else if (activeFieldIndex.value > index) activeFieldIndex.value--;
};

const handleTypeChange = (field) => {
  if (["select", "radio"].includes(field.type)) {
    if (!field.options || field.options.length === 0) field.options = ["Option 1", "Option 2"];
  }
};

const addOption = (field) => {
  if (!field.options) field.options = [];
  field.options.push(`Option ${field.options.length + 1}`);
};

const removeOption = (field, optIndex) => {
  field.options.splice(optIndex, 1);
};

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

const getFieldIcon = (type) => {
  const icons = {
    text: `<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>`,
    textarea: `<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="12" y1="18" y2="18"/>`,
    email: `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m2 7 10 7 10-7"/>`,
    tel: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    url: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
    password: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    number: `<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>`,
    range: `<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>`,
    file: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>`,
    color: `<path d="m12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`,
    date: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>`,
    time: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    "datetime-local": `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>`,
    select: `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 10 4 4 4-4"/>`,
    radio: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>`,
    checkbox: `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>`,
  };

  const svgPaths = icons[type] || `<circle cx="12" cy="12" r="10"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${svgPaths}</svg>`;
};
</script>
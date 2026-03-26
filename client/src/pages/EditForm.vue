<template>
  <div class="h-screen w-full flex flex-col bg-[#F8FAFF] overflow-hidden">

    <!-- ================= TOP TOOLBAR ================= -->
    <header
      class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-sm">
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

        <button v-if="currentFormId && formLoaded" @click="copyShareLink"
          class="px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span class="hidden sm:inline">Share</span>
        </button>

        <router-link v-if="currentFormId && formLoaded" :to="`/public/${currentFormId}`" target="_blank"
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

      <!-- LEFT SIDEBAR -->
      <aside
        class="w-[300px] bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto hidden md:block relative z-10 pb-10">

        <div class="p-5 border-b border-gray-100 space-y-5">
          <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Form Content</label>

          <!-- Cover Image Upload -->
          <div class="space-y-2 pb-4 border-b border-gray-100">
            <label class="block text-[12px] font-bold text-gray-600">Cover Image</label>
            <input type="file" accept="image/*" @change="handleCoverUpload"
              class="w-full text-xs cursor-pointer file:mr-2 file:py-1.5 file:px-3 file:border-0 file:rounded-md file:text-xs file:font-bold file:bg-[#5855F6]/10 file:text-[#5855F6] hover:file:bg-[#5855F6]/20 transition-all" />

            <div v-if="formData.cover_image && formData.cover_image.url"
              class="flex items-center justify-between bg-gray-50 p-2 rounded-md mt-2 border border-gray-200">
              <div class="flex items-center gap-2 truncate">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 flex-shrink-0" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span class="text-[11px] font-medium text-gray-600 truncate">{{ formData.cover_image.name }}</span>
              </div>
              <button @click="removeCoverImage" class="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Remove Cover">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Header Attachment Upload -->
          <div class="space-y-2 pb-4 border-b border-gray-100">
            <label class="block text-[12px] font-bold text-gray-600">Header Attachment (Logo/Doc)</label>
            <input type="file" @change="handleHeaderUpload"
              class="w-full text-xs cursor-pointer file:mr-2 file:py-1.5 file:px-3 file:border-0 file:rounded-md file:text-xs file:font-bold file:bg-[#5855F6]/10 file:text-[#5855F6] hover:file:bg-[#5855F6]/20 transition-all" />

            <div v-if="formData.header_file && formData.header_file.url"
              class="flex items-center justify-between bg-gray-50 p-2 rounded-md mt-2 border border-gray-200">
              <div class="flex items-center gap-2 truncate">
                <svg v-if="formData.header_file.type === 'image'" xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 flex-shrink-0" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span class="text-[11px] font-medium text-gray-600 truncate">{{ formData.header_file.name }}</span>
              </div>
              <button @click="removeHeaderFile" class="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Remove Attachment">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Title Section -->
          <div class="space-y-2">
            <input v-model="formData.title"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all"
              placeholder="Form Title" />

            <div v-if="formData.typography"
              class="flex items-center gap-1 p-1 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
              <button @click="toggleStyle('title', 'weight', 'bold', 'normal')"
                :class="formData.typography.title.weight === 'bold' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                  <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                </svg>
              </button>
              <button @click="toggleStyle('title', 'style', 'italic', 'normal')"
                :class="formData.typography.title.style === 'italic' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Italic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="4" x2="10" y2="4" />
                  <line x1="14" y1="20" x2="5" y2="20" />
                  <line x1="15" y1="4" x2="9" y2="20" />
                </svg>
              </button>
              <button @click="toggleStyle('title', 'decoration', 'underline', 'none')"
                :class="formData.typography.title.decoration === 'underline' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Underline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                  <line x1="4" y1="21" x2="20" y2="21" />
                </svg>
              </button>

              <div class="w-px h-4 bg-gray-300 mx-1"></div>

              <button @click="formData.typography.title.align = 'left'"
                :class="formData.typography.title.align === 'left' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                  <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
              </button>
              <button @click="formData.typography.title.align = 'center'"
                :class="formData.typography.title.align === 'center' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </button>
              <button @click="formData.typography.title.align = 'right'"
                :class="formData.typography.title.align === 'right' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </button>

              <div class="w-px h-4 bg-gray-300 mx-1"></div>

              <div
                class="relative flex items-center justify-center w-6 h-6 rounded cursor-pointer overflow-hidden border border-gray-200 ml-1"
                title="Text Color">
                <input type="color" v-model="formData.typography.title.color"
                  class="absolute -inset-2 w-10 h-10 cursor-pointer" />
              </div>
              <button v-if="formData.typography.title.color" @click="formData.typography.title.color = ''"
                title="Reset Color to Theme Default" class="p-1 text-gray-400 hover:text-red-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Description Section -->
          <div class="space-y-2 mt-4">
            <textarea v-model="formData.description"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all h-20 resize-none"
              placeholder="Internal description..."></textarea>

            <div v-if="formData.typography"
              class="flex items-center gap-1 p-1 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
              <button @click="toggleStyle('description', 'weight', 'bold', 'normal')"
                :class="formData.typography.description.weight === 'bold' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                  <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                </svg>
              </button>
              <button @click="toggleStyle('description', 'style', 'italic', 'normal')"
                :class="formData.typography.description.style === 'italic' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Italic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="4" x2="10" y2="4" />
                  <line x1="14" y1="20" x2="5" y2="20" />
                  <line x1="15" y1="4" x2="9" y2="20" />
                </svg>
              </button>
              <button @click="toggleStyle('description', 'decoration', 'underline', 'none')"
                :class="formData.typography.description.decoration === 'underline' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Underline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                  <line x1="4" y1="21" x2="20" y2="21" />
                </svg>
              </button>

              <div class="w-px h-4 bg-gray-300 mx-1"></div>

              <button @click="formData.typography.description.align = 'left'"
                :class="formData.typography.description.align === 'left' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                  <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
              </button>
              <button @click="formData.typography.description.align = 'center'"
                :class="formData.typography.description.align === 'center' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </button>
              <button @click="formData.typography.description.align = 'right'"
                :class="formData.typography.description.align === 'right' ? 'bg-white shadow text-[#5855F6]' : 'text-gray-500 hover:bg-gray-200'"
                class="p-1.5 rounded transition-all" title="Align Right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              </button>

              <div class="w-px h-4 bg-gray-300 mx-1"></div>

              <div
                class="relative flex items-center justify-center w-6 h-6 rounded cursor-pointer overflow-hidden border border-gray-200 ml-1"
                title="Text Color">
                <input type="color" v-model="formData.typography.description.color"
                  class="absolute -inset-2 w-10 h-10 cursor-pointer" />
              </div>
              <button v-if="formData.typography.description.color" @click="formData.typography.description.color = ''"
                title="Reset Color to Theme Default" class="p-1 text-gray-400 hover:text-red-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="p-5 border-b border-gray-100">
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

        <!-- Draggable Elements Palette (Always sits at the bottom of the scroll flow) -->
        <div class="p-5 bg-gray-50/50 border-t border-gray-100 h-full">
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

      <!-- CENTRAL CANVAS -->
      <main
        class="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start scroll-smooth bg-[#F8FAFF] relative z-0">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 mt-20">
          <svg class="animate-spin h-8 w-8 text-[#5855F6] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-gray-500 font-medium text-sm">Booting AI Studio...</p>
        </div>

        <!-- Editor Paper -->
        <div v-else-if="formLoaded" :style="activeThemeStyle"
          class="w-full max-w-2xl shadow-xl shadow-gray-200/50 rounded-xl min-h-[800px] border border-[var(--tpl-border)] bg-[var(--tpl-bg)] text-[var(--tpl-text)] relative flex flex-col animate-fade-up transition-colors duration-500 overflow-hidden mb-12">

          <!-- Cover Image Display in Editor -->
          <div v-if="formData.cover_image && formData.cover_image.url"
            class="w-full h-32 sm:h-48 lg:h-56 relative border-b flex-shrink-0"
            style="border-color: var(--tpl-border);">
            <img :src="formData.cover_image.url" class="w-full h-full object-cover" />
          </div>

          <!-- Paper Header -->
          <div class="p-6 sm:p-10 pb-6 border-b border-[var(--tpl-border)] flex-shrink-0 relative">
            <div class="absolute top-4 right-4 cursor-pointer group" @click="copyShareLink"
              title="Click to copy live link">
              <span
                class="text-[10px] font-mono opacity-40 group-hover:opacity-100 group-hover:text-theme-primary transition-all bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-800">
                Click to copy link
              </span>
            </div>

            <!-- Dynamic Header Attachment Display in Editor -->
            <div v-if="formData.header_file && formData.header_file.url" class="mb-6 flex"
              :style="{ justifyContent: formData.typography?.title?.align || 'left' }">
              <img v-if="formData.header_file.type === 'image'" :src="formData.header_file.url"
                class="max-h-24 object-contain rounded-md shadow-sm border border-gray-100" />
              <a v-else :href="formData.header_file.url" :download="formData.header_file.name"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-all shadow-sm hover:shadow-md"
                style="border-color: var(--tpl-primary); color: var(--tpl-primary); background-color: color-mix(in srgb, var(--tpl-primary) 5%, transparent);">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {{ formData.header_file.name }}
              </a>
            </div>

            <!-- Dynamic Canvas Title applying typography styles -->
            <input v-if="formData.typography" v-model="formData.title"
              class="w-full mt-2 text-2xl sm:text-3xl bg-transparent border-none focus:ring-0 p-0 mb-2 outline-none"
              :style="{
                color: formData.typography.title.color || 'var(--tpl-text)',
                textAlign: formData.typography.title.align,
                textDecoration: formData.typography.title.decoration,
                fontWeight: formData.typography.title.weight,
                fontStyle: formData.typography.title.style
              }" placeholder="Enter Form Title..." />

            <!-- Dynamic Canvas Description applying typography styles -->
            <textarea v-if="formData.typography" v-model="formData.description"
              class="w-full text-[15px] bg-transparent border-none focus:ring-0 p-0 outline-none resize-none overflow-hidden"
              :style="{
                color: formData.typography.description.color || 'var(--tpl-text)',
                textAlign: formData.typography.description.align,
                textDecoration: formData.typography.description.decoration,
                fontWeight: formData.typography.description.weight,
                fontStyle: formData.typography.description.style,
                opacity: formData.typography.description.color ? 1 : 0.75
              }" rows="2" placeholder="Type a description for your users..."></textarea>
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
              class="relative z-10 min-h-[300px] space-y-3 w-full pb-10" @start="activeFieldIndex = null"
              @change="onCanvasChange">
              <div v-for="(element, index) in formData.schema" :key="element.id || index"
                class="relative flex items-center gap-3 p-3 sm:p-4 border rounded-xl transition-all cursor-pointer group"
                :class="[
                  activeFieldIndex === index ? 'border-transparent shadow-sm' : 'border-[var(--tpl-border)] bg-[var(--tpl-bg)]',
                  element.type === 'page-break' ? 'border-dashed border-2 py-6' : ''
                ]"
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

                <!-- Visual Component Icon (Hidden for Page Break to look cleaner) -->
                <div v-if="element.type !== 'page-break'"
                  class="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm flex-shrink-0 transition-colors"
                  :style="activeFieldIndex === index ? 'color: var(--tpl-primary); border-color: color-mix(in srgb, var(--tpl-primary) 30%, transparent); background-color: var(--tpl-bg);' : 'color: #9ca3af; background-color: var(--tpl-bg); border-color: var(--tpl-border);'">
                  <span v-html="getFieldIcon(element.type)"></span>
                </div>

                <!-- Field Content (Mock UI) -->
                <div class="flex-1 flex flex-col gap-1.5 pointer-events-none min-w-0">

                  <!-- 🌟 Page Break Layout -->
                  <div v-if="element.type === 'page-break'" class="w-full py-2 flex items-center gap-4">
                    <div class="h-px flex-1 opacity-50" style="background-color: var(--tpl-text);"></div>
                    <span class="text-xs font-bold uppercase tracking-widest px-2"
                      style="color: var(--tpl-primary);">Step Break: {{ element.label || 'Next Page' }}</span>
                    <div class="h-px flex-1 opacity-50" style="background-color: var(--tpl-text);"></div>
                  </div>

                  <!-- Standard Field Layout -->
                  <template v-else>
                    <label class="text-sm font-bold truncate" style="color: var(--tpl-text);">
                      {{ element.label || "Untitled Field" }}
                      <span v-if="element.required" class="text-red-500 ml-1">*</span>
                    </label>

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
                  </template>
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

            <!-- Mock Multi-step navigation buttons to preview final layout in Studio -->
            <div class="flex items-center gap-4 mt-6 border-t pt-8 pointer-events-none"
              style="border-color: var(--tpl-border);">
              <div class="w-14 h-14 flex items-center justify-center font-bold rounded-xl shadow-sm flex-shrink-0"
                style="background-color: color-mix(in srgb, var(--tpl-text) 5%, transparent); color: var(--tpl-text);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>

              <div
                class="flex-1 h-14 flex justify-center items-center gap-3 text-white font-bold text-[18px] rounded-xl shadow-md"
                style="background-color: var(--tpl-primary);">
                Next / Submit
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-20 m-auto mt-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Instance Not Found</h2>
          <p class="text-gray-500 mb-6">{{ errorMessage || "Could not find a valid form ID." }}</p>
          <router-link to="/dashboard" class="px-6 py-2.5 bg-[#5855F6] text-white font-bold rounded-lg shadow-sm">Return
            to Hub</router-link>
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
              <!-- 🌟 UPDATED: Dynamic Label for Page Break -->
              <label class="block text-[11px] font-bold text-gray-500 mb-1">
                {{ activeField.type === 'page-break' ? 'Step Title (Next Page)' : 'Label Text' }}
              </label>
              <input v-model="activeField.label"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all" />
            </div>

            <div v-if="!['checkbox', 'color', 'range', 'file', 'page-break'].includes(activeField.type)">
              <label class="block text-[11px] font-bold text-gray-500 mb-1">Input Placeholder</label>
              <input v-model="activeField.placeholder"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-[#5855F6] outline-none transition-all" />
            </div>

            <!-- Component Type Dropdown -->
            <div class="relative" v-if="activeField.type !== 'page-break'">
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

            <!-- Required Field Toggle Switch -->
            <div v-if="activeField.type !== 'page-break'"
              class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <label class="text-[11px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer"
                @click="activeField.required = !activeField.required">
                Required Field
              </label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="activeField.required" class="sr-only peer">
                <div
                  class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5855F6]">
                </div>
              </label>
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
  template_id: "minimal-light",
  typography: {
    title: { align: "left", color: "", decoration: "none", weight: "bold", style: "normal", size: "" },
    description: { align: "left", color: "", decoration: "none", weight: "normal", style: "normal", size: "" }
  },
  header_file: { url: "", name: "", type: "" },
  cover_image: { url: "", name: "" },
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

const toggleStyle = (element, property, activeValue, inactiveValue) => {
  if (formData.value.typography[element][property] === activeValue) {
    formData.value.typography[element][property] = inactiveValue;
  } else {
    formData.value.typography[element][property] = activeValue;
  }
};

const handleCoverUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    formData.value.cover_image = {
      url: event.target.result,
      name: file.name
    };
  };
  reader.readAsDataURL(file);
};

const removeCoverImage = () => {
  formData.value.cover_image = { url: "", name: "" };
};

const handleHeaderUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    formData.value.header_file = {
      url: event.target.result,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document'
    };
  };
  reader.readAsDataURL(file);
};

const removeHeaderFile = () => {
  formData.value.header_file = { url: "", name: "", type: "" };
};

// --- Lifecycle & Fetching ---
onMounted(async () => {
  const storedUserStr = localStorage.getItem("user");
  if (storedUserStr) currentUser.value = JSON.parse(storedUserStr);

  if (currentUser.value) {
    try {
      const templateRes = await axios.get(`http://localhost:3000/api/templateRouter?userId=${currentUser.value._id}`);
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

    if (!formData.value.template_id) formData.value.template_id = "minimal-light";

    if (!formData.value.typography) {
      formData.value.typography = {
        title: { align: "left", color: "", decoration: "none", weight: "bold", style: "normal", size: "" },
        description: { align: "left", color: "", decoration: "none", weight: "normal", style: "normal", size: "" }
      };
    } else {
      if (!formData.value.typography.title) formData.value.typography.title = { align: "left", color: "", decoration: "none", weight: "bold", style: "normal", size: "" };
      if (!formData.value.typography.description) formData.value.typography.description = { align: "left", color: "", decoration: "none", weight: "normal", style: "normal", size: "" };
    }

    if (!formData.value.header_file) formData.value.header_file = { url: "", name: "", type: "" };
    if (!formData.value.cover_image) formData.value.cover_image = { url: "", name: "" };

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

const copyShareLink = () => {
  if (!currentFormId.value) return;
  const link = `${window.location.origin}/public/${currentFormId.value}`;

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
      typography: formData.value.typography,
      header_file: formData.value.header_file,
      cover_image: formData.value.cover_image
    });
    successMessage.value = "Saved successfully!";
    setTimeout(() => { successMessage.value = ""; }, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

const draggedIndex = ref(null);
const activeField = computed(() => {
  if (activeFieldIndex.value === null) return null;
  return formData.value.schema[activeFieldIndex.value];
});

// 🌟 NEW: Added "Page Break" to palette
const paletteElements = [
  { type: "text", label: "Short Text", placeholder: "Type text here...", required: false },
  { type: "textarea", label: "Long Text", placeholder: "Type paragraph here...", required: false },
  { type: "email", label: "Email Address", placeholder: "email@example.com", required: true },
  { type: "number", label: "Number", placeholder: "0", required: false },
  { type: "select", label: "Dropdown", options: ["Option 1", "Option 2"], required: false },
  { type: "radio", label: "Radio Buttons", options: ["Option 1", "Option 2"], required: false },
  { type: "checkbox", label: "Checkbox", placeholder: "Check me", required: false },
  { type: "date", label: "Date Picker", placeholder: "", required: false },
  { type: "file", label: "File Upload", placeholder: "", required: false },
  { type: "color", label: "Color Picker", placeholder: "", required: false },
  { type: "page-break", label: "Page Break", placeholder: "Next Step", required: false }
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

// 🌟 NEW: Added Layout group to dropdown
const fieldTypes = [
  { group: "Text Inputs", items: [{ value: "text", label: "Short Text" }, { value: "textarea", label: "Long Text" }, { value: "email", label: "Email Address" }, { value: "tel", label: "Phone Number" }, { value: "url", label: "Website URL" }, { value: "password", label: "Password" }] },
  { group: "Numeric & Data", items: [{ value: "number", label: "Numeric Value" }, { value: "range", label: "Slider (Range)" }, { value: "file", label: "File Upload" }, { value: "color", label: "Color Picker" }] },
  { group: "Date & Time", items: [{ value: "date", label: "Date Picker" }, { value: "time", label: "Time Picker" }, { value: "datetime-local", label: "Date & Time" }] },
  { group: "Choices", items: [{ value: "select", label: "Selection Dropdown" }, { value: "radio", label: "Choice Buttons" }, { value: "checkbox", label: "Toggle/Check" }] },
  { group: "Layout", items: [{ value: "page-break", label: "Page Break (Multi-Step)" }] }
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
    "page-break": `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 12h16M8 8l-4 4 4 4m8-8l4 4-4 4" />`
  };

  const svgPaths = icons[type] || `<circle cx="12" cy="12" r="10"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${svgPaths}</svg>`;
};
</script>
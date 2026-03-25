<template>
  <div class="ws-layout relative">
    
    <!-- 🌟 NEW: Global Toast Notification for Copying -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-4 opacity-0"
    >
      <div v-if="toastMessage" class="fixed bottom-10 right-10 z-50 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" class="text-emerald-400 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
         <span class="font-bold text-sm">{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Mobile Sidebar Backdrop Overlay -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"></div>

    <!-- ================= SIDEBAR ================= -->
    <aside :class="[
      'ws-sidebar',
      isSidebarOpen
        ? 'translate-x-0 shadow-2xl'
        : '-translate-x-full lg:translate-x-0 lg:shadow-none',
    ]">
      <!-- Mobile Close Button -->
      <button @click="isSidebarOpen = false"
        class="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <!-- Logo Area -->
      <div class="ws-sidebar-logo">
        <a href="/" class="ws-logo-link group">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="transition-transform group-hover:scale-105">
            <rect width="32" height="32" rx="8" fill="#5855F6" />
            <circle cx="16" cy="16" r="6" fill="white" />
          </svg>
          <span class="ws-logo-text">លំហ.AI</span>
        </a>
      </div>

      <!-- Create Button (Primary CTA) -->
      <div class="px-4 py-6">
        <a href="/generate" class="btn-ws-create group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            class="transition-transform group-hover:rotate-90">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create Form</span>
        </a>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="ws-sidebar-nav">
        <a href="#" class="ws-nav-link active">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          workspace
        </a>
        <a href="#" class="ws-nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Templates
        </a>
        <a href="/profile" class="ws-nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </a>
      </nav>

      <!-- User Plan Info at Bottom -->
      <div class="ws-sidebar-footer">
        <div class="ws-plan-card">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-bold text-gray-900">{{
                userPlanName
              }}</span>
            </div>
            <span
              class="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">{{
              tokensRemaining }} Left</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-[#5855F6] to-[#F0428A] h-1.5 rounded-full transition-all duration-1000"
              :style="{ width: tokenPercentage + '%' }"></div>
          </div>
        </div>
      </div>
    </aside>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="ws-main">
      <!-- Top Navigation -->
      <header class="ws-top-nav">
        <div class="flex items-center flex-1 gap-3 sm:gap-6">
          <button @click="isSidebarOpen = true"
            class="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div class="ws-search-container">
            <div class="ws-search-wrapper group">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                class="text-gray-400 group-focus-within:text-[#5855F6] transition-colors">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input type="text" placeholder="Search your forms..." class="ws-search-input" />
              <div class="hidden md:flex items-center gap-1 opacity-50">
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-sans font-bold text-gray-500">⌘</kbd>
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-sans font-bold text-gray-500">K</kbd>
              </div>
            </div>
          </div>
        </div>

        <div class="ws-top-actions">
          <button class="ws-icon-btn hidden sm:flex" title="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
          <div @click="goToProfile"
            class="ws-user-avatar shadow-sm cursor-pointer hover:ring-2 hover:ring-theme-primary transition-all">
            {{ userInitial }}
          </div>
        </div>
      </header>

      <!-- Scrollable Workspace Area -->
      <div class="ws-content">
        <div class="ws-section-header">
          <div class="mb-4 sm:mb-0">
            <h1 class="ws-section-title">My Workspace</h1>
            <p class="ws-section-subtitle">
              Manage, edit, and track your AI-generated forms.
            </p>
          </div>
          <button class="ws-filter-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21 16-4 4-4-4" />
              <path d="M17 20V4" />
              <path d="m3 8 4-4 4 4" />
              <path d="M7 4v16" />
            </svg>
            Sort by Recent
          </button>
        </div>

        <!-- Quick Insights Row -->
        <div class="ws-quick-stats">
          <div class="ws-stat-card">
            <div class="ws-stat-icon bg-indigo-50 text-[#5855F6]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <p class="ws-stat-label">Total Forms</p>
              <p class="ws-stat-value">{{ forms.length }}</p>
            </div>
          </div>

          <div class="ws-stat-card">
            <div class="ws-stat-icon bg-emerald-50 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <p class="ws-stat-label">Total Responses</p>
              <p class="ws-stat-value">1,204</p>
            </div>
          </div>

          <div class="ws-stat-card">
            <div class="ws-stat-icon bg-amber-50 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="M12 16V8" />
              </svg>
            </div>
            <div>
              <p class="ws-stat-label">Completion Rate</p>
              <p class="ws-stat-value">86%</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="ws-loader-container">
          <div class="ws-spinner"></div>
          <p class="text-sm font-bold text-gray-400 mt-4 animate-pulse">
            Loading workspace...
          </p>
        </div>

        <!-- Empty State -->
        <div v-else-if="forms.length === 0" class="ws-empty-state">
          <div
            class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-8 border-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-[#5855F6]">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">
            No forms created yet
          </h3>
          <p class="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Generate your first form using plain text in our AI studio.
          </p>
          <a href="/generate" class="btn-ws-create mx-auto !shadow-md">
            Start Generating &rarr;
          </a>
        </div>

        <!-- Form Grid -->
        <div v-else class="ws-grid">
          <div v-for="(form, index) in forms" :key="form._id" class="ws-card group">
            <!-- CSS Mini-Form Thumbnail -->
            <div class="ws-card-preview" :class="getCardColor(index)">
              <div class="ws-mini-form">
                <div class="w-1/2 h-2 bg-gray-200 rounded-full mb-3"></div>
                <div class="w-full h-5 bg-white rounded border border-gray-100 shadow-sm"></div>
                <div class="w-4/5 h-5 bg-white rounded border border-gray-100 shadow-sm"></div>
                <div class="w-1/3 h-5 bg-[#5855F6]/20 rounded border border-[#5855F6]/10 mt-auto"></div>
              </div>
              <div class="ws-card-badge">
                <span class="w-1.5 h-1.5 rounded-full mr-1"
                  :class="form.is_published ? 'bg-emerald-500' : 'bg-gray-400'"></span>
                {{ form.is_published ? "Live" : "Draft" }}
              </div>
            </div>

            <!-- Card Info -->
            <div class="ws-card-info">
              <div class="flex items-start justify-between">
                <div class="flex flex-col overflow-hidden pr-2">
                  <h3 class="ws-card-title truncate w-full" :title="form.title">
                    {{ form.title || "Untitled Form" }}
                  </h3>
                  <div class="ws-card-meta">
                    <span>{{ form.schema?.length || 0 }} fields</span>
                    <span class="mx-1">•</span>
                    <span>Modified recently</span>
                  </div>
                </div>

                <!-- Quick Actions (Hover) -->
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                  
                  <!-- Edit Button -->
                  <button @click="editForm(form._id)"
                    class="p-1.5 text-gray-400 hover:text-theme-primary hover:bg-theme-primary/10 rounded-md transition-colors"
                    title="Edit in Studio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>

                  <!-- 🌟 NEW: Copy Share Link Button -->
                  <button @click="copyShareLink(form._id)"
                    class="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    title="Copy Share Link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </button>

                  <!-- Publish/Unpublish Button -->
                  <button @click="openPublishModal(form)" class="p-1.5 text-gray-400 rounded-md transition-colors"
                    :class="form.is_published
                        ? 'hover:text-orange-500 hover:bg-orange-50'
                        : 'hover:text-emerald-500 hover:bg-emerald-50'
                      " :title="form.is_published ? 'Unpublish Form' : 'Publish Form'
                      ">
                    <svg v-if="form.is_published" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                      stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </button>

                  <!-- Delete Button -->
                  <button @click="openDeleteModal(form._id)"
                    class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Form">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ================= CUSTOM MODALS ================= -->

    <!-- Delete Confirmation Modal -->
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="deleteModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeModals"></div>
        <!-- Modal Content -->
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden">
          <div class="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 3 18 18" />
              <path d="M10 10v4" />
              <path d="m14 14-1-1" />
              <path d="M4 6c0-1.1.9-2 2-2h1c1 0 2 1 2 2" />
              <path d="M15 6c0-1.1.9-2 2-2h1c1 0 2 1 2 2" />
              <path d="M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Form?</h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this form? This action cannot be
            undone and you will lose all collected responses.
          </p>
          <div class="flex items-center gap-3">
            <button @click="closeModals"
              class="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button @click="executeDelete" :disabled="isActionLoading"
              class="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-md shadow-red-500/20 disabled:opacity-50 flex justify-center items-center">
              <svg v-if="isActionLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Publish/Unpublish Confirmation Modal -->
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="publishModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeModals"></div>
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden">
          <!-- Dynamic Icon (Green for Publish, Orange for Unpublish) -->
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" :class="!publishModal.form.is_published
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-orange-100 text-orange-600'
            ">
            <svg v-if="!publishModal.form.is_published" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{
              !publishModal.form.is_published
                ? "Publish Form?"
                : "Unpublish Form?"
            }}
          </h3>
          <p class="text-sm text-gray-500 mb-6">
            {{
              !publishModal.form.is_published
                ? "Publishing this form will make it live and allow anyone with the link to submit responses."
                : "Unpublishing will hide this form. Users will no longer be able to access it or submit responses."
            }}
          </p>
          <div class="flex items-center gap-3">
            <button @click="closeModals"
              class="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button @click="executePublish" :disabled="isActionLoading"
              class="flex-1 px-4 py-2.5 font-bold rounded-xl text-white transition-colors shadow-md disabled:opacity-50 flex justify-center items-center"
              :class="!publishModal.form.is_published
                  ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'
                ">
              <svg v-if="isActionLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span v-else>{{
                !publishModal.form.is_published ? "Publish" : "Unpublish"
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

// Reactive State
const user = ref(null);
const userPlanName = ref("Basic");
const userInitial = ref("U");
const forms = ref([]);
const isLoading = ref(true);
const isSidebarOpen = ref(false);

// 🌟 NEW: Toast Message State
const toastMessage = ref("");

// Modal & Actions State
const isActionLoading = ref(false);
const deleteModal = ref({ isOpen: false, formId: null });
const publishModal = ref({ isOpen: false, form: null });

const tokensRemaining = computed(() => {
  if (!user.value) return 0;
  return Math.max(0, user.value.form_token - user.value.tokens_used);
});

const tokenPercentage = computed(() => {
  if (!user.value || user.value.form_token === 0) return 0;
  return (user.value.tokens_used / user.value.form_token) * 100;
});

const getCardColor = (index) => {
  const colors = [
    "bg-indigo-50/50",
    "bg-emerald-50/50",
    "bg-rose-50/50",
    "bg-amber-50/50",
  ];
  return colors[index % colors.length];
};

onMounted(async () => {
  try {
    const storedUserStr = localStorage.getItem("user");
    if (!storedUserStr) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(storedUserStr);
    userInitial.value = parsedUser.email.charAt(0).toUpperCase();

    const userRes = await axios.get(
      `http://localhost:3000/api/userRoutes/${parsedUser._id}`,
    );
    user.value = userRes.data;
    if (user.value.plan_id) userPlanName.value = "Pro";

    if (user.value.form_ids && user.value.form_ids.length > 0) {
      const formPromises = user.value.form_ids.map(async (formIdRef) => {
        const actualId =
          typeof formIdRef === "object"
            ? formIdRef.$oid || formIdRef._id
            : formIdRef;
        try {
          const response = await axios.get(
            `http://localhost:3000/api/formRoutes/${actualId}`,
          );
          return response.data;
        } catch (err) {
          console.warn(`[Workspace] Form ${actualId} not found in DB. It was likely deleted.`);
          return null;
        }
      });

      const fetchedForms = await Promise.all(formPromises);
      forms.value = fetchedForms.filter((f) => f !== null).reverse();
    }
  } catch (error) {
    console.error("Workspace error:", error);
  } finally {
    isLoading.value = false;
  }
});

const editForm = (id) => {
  window.location.href = `/edit/${id}`;
};

const goToProfile = () => {
  window.location.href = "/profile";
};

// 🌟 NEW: Copy Link Function
const copyShareLink = (id) => {
  const url = `${window.location.origin}/public/f/${id || currentFormId.value}`;
  
  const el = document.createElement('textarea');
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  toastMessage.value = "Live link copied to clipboard!";
  setTimeout(() => { toastMessage.value = ""; }, 3000);
};

// 🌟 MODAL HANDLERS
const closeModals = () => {
  deleteModal.value = { isOpen: false, formId: null };
  publishModal.value = { isOpen: false, form: null };
};

const openDeleteModal = (id) => {
  deleteModal.value = { isOpen: true, formId: id };
};

const openPublishModal = (form) => {
  publishModal.value = { isOpen: true, form: form };
};

const executeDelete = async () => {
  if (!deleteModal.value.formId) return;
  isActionLoading.value = true;

  try {
    await axios.delete(
      `http://localhost:3000/api/formRoutes/${deleteModal.value.formId}`,
    );
    forms.value = forms.value.filter(
      (form) => form._id !== deleteModal.value.formId,
    );
    closeModals();
  } catch (error) {
    console.error("Error deleting form:", error);
  } finally {
    isActionLoading.value = false;
  }
};

const executePublish = async () => {
  if (!publishModal.value.form) return;
  isActionLoading.value = true;

  try {
    const targetForm = publishModal.value.form;
    const newStatus = !targetForm.is_published;

    await axios.put(`http://localhost:3000/api/formRoutes/${targetForm._id}`, {
      is_published: newStatus,
    });

    const formIndex = forms.value.findIndex((f) => f._id === targetForm._id);
    if (formIndex !== -1) {
      forms.value[formIndex].is_published = newStatus;
    }

    closeModals();
  } catch (error) {
    console.error("Error updating publish status:", error);
  } finally {
    isActionLoading.value = false;
  }
};
</script>

<style scoped>
.ws-card-action-btn {
  @apply p-1.5 flex items-center justify-center;
}
</style>
<template>
  <div class="ws-layout">
    <aside class="ws-sidebar">
      <!-- Logo Area -->
      <div class="ws-sidebar-logo">
        <a href="/" class="ws-logo-link group">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="transition-transform group-hover:scale-105"
          >
            <rect width="32" height="32" rx="8" fill="#5855F6" />
            <circle cx="16" cy="16" r="6" fill="white" />
          </svg>
          <span class="ws-logo-text">លំហ.AI</span>
        </a>
      </div>

      <!-- Create Button (Google Style) -->
      <div class="px-4 py-6">
        <a href="/generate" class="btn-ws-create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-[#5855F6]"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create New</span>
        </a>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="ws-sidebar-nav">
        <a href="#" class="ws-nav-link active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          Dashboard
        </a>
        <a href="#" class="ws-nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Templates
        </a>
        <a href="/profile" class="ws-nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
          Settings
        </a>
      </nav>

      <!-- User Plan Info at Bottom -->
      <div class="ws-sidebar-footer">
        <div class="ws-plan-card">
          <div class="flex items-center gap-2 mb-2">
            <span
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            ></span>
            <span
              class="text-[11px] font-bold uppercase tracking-wider text-gray-400"
              >{{ userPlanName }} Plan</span
            >
          </div>
          <div class="w-full bg-gray-100 rounded-full h-1.5 mb-2">
            <div
              class="bg-[#5855F6] h-1.5 rounded-full"
              :style="{ width: tokenPercentage + '%' }"
            ></div>
          </div>
          <p class="text-[10px] text-gray-500">
            Tokens: {{ tokensRemaining }} left
          </p>
        </div>
      </div>
    </aside>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="ws-main">
      <!-- Top Navigation -->
      <header class="ws-top-nav">
        <!-- Prominent Search Bar (Google Style) -->
        <div class="ws-search-container">
          <div class="ws-search-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search in your workspace..."
              class="ws-search-input"
            />
          </div>
        </div>

        <!-- Right User Actions -->
        <div class="ws-top-actions">
          <button class="ws-icon-btn" title="Help">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
          <button class="ws-icon-btn" title="Notifications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
          <div @click="goToProfile" class="ws-user-avatar">
            {{ userInitial }}
          </div>
        </div>
      </header>

      <!-- Scrollable Workspace Area -->
      <div class="ws-content">
        <!-- View Headers -->
        <div class="ws-section-header">
          <div>
            <h1 class="ws-section-title">My Workspace</h1>
            <p class="ws-section-subtitle">
              Manage your AI-generated forms and monitor performance.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="ws-filter-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m21 16-4 4-4-4" />
                <path d="M17 20V4" />
                <path d="m3 8 4-4 4 4" />
                <path d="M7 4v16" />
              </svg>
              Last Modified
            </button>
          </div>
        </div>

        <!-- Quick Stats Row (Simplified) -->
        <div class="ws-quick-stats">
          <div class="ws-quick-stat-item">
            <span class="text-gray-400">Forms:</span>
            <span class="font-bold ml-1">{{ forms.length }}</span>
          </div>
          <div class="ws-quick-stat-item">
            <span class="text-gray-400">Responses:</span>
            <span class="font-bold ml-1">1.2k</span>
          </div>
          <div class="ws-quick-stat-item">
            <span class="text-gray-400">Success:</span>
            <span class="text-emerald-500 font-bold ml-1">94%</span>
          </div>
        </div>

        <!-- Form Grid (Google Drive Style) -->
        <div v-if="isLoading" class="ws-loader-container">
          <div class="ws-spinner"></div>
        </div>

        <div v-else-if="forms.length === 0" class="ws-empty-state">
          <div class="ws-empty-icon">📂</div>
          <p>No forms found. Create one to get started.</p>
          <a href="/generate" class="text-[#5855F6] font-bold mt-2 inline-block"
            >Start Generating &rarr;</a
          >
        </div>

        <div v-else class="ws-grid">
          <div
            v-for="(form, index) in forms"
            :key="form._id"
            class="ws-card group"
          >
            <!-- Document Thumbnail Mockup -->
            <div class="ws-card-preview" :class="getCardColor(index)">
              <!-- Minimalistic doc lines -->
              <div
                class="space-y-2 opacity-20 group-hover:opacity-40 transition-opacity"
              >
                <div class="h-2 w-20 bg-black rounded-full"></div>
                <div class="h-2 w-32 bg-black rounded-full"></div>
                <div class="h-2 w-24 bg-black rounded-full"></div>
              </div>
              <div class="ws-card-badge">
                {{ index === 0 ? "Live" : "Active" }}
              </div>
            </div>

            <!-- Card Info -->
            <div class="ws-card-info">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3 overflow-hidden">
                  <div class="ws-card-type-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-white"
                    >
                      <path
                        d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                      />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3 class="ws-card-title">{{ form.title || "Untitled" }}</h3>
                </div>
                <!-- Actions Menu -->
                <div
                  class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="editForm(form._id)"
                    class="ws-card-action-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                      />
                    </svg>
                  </button>
                  <button class="ws-card-action-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="ws-card-meta">
                <span>{{ form.schema?.length || 0 }} fields</span>
                <span class="mx-1">•</span>
                <span>Edited Oct 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// Reactive State
const user = ref(null);
const userPlanName = ref("Basic");
const userInitial = ref("U");
const forms = ref([]);
const isLoading = ref(true);

const tokensRemaining = computed(() => {
  if (!user.value) return 0;
  return Math.max(0, user.value.form_token - user.value.tokens_used);
});

const tokenPercentage = computed(() => {
  if (!user.value || user.value.form_token === 0) return 0;
  return (user.value.tokens_used / user.value.form_token) * 100;
});

const getCardColor = (index) => {
  const colors = ["bg-indigo-50", "bg-emerald-50", "bg-rose-50", "bg-amber-50"];
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
    if (user.value.plan_id) userPlanName.value = "Premium";

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
</script>

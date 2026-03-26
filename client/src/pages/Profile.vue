<template>
  <div class="profile-page-wrapper">
    <div class="profile-container">

      <div class="profile-header-group">
        <!-- 🌟 NEW: Back Button -->
        <button @click="goBack"
          class="flex items-center gap-2 mb-6 text-sm font-bold text-[#64748B] hover:text-[#5855F6] transition-colors w-fit group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            class="group-hover:-translate-x-1 transition-transform">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <h1 class="profile-title">Account Settings</h1>
        <p class="profile-subtitle">Manage your personal information, API usage, and plan preferences.</p>
      </div>

      <!-- Show profile only when loaded -->
      <div v-if="user && !isLoading" class="profile-card">

        <div class="profile-user-section">
          <div class="profile-avatar">
            <!-- Grab the first letter of their email -->
            {{ user.email.charAt(0).toUpperCase() }}
          </div>
          <div class="profile-user-details">
            <!-- Split email to make a nice username (e.g. john from john@gmail.com) -->
            <h2 class="profile-user-email">{{ user.email.split('@')[0] }}</h2>
            <div class="profile-badge-row">
              <span class="profile-badge-active">
                <span class="status-dot"></span>
                <!-- Now this works because we fetch the real role! -->
                {{ user.role === 'admin' ? 'Administrator' : 'Active Account' }}
              </span>
            </div>
          </div>
        </div>

        <div class="profile-info-grid">
          <div class="info-item">
            <label class="info-label">Email Address</label>
            <p class="info-value">{{ user.email }}</p>
          </div>
          <div class="info-item">
            <label class="info-label">Current Role</label>
            <p class="info-value capitalize">{{ user.role || 'User' }}</p>
          </div>
          <div class="info-item">
            <label class="info-label">Member Since</label>
            <!-- Now this works because we fetch the real created_at date! -->
            <p class="info-value">{{ formatDate(user.created_at) }}</p>
          </div>
          <div class="info-item">
            <label class="info-label">Total Assets</label>
            <p class="info-value">{{ user.form_ids ? user.form_ids.length : 0 }} Forms Created</p>
          </div>
        </div>

        <div class="profile-token-section">
          <div class="profile-token-header">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="text-[#5855F6]">
                <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <h3 class="profile-token-title">AI Generation Credits</h3>
            </div>
            <span class="profile-token-count">{{ tokensRemaining }} / {{ user.form_token }} Available</span>
          </div>

          <div class="profile-progress-bg">
            <div class="profile-progress-fill" :style="{ width: tokenPercentage + '%' }"></div>
          </div>

          <div class="profile-stats-row">
            <span class="profile-stat-text">{{ user.tokens_used }} tokens consumed</span>
            <!-- If they have more than 5 tokens, they must be on a Pro/Admin plan -->
            <span class="profile-stat-text">Tier: {{ user.form_token > 5 ? 'Pro Plan' : 'Free Trial' }}</span>
          </div>

          <div v-if="tokensRemaining <= 1 && user.role !== 'admin'" class="profile-alert-box">
            <div class="profile-alert-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div class="flex-grow">
              <h4 class="profile-alert-title">Token Limit Reached</h4>
              <p class="profile-alert-desc">You've consumed all your free generation credits. Upgrade your subscription
                to continue building.</p>
              <button class="btn-upgrade-inline">Explore Plans</button>
            </div>
          </div>
        </div>

        <div class="profile-footer">
          <button class="btn-text-link">
            Request Data Export
          </button>
          <button @click="handleLogout" class="btn-outline-danger">
            Sign Out
          </button>
        </div>
      </div>

      <!-- Shows while Axios is fetching the DB data -->
      <div v-else class="profile-loading text-center py-20 flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-[#5855F6] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <p class="text-gray-500 font-medium">Fetching secure profile data...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // 🌟 NEEDED FOR BACK BUTTON

const router = useRouter(); // Initialize router instance
const user = ref(null);
const isLoading = ref(true);

// 🌟 NEW: Function to handle going back
const goBack = () => {
  router.back();
};

const tokensRemaining = computed(() => {
  if (!user.value) return 0;
  return Math.max(0, user.value.form_token - user.value.tokens_used);
});

const tokenPercentage = computed(() => {
  if (!user.value || user.value.form_token === 0) return 0;
  const percentage = (user.value.tokens_used / user.value.form_token) * 100;
  return Math.min(percentage, 100);
});

const formatDate = (dateObj) => {
  if (!dateObj) return 'N/A';
  const date = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(async () => {
  const storedUserStr = localStorage.getItem("user");
  if (!storedUserStr) {
    window.location.href = "/login";
    return;
  }

  const parsedUser = JSON.parse(storedUserStr);
  user.value = parsedUser; // Load basic local info first

  try {
    const response = await axios.get(`http://localhost:3000/api/userRoutes/${parsedUser._id}`);

    user.value = response.data; // Replace basic info with complete database info

    // Optional: Keep LocalStorage perfectly in sync with the database
    localStorage.setItem("user", JSON.stringify(response.data));

  } catch (error) {
    console.error("Failed to fetch fresh profile data:", error);
  } finally {
    isLoading.value = false;
  }
});

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
</script>

<style scoped>
/* Assuming your custom classes like .profile-page-wrapper are defined globally or in your style block */
</style>
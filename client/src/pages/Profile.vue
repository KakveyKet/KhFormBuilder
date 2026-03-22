<template>
  <div class="profile-page-wrapper">
    <div class="profile-container">
      <!-- Page Header -->
      <div class="profile-header-group">
        <h1 class="profile-title">Account Settings</h1>
        <p class="profile-subtitle">
          Manage your personal information, API usage, and plan preferences.
        </p>
      </div>

      <!-- Main Profile Card -->
      <div v-if="user" class="profile-card">
        <!-- Top Section: Avatar & Info -->
        <div class="profile-user-section">
          <div class="profile-avatar">
            {{ user.email.charAt(0) }}
          </div>
          <div class="profile-user-details">
            <h2 class="profile-user-email">{{ user.email }}</h2>
            <div class="profile-badge-row">
              <span class="profile-badge-active">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"
                ></span>
                Active Account
              </span>
              <span class="profile-id-text">User ID: {{ user._id }}</span>
            </div>
          </div>
        </div>

        <!-- Middle Section: Token Usage -->
        <div class="profile-token-section">
          <div class="profile-token-header">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-[#5855F6]"
              >
                <path
                  d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
                />
              </svg>
              <h3 class="profile-token-title">AI Generation Credits</h3>
            </div>
            <span class="profile-token-count"
              >{{ tokensRemaining }} / {{ user.form_token }} Available</span
            >
          </div>

          <!-- Progress Bar -->
          <div class="profile-progress-bg">
            <div
              class="profile-progress-fill"
              :style="{ width: tokenPercentage + '%' }"
            ></div>
          </div>

          <div class="profile-stats-row">
            <span class="profile-stat-text"
              >{{ user.tokens_used }} forms generated</span
            >
            <span class="profile-stat-text">Plan: Free Tier</span>
          </div>

          <!-- Upgrade Alert -->
          <div v-if="tokensRemaining <= 1" class="profile-alert-box">
            <div class="profile-alert-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div class="flex-grow">
              <h4 class="profile-alert-title">Low Balance Warning</h4>
              <p class="profile-alert-desc">
                You're nearly out of generation credits. Upgrade to Pro for
                unlimited forms.
              </p>
              <button class="btn-upgrade-inline">Upgrade Now</button>
            </div>
          </div>
        </div>

        <!-- Bottom Section: Actions -->
        <div class="profile-footer">
          <button class="btn-text-link">Need support? Open a ticket</button>
          <button @click="handleLogout" class="btn-outline-danger">
            Log Out
          </button>
        </div>
      </div>

      <!-- Loading Fallback -->
      <div v-else class="profile-loading">
        <div class="profile-spinner"></div>
        <p>Syncing account data...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const user = ref(null);

const tokensRemaining = computed(() => {
  if (!user.value) return 0;
  return Math.max(0, user.value.form_token - user.value.tokens_used);
});

const tokenPercentage = computed(() => {
  if (!user.value || user.value.form_token === 0) return 0;
  const percentage = (user.value.tokens_used / user.value.form_token) * 100;
  return Math.min(percentage, 100);
});

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  } else {
    window.location.href = "/login";
  }
});

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
</script>

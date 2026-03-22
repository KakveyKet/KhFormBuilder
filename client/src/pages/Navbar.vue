<template>
  <header class="nav-header">
    <div class="nav-wrapper">
      <!-- Brand / Logo -->
      <a href="/" class="nav-logo-link group">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="nav-logo-svg"
        >
          <rect width="32" height="32" rx="8" fill="#5855F6" />
          <circle cx="16" cy="16" r="6" fill="white" />
        </svg>
        <span class="nav-logo-text">លំហ.AI Form</span>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="nav-desktop-menu">
        <a href="#" class="nav-link">Features</a>
        <a href="#" class="nav-link">Pricing</a>
        <a href="#" class="nav-link">Contact</a>
        <a href="#" class="nav-link">About Us</a>
      </nav>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <!-- 🌟 LOGGED OUT STATE: Show Log in & Get Started -->
        <div v-if="!isUserLoggedIn" class="flex items-center gap-4">
          <router-link to="/login" class="nav-login-link"> Log in </router-link>
          <button class="btn-nav-primary">Get Started</button>
        </div>

        <!-- 🌟 LOGGED IN STATE: Show Workspace, Profile Avatar, & Logout -->
        <div v-else class="hidden md:flex items-center gap-3 mr-2">
          <!-- Workspace Icon Link -->
          <router-link
            to="/workspace"
            class="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-primary/5 rounded-lg transition-all"
            title="Workspace"
          >
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
          </router-link>

          <!-- Profile Avatar Link (First Letter of Email) -->
          <router-link
            to="/profile"
            class="w-9 h-9 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary font-bold uppercase hover:bg-theme-primary/20 hover:scale-105 transition-all cursor-pointer"
            title="My Profile"
          >
            {{ userInitial }}
          </router-link>

          <!-- Logout Icon Button -->
          <button
            @click="handleLogout"
            class="p-2 text-theme-muted hover:text-theme-error hover:bg-theme-error/10 rounded-lg transition-all"
            title="Logout"
          >
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Hamburger -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="nav-mobile-toggle md:hidden ml-2"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="nav-mobile-menu">
        <a href="#" class="nav-mobile-link">Features</a>
        <a href="#" class="nav-mobile-link">Pricing</a>
        <a href="#" class="nav-mobile-link">Contact</a>
        <a href="#" class="nav-mobile-link">About Us</a>

        <hr class="nav-mobile-divider" />

        <!-- 🌟 MOBILE LOGGED OUT STATE -->
        <template v-if="!isUserLoggedIn">
          <router-link to="/login" class="nav-mobile-link">Log in</router-link>
          <button class="btn-mobile-nav-primary mt-2">Get Started</button>
        </template>

        <!-- 🌟 MOBILE LOGGED IN STATE -->
        <div v-else class="flex flex-col gap-4">
          <!-- Profile Shortcut -->
          <router-link
            to="/profile"
            class="nav-mobile-link flex items-center gap-3"
          >
            <div
              class="w-8 h-8 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary font-bold uppercase"
            >
              {{ userInitial }}
            </div>
            My Profile
          </router-link>

          <!-- Workspace Shortcut -->
          <router-link
            to="/workspace"
            class="nav-mobile-link flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            Workspace
          </router-link>

          <!-- Logout -->
          <button
            @click="handleLogout"
            class="nav-mobile-link flex items-center gap-3 text-theme-error w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isUserLoggedIn = ref(false);
const isMobileMenuOpen = ref(false);
const userInitial = ref("");

onMounted(() => {
  const token = localStorage.getItem("authToken");
  const userStr = localStorage.getItem("user");

  if (token && userStr) {
    isUserLoggedIn.value = true;

    // Parse the user data and get the first letter of their email
    try {
      const userObj = JSON.parse(userStr);
      if (userObj && userObj.email) {
        userInitial.value = userObj.email.charAt(0);
      }
    } catch (e) {
      console.error("Failed to parse user data from localStorage");
    }
  }
});

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  isUserLoggedIn.value = false;
  isMobileMenuOpen.value = false;
  window.location.href = "/login";
};
</script>

<style scoped>
/* Scoped styles are handled by global styles.css */
</style>

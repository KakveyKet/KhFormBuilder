<template>
  <header class="nav-header">
    <div class="nav-wrapper">
      <!-- Brand / Logo -->
      <a href="/" class="nav-logo-link group">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="nav-logo-svg">
          <rect width="32" height="32" rx="8" fill="#5855F6" />
          <circle cx="16" cy="16" r="6" fill="white" />
        </svg>
        <span class="nav-logo-text">លំហ Form</span>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="nav-desktop-menu">
        <a href="#features" class="nav-link">Features</a>
        <a href="#collaborate " class="nav-link">Collaborate </a>
        <router-link to="/solutions" class="nav-link">Solutions</router-link>
        <router-link to="/request-quote" class="nav-link">Contact</router-link>
        <router-link to="/teams" class="nav-link">About Us</router-link>

      </nav>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <!-- 🌟 LOGGED OUT STATE: Show Log in & Get Started -->
        <div v-if="!isUserLoggedIn" class="hidden md:flex items-center gap-4">
          <router-link to="/login" class="nav-login-link">Log in</router-link>
          <button class="btn-nav-primary">Get Started</button>
        </div>

        <!-- 🌟 LOGGED IN STATE: Show Workspace, Profile Avatar, & Logout -->
        <div v-else class="hidden md:flex items-center gap-2">
          <!-- Workspace Button -->
          <router-link to="/workspace"
            class="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-bold"
            title="Go to Workspace">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            Workspace
          </router-link>

          <div class="w-px h-5 bg-gray-200 mx-1"></div>

          <!-- Profile Avatar Link -->
          <router-link to="/profile" class="nav-user-avatar" title="My Profile">
            {{ userInitial }}
          </router-link>

          <!-- Logout Icon Button -->
          <button @click="handleLogout"
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Sign out">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Hamburger -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="nav-mobile-toggle">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown (Floating Card Style) -->
    <transition enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2">
      <div v-if="isMobileMenuOpen" class="nav-mobile-menu">
        <div class="flex flex-col p-2">
          <a href="#features" class="nav-mobile-link">Features</a>
          <a href="#collaborate" class="nav-mobile-link">Collaborate </a>
          <router-link to="/solutions" class="nav-mobile-link">Solutions</router-link>
          <router-link to="/request-quote" class="nav-mobile-link">Contact</router-link>
          <router-link to="/teams" class="nav-mobile-link">About Us</router-link>


          <div class="h-px bg-gray-100 my-2 mx-2"></div>

          <!-- 🌟 MOBILE LOGGED OUT STATE -->
          <template v-if="!isUserLoggedIn">
            <router-link to="/login" class="nav-mobile-link">Log in</router-link>
            <div class="p-2">
              <button class="btn-mobile-nav-primary">Get Started</button>
            </div>
          </template>

          <!-- 🌟 MOBILE LOGGED IN STATE -->
          <template v-else>
            <!-- Workspace Shortcut -->
            <router-link to="/workspace" class="nav-mobile-link group">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-gray-400 group-hover:text-[#5855F6] transition-colors">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Workspace
            </router-link>

            <!-- Profile Shortcut -->
            <router-link to="/profile" class="nav-mobile-link group">
              <div
                class="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center text-[#5855F6] font-bold text-xs uppercase">
                {{ userInitial }}
              </div>
              My Profile
            </router-link>

            <!-- Logout -->
            <button @click="handleLogout"
              class="nav-mobile-link text-red-500 hover:text-red-600 hover:bg-red-50 w-full text-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              Sign out
            </button>
          </template>
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

    // Parse the user data and prioritize username, fallback to email
    try {
      const userObj = JSON.parse(userStr);
      if (userObj) {
        if (userObj.username) {
          userInitial.value = userObj.username.charAt(0);
        } else if (userObj.email) {
          userInitial.value = userObj.email.charAt(0);
        }
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
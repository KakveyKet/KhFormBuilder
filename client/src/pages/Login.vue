<template>
  <div class="min-h-screen flex bg-white font-sans">
    <!-- LEFT SIDE: Form Area -->
    <div
      class="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:flex-none lg:w-[50%] xl:w-[45%] lg:px-20 xl:px-24 border-r border-gray-100">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2 mb-10">
          <div class="w-10 h-10 bg-[#5855F6] rounded-xl flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 tracking-tight">Lomh.AI Form</span>
        </div>

        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Log in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          Welcome back! Please enter your details.
        </p>

        <!-- Error Message -->
        <div v-if="errorMessage"
          class="mt-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm rounded-lg font-medium animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <div class="mt-8">
          <!-- Google Login -->
          <button type="button"
            class="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
            </svg>
            Log in with Google
          </button>

          <div class="relative mt-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white px-6 text-gray-500">Or continue with email</span>
            </div>
          </div>

          <!-- Main Login Form -->
          <form class="mt-6 space-y-5" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="space-y-1.5">
              <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#5855F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input id="email" v-model="form.email" type="email" required placeholder="you@company.com"
                  class="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 transition-all outline-none" />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between mb-1.5">
                <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
                <a href="#" class="text-sm font-semibold text-[#5855F6] hover:text-[#4338CA] transition-colors">Forgot
                  password?</a>
              </div>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#5855F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input id="password" v-model="form.password" type="password" required placeholder="••••••••"
                  class="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 transition-all outline-none" />
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isLoading"
              class="flex w-full mt-8 items-center justify-center rounded-xl bg-[#5855F6] px-3 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#4338CA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5855F6] disabled:opacity-70 transition-all group active:scale-[0.98]">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? "Signing in..." : "Sign in" }}
            </button>
          </form>

          <p class="mt-8 text-center text-sm text-gray-500">
            Don't have an account?
            <a href="/register" class="font-semibold text-[#5855F6] hover:text-[#4338CA] transition-colors">Sign up for
              free</a>
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: Feature Graphic -->
    <div class="hidden lg:flex lg:flex-1 relative bg-[#0B0F19] overflow-hidden items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#0B0F19] to-[#312E81] opacity-90"></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]">
      </div>

      <div class="relative z-10 w-full max-w-lg px-8 text-left">
        <h2 class="text-4xl font-bold text-white mb-6 leading-tight">
          Intelligent forms, <br />
          built in seconds.
        </h2>
        <p class="text-lg text-indigo-200 mb-12 font-light">
          Lomh.AI leverages advanced artificial intelligence to transform your
          plain English descriptions into powerful, ready-to-use interfaces.
        </p>

        <div class="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div
              class="w-12 h-12 bg-gradient-to-br from-[#5855F6] to-[#F0428A] rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse">
                <path
                  d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-white tracking-wide">
                AI Assistant
              </div>
              <div class="text-xs text-indigo-300">
                Generating layout and fields...
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="h-10 w-1/2 bg-white/10 rounded-lg animate-pulse"></div>
              <div class="h-10 w-1/2 bg-white/10 rounded-lg animate-pulse" style="animation-delay: 150ms"></div>
            </div>
            <div class="h-10 w-full bg-white/10 rounded-lg animate-pulse" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { url } from "../../api";
const form = ref({ email: "", password: "" });
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await axios.post(
      `${url}/api/authRoutes/login`,
      {
        email: form.value.email,
        password: form.value.password,
      },
    );

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    window.location.href = "/";
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Failed to log in.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>

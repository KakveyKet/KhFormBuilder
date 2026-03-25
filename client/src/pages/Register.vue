<template>
  <div class="min-h-screen flex bg-white font-sans">
    <!-- LEFT SIDE: Registration Form -->
    <div
      class="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:flex-none lg:w-[50%] xl:w-[45%] lg:px-20 xl:px-24 border-r border-gray-100">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2 mb-8">
          <div class="w-10 h-10 bg-[#5855F6] rounded-xl flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 tracking-tight">Lomh.AI Form</span>
        </div>

        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          Start building intelligent forms today. No credit card required.
        </p>

        <!-- Success & Error Messages -->
        <div v-if="successMessage"
          class="mt-6 p-4 bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-700 text-sm rounded-lg font-medium animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <div v-if="errorMessage"
          class="mt-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm rounded-lg font-medium animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <div class="mt-8">
          <form class="space-y-5" @submit.prevent="handleRegister">


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
              <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#5855F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input id="password" v-model="form.password" type="password" required
                  placeholder="Create a strong password"
                  class="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 transition-all outline-none" />
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-1.5">
              <label for="confirmPassword" class="block text-sm font-semibold leading-6 text-gray-900">Confirm
                Password</label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#5855F6] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input id="confirmPassword" v-model="form.confirmPassword" type="password" required
                  placeholder="Repeat password"
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
              <span v-if="isLoading">Processing...</span>
              <span v-else class="flex items-center gap-2">
                Claim your 5 Free Tokens
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                  class="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </button>
          </form>

          <p class="mt-8 text-center text-sm text-gray-500">
            Already have an account?
            <a href="/login" class="font-semibold text-[#5855F6] hover:text-[#4338CA] transition-colors">Sign in
              here</a>
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
          Your creative journey <br />
          starts with a gift.
        </h2>
        <p class="text-lg text-indigo-200 mb-12 font-light">
          Sign up today and get 5 complimentary AI credits. Transform ideas into
          production-ready forms instantly.
        </p>

        <!-- Glassmorphism Token Mockup -->
        <div class="p-8 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 shadow-2xl relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#F0428A" stroke-width="2" class="absolute -top-4 -right-4 animate-pulse">
            <path
              d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>

          <div class="flex items-center justify-between mb-8">
            <div class="text-white">
              <div class="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">
                Current Balance
              </div>
              <div class="text-3xl font-bold">
                5.00
                <span class="text-sm font-medium text-indigo-400">Tokens</span>
              </div>
            </div>
            <div
              class="w-14 h-14 bg-gradient-to-tr from-[#5855F6] to-[#F0428A] rounded-2xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M11 15h2m-2-4h2m-2-4h2M9 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
              </svg>
            </div>
          </div>

          <div class="space-y-3">
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div class="h-full w-full bg-gradient-to-r from-[#5855F6] to-[#F0428A] animate-pulse"></div>
            </div>
            <div class="flex justify-between text-[11px] font-bold text-indigo-300 uppercase tracking-tighter">
              <span>Welcome Bonus Active</span>
              <span>100% Locked In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({ email: "", password: "", confirmPassword: "" });
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await axios.post(
      "http://localhost:3000/api/authRoutes/register",
      {
        email: form.value.email,
        password: form.value.password,
      },
    );

    successMessage.value = response.data.message;

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setTimeout(() => {
      window.location.href = "/workspace";
    }, 1500);
  } catch (error) {
    errorMessage.value =
      error.response?.data?.error || "Failed to register. Please try again.";
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

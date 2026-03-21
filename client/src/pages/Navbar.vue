<template>
  <!-- Sticky header with a subtle glassmorphism blur effect. 
       Added 'relative' so the mobile menu dropdown can position absolutely against it -->
  <header class="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-theme-border/60 transition-all duration-300 relative">
    <!-- Standardized width to perfectly align with Hero, Features, and Footer -->
    <div class="w-full max-w-[90%] xl:max-w-[1200px] mx-auto flex items-center justify-between py-4">
      
      <!-- Brand / Logo -->
      <a href="#" class="flex items-center gap-2 group">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:scale-105 transition-transform">
          <!-- Using inline color to match the Vibrant brand -->
          <rect width="32" height="32" rx="8" fill="#5855F6"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
        <span class="text-[20px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#5855F6] transition-colors">Lomh.AI Form</span>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center space-x-8">
        <a href="#" class="text-[15px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Features</a>
        <a href="#" class="text-[15px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Pricing</a>
        <a href="#" class="text-[15px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Contact</a>
        <a href="#" class="text-[15px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">About Us</a>
      </nav>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Optional Login link for a SaaS feel (Hidden on mobile to save space) -->
        <a href="#" class="hidden md:block text-[15px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors mr-2">
          Log in
        </a>
        
        <!-- Main Call to Action (Hidden on mobile to save space) -->
        <button class="hidden md:block bg-[#5855F6] text-white font-medium text-[15px] px-6 py-2.5 rounded-md hover:bg-[#4338CA] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
          Get Started
        </button>

        <!-- Mobile Menu Hamburger (Visible only on small screens) -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-[#475569] hover:text-[#0F172A] focus:outline-none transition-colors">
          <!-- Hamburger Icon -->
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Close Icon (X) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <!-- Mobile Menu Dropdown -->
    <!-- Using Vue Transition for a smooth slide-down effect -->
    <transition 
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white border-b border-theme-border/60 shadow-xl flex flex-col px-6 py-5 gap-4 z-40">
        <a href="#" class="text-[16px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Features</a>
        <a href="#" class="text-[16px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Pricing</a>
        <a href="#" class="text-[16px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Contact</a>
        <a href="#" class="text-[16px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">About Us</a>
        
        <hr class="border-[#F1F5F9] my-2" />
        
        <a href="#" class="text-[16px] font-medium text-[#475569] hover:text-[#5855F6] transition-colors">Log in</a>
        <button class="w-full bg-[#5855F6] text-white font-medium text-[16px] px-6 py-3 rounded-md hover:bg-[#4338CA] transition-all shadow-sm">
          Get Started
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// State variable to track if the mobile menu is open or closed
const isMobileMenuOpen = ref(false)
</script>

<style lang="scss" scoped></style>
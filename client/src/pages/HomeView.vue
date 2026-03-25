<template>
  <div class="relative">
    <Navbar />

    <!-- Top Scroll Blur Effect -->
    <div class="scroll-fade-blur"></div>

    <div id="features"
      class="relative animate-fade-up animate-once animate-duration-500 animate-delay-300 animate-ease-out">
      <HeroPage />
      <Collapse id="collaborate" />
      <Features id="features" />
      <CollapseUser />
      <!-- <PricingComponent id="pricing" />  -->
      <CTA id="cta" />
      <Footer />
    </div>

    <!-- 🌟 NEW: Floating Sticky 'Generate' Button -->
    <router-link to="/generate"
      class="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#5855F6] to-[#F0428A] text-white font-bold rounded-full shadow-[0_8px_30px_rgba(88,85,246,0.4)] hover:shadow-[0_12px_40px_rgba(240,66,138,0.5)] hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Generate Form">
      <!-- Sparkle Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        class="group-hover:scale-110 transition-transform">
        <path
          d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
      <span class="hidden sm:block text-[15px] tracking-wide">Generate Free</span>
    </router-link>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Collapse from "./Collapse.vue";
import Navbar from "./Navbar.vue";
import Features from "./Features.vue";
import CollapseUser from "./CollapseUser.vue";
// import PricingComponent from "./PricingComponent.vue";
import CTA from "./CTA.vue";
import Footer from "./Footer.vue";
// import FormGenerator from "./FormGenerator.vue";
import HeroPage from "./HeroPage.vue";
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <Navbar />
    <div id="features"
      class="relative animate-fade-up animate-once animate-duration-500 animate-delay-300 animate-ease-out">
      <HeroPage />
      <Features id="features" />
      <PricingComponent id="pricing" />
      <CTA id="cta" />
      <Footer />
    </div>
    <!-- <FormGenerator /> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "./Navbar.vue";
import Features from "./Features.vue";
import PricingComponent from "./PricingComponent.vue";
import CTA from "./CTA.vue";
import Footer from "./Footer.vue";
import FormGenerator from "./FormGenerator.vue";
import HeroPage from "./HeroPage.vue";
</script>

<style lang="scss" scoped></style>

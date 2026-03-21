<template>
    <div class="relative">
        <Navbar />
        <HeroPage />
        <Features />
        <PricingComponent />
        <CTA />
        <Footer />
        <FormGenerator />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './Navbar.vue';
import Features from './Features.vue';
import PricingComponent from './PricingComponent.vue';
import CTA from './CTA.vue';
import Footer from './Footer.vue';
import FormGenerator from './FormGenerator.vue';
import HeroPage from './HeroPage.vue';
</script>

<style lang="scss" scoped></style>
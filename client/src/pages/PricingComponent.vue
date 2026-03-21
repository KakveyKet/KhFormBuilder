<template>
  <section class="pricing-section">
    <div class="pricing-container">
      
      <!-- Header -->
      <div class="pricing-header">
        <h2 class="pricing-title">Simple, transparent pricing</h2>
        <p class="pricing-subtitle">Choose the plan that's right for your stage of growth.</p>
      </div>

      <!-- Toggle Tabs -->
      <div class="pricing-tabs-container">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          :class="['pricing-tab', activeTab === tab ? 'pricing-tab-active' : 'pricing-tab-inactive']"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Pricing Card -->
      <div class="pricing-card">
        
        <!-- Left Column: Details & Price -->
        <div class="pricing-card-left">
          <div>
            <h3 class="pricing-plan-name">{{ currentPlan.name }}</h3>
            <p class="pricing-plan-desc">{{ currentPlan.description }}</p>
          </div>
          <div class="pricing-price-wrapper">
            <span class="pricing-price">{{ currentPlan.price }}</span>
            <span class="pricing-period">{{ currentPlan.period }}</span>
          </div>
        </div>

        <!-- Right Column: Features & Button -->
        <div class="pricing-card-right">
          <ul class="pricing-feature-list">
            <li v-for="(feature, index) in currentPlan.features" :key="index" class="pricing-feature-item">
              <!-- Green Checkmark SVG -->
              <svg class="pricing-feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ feature }}
            </li>
          </ul>
          
          <button class="btn-pricing">
            {{ currentPlan.buttonText }}
          </button>
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabs = ['Starter', 'Pro', 'Enterprise'];
const activeTab = ref('Starter');

// Data for all the plans to make the tabs fully interactive!
const plans = {
  Starter: {
    name: 'Starter',
    description: 'Perfect for individual creators',
    price: '$0',
    period: '/forever',
    features: [
      'Up to 3 projects',
      'Basic templates',
      'Community support'
    ],
    buttonText: 'Start for Free'
  },
  Pro: {
    name: 'Pro',
    description: 'For professionals scaling their work',
    price: '$15',
    period: '/month',
    features: [
      'Unlimited projects',
      'Premium templates',
      'Priority email support'
    ],
    buttonText: 'Get Started'
  },
  Enterprise: {
    name: 'Enterprise',
    description: 'Custom solutions for large teams',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro',
      'Custom branding',
      '24/7 dedicated support'
    ],
    buttonText: 'Contact Sales'
  }
};

const currentPlan = computed(() => plans[activeTab.value]);
</script>
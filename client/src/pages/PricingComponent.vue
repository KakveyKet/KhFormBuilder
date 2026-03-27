<template>
  <section class="pricing-section">
    <div class="pricing-container">
      <!-- Header -->
      <div class="pricing-header">
        <h2 class="pricing-title">Simple, transparent pricing</h2>
        <p class="pricing-subtitle">
          Choose the plan that's right for your stage of growth.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <svg
          class="animate-spin h-8 w-8 text-theme-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>

      <!-- Content (Shows when loaded) -->
      <div
        v-else-if="tabs.length > 0"
        class="w-full flex flex-col items-center"
      >
        <!-- Toggle Tabs -->
        <div class="pricing-tabs-container">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'pricing-tab',
              activeTab === tab ? 'pricing-tab-active' : 'pricing-tab-inactive',
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Pricing Card -->
        <div class="pricing-card relative">
          <!-- Left Column: Details & Price -->
          <div class="pricing-card-left">
            <div>
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2"
              >
                <h3 class="pricing-plan-name mb-0">{{ currentPlan.name }}</h3>
                <!-- 🌟 NEW: Current Plan Badge -->
                <span
                  v-if="currentUserPlanId === currentPlan.id"
                  class="w-fit px-3 py-1 bg-theme-success/10 border border-theme-success/20 text-theme-success text-[11px] font-bold rounded-full uppercase tracking-wider"
                >
                  Active Plan
                </span>
              </div>
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
              <li
                v-for="(feature, index) in currentPlan.features"
                :key="index"
                class="pricing-feature-item"
              >
                <!-- Green Checkmark SVG -->
                <svg
                  class="pricing-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ feature }}
              </li>
            </ul>

            <!-- 🌟 NEW: Dynamic Button State -->
            <button
              class="btn-pricing"
              :class="{
                'opacity-50 cursor-not-allowed hover:bg-[#5855F6] hover:-translate-y-0 hover:scale-100 hover:shadow-md':
                  currentUserPlanId === currentPlan.id,
              }"
              :disabled="currentUserPlanId === currentPlan.id"
            >
              {{
                currentUserPlanId === currentPlan.id
                  ? "Currently Active"
                  : currentPlan.buttonText
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- Fallback Error State -->
      <div v-else class="text-center py-10 text-theme-error font-medium">
        Failed to load pricing plans from the database.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { url } from "../../api"; 
// Reactive State
const isLoading = ref(true);
const tabs = ref([]);
const activeTab = ref("");
const plansData = ref({});
const currentUserPlanId = ref(null); // 🌟 Tracks what plan the user actually has!

// Metadata dictionary to supply UI details that aren't stored in MongoDB
const planMetadata = {
  Starter: {
    description: "Perfect for individual creators",
    buttonText: "Start for Free",
    extraFeatures: ["Community support"],
  },
  Professional: {
    description: "For professionals scaling their work",
    buttonText: "Upgrade to Pro",
    extraFeatures: ["Premium templates", "Priority email support"],
  },
  Enterprise: {
    description: "Custom solutions for large teams",
    buttonText: "Contact Sales",
    extraFeatures: ["Custom branding", "24/7 dedicated support"],
  },
};

onMounted(async () => {
  try {
    // 1. Fetch plans from MongoDB
    const response = await axios.get(`${url}/api/planRoutes`);
    const fetchedPlans = response.data;

    // 2. Format the database response for our UI
    fetchedPlans.forEach((plan) => {
      const rawPrice = plan.price_monthly?.$numberDecimal || plan.price_monthly;
      const parsedPrice = parseFloat(rawPrice || 0);
      const formattedPrice = parsedPrice === 0 ? "$0" : `$${parsedPrice}`;

      const meta = planMetadata[plan.name] || {
        description: "Great for growing teams",
        buttonText: "Subscribe",
        extraFeatures: ["Standard support"],
      };

      const formFeature =
        plan.max_forms >= 9999
          ? "Unlimited forms"
          : `Up to ${plan.max_forms} forms`;
      const responseFeature =
        plan.max_responses_per_month >= 99999
          ? "Unlimited responses"
          : `Up to ${plan.max_responses_per_month} responses/month`;

      plansData.value[plan.name] = {
        id: plan._id, // 🌟 Save the actual DB ID for matching later!
        name: plan.name,
        description: meta.description,
        price: formattedPrice,
        period: parsedPrice === 0 ? "/forever" : "/month",
        features: [formFeature, responseFeature, ...meta.extraFeatures],
        buttonText: meta.buttonText,
      };
    });

    const orderedNames = ["Starter", "Professional", "Enterprise"];
    tabs.value = orderedNames.filter((name) => plansData.value[name]);

    if (tabs.value.length > 0) {
      activeTab.value = tabs.value[0];
    }

    // 🌟 3. Fetch logged-in user to highlight their current plan
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const parsedUser = JSON.parse(storedUserStr);
      if (parsedUser && parsedUser._id) {
        const userRes = await axios.get(
          `{url}/api/userRoutes/${parsedUser._id}`,
        );
        // Save the plan ID they are currently subscribed to
        currentUserPlanId.value = userRes.data.plan_id;
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

// Computed property to automatically grab the currently selected plan object
const currentPlan = computed(() => plansData.value[activeTab.value] || {});
</script>

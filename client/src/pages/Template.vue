<template>
  <div class="min-h-screen bg-[#F8FAFF] flex flex-col">
    
    <!-- Header Navigation -->
    <header class="h-16 bg-white border-b border-theme-border flex items-center justify-between px-6 sm:px-10 flex-shrink-0 z-10 sticky top-0">
      <a href="/" class="flex items-center gap-2 group">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform group-hover:scale-105">
          <rect width="32" height="32" rx="8" fill="#5855F6" />
          <circle cx="16" cy="16" r="6" fill="white" />
        </svg>
        <span class="font-bold text-lg text-theme-text tracking-tight">លំហ.AI <span class="text-[#5855F6]">Form</span></span>
      </a>
      
      <div class="flex items-center gap-4">
        <a href="/generate" class="text-sm font-bold text-gray-500 hover:text-[#5855F6] transition-colors hidden sm:block">AI Studio</a>
        <a href="/pricing" class="text-sm font-bold text-gray-500 hover:text-[#5855F6] transition-colors hidden sm:block">Pricing</a>
        <a href="/workspace" class="px-5 py-2 bg-[#5855F6] text-white text-sm font-bold rounded-lg hover:bg-[#4338CA] transition-all shadow-md hover:-translate-y-0.5">
          Go to Hub
        </a>
      </div>
    </header>

    <!-- Showcase Hero -->
    <section class="w-full pt-16 pb-12 px-5 flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#5855F6] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
        <span class="w-2 h-2 rounded-full bg-[#5855F6] animate-pulse"></span> Theme Gallery
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight max-w-2xl">
        Beautiful forms for every brand.
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
        Choose from our expertly crafted templates or let the AI select the best design for your use case. Unlock premium themes by upgrading your plan.
      </p>
    </section>

    <!-- Main Content Area -->
    <main class="flex-1 w-full max-w-[1200px] mx-auto px-5 pb-24">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-10 w-10 text-[#5855F6] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500 font-medium">Loading templates...</p>
      </div>

      <!-- Templates Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-for="tpl in templates" :key="tpl.id" 
          class="group bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#5855F6]/30 transition-all duration-300 flex flex-col relative"
        >
          <!-- Plan Badge -->
          <div class="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm"
            :class="{
              'bg-white/80 text-gray-600 border-gray-200': tpl.requiredPlan === 'free',
              'bg-purple-100/90 text-purple-700 border-purple-200': tpl.requiredPlan === 'pro',
              'bg-amber-100/90 text-amber-700 border-amber-200': tpl.requiredPlan === 'enterprise'
            }">
            {{ tpl.requiredPlan }}
          </div>

          <!-- Visual Mockup Area (Dynamic CSS applied here!) -->
          <div class="h-56 w-full relative flex items-center justify-center p-6" 
               :style="{ backgroundColor: getMockupBg(tpl) }">
            
            <!-- The Mock Form Card -->
            <div class="w-full max-w-[240px] rounded-xl shadow-lg border p-5 transition-transform duration-500 group-hover:scale-105"
                 :style="{ backgroundColor: tpl.colors?.bg || '#fff', borderColor: tpl.colors?.border || '#eee', fontFamily: tpl.font === 'custom' ? 'Inter' : tpl.font }">
              
              <!-- Mock Title -->
              <div class="h-3 w-2/3 rounded mb-4" :style="{ backgroundColor: tpl.colors?.text || '#333', opacity: 0.9 }"></div>
              
              <!-- Mock Inputs -->
              <div class="space-y-3 mb-5">
                <div class="h-8 w-full border rounded-md" :style="{ borderColor: tpl.colors?.border || '#eee', backgroundColor: `color-mix(in srgb, ${tpl.colors?.text || '#000'} 3%, ${tpl.colors?.bg || '#fff'})` }"></div>
                <div class="h-8 w-full border rounded-md" :style="{ borderColor: tpl.colors?.border || '#eee', backgroundColor: `color-mix(in srgb, ${tpl.colors?.text || '#000'} 3%, ${tpl.colors?.bg || '#fff'})` }"></div>
              </div>
              
              <!-- Mock Button -->
              <div class="h-9 w-full rounded-lg" :style="{ backgroundColor: tpl.colors?.primary || '#5855F6' }"></div>
            </div>
            
            <!-- Faded background decorative shapes -->
            <div class="absolute inset-0 opacity-10 pointer-events-none" :style="{ background: `radial-gradient(circle at 80% 20%, ${tpl.colors?.primary || '#5855F6'} 0%, transparent 50%)` }"></div>
          </div>

          <!-- Template Details -->
          <div class="p-6 border-t border-gray-100 flex-1 flex flex-col bg-white">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-xl font-bold text-gray-900">{{ tpl.name }}</h2>
            </div>
            
            <!-- Tech Specs -->
            <div class="flex items-center gap-4 mt-auto pt-4">
              <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
                {{ tpl.font || 'Inter' }}
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium capitalize">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                {{ tpl.designStyle || 'Standard' }}
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </main>
    
    <!-- Simple Footer -->
    <footer class="py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-white">
       © {{ new Date().getFullYear() }} លំហ.AI Form. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const templates = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

// Hardcoded robust fallback list to show all beautiful themes to guests
const fallbackTemplates = [
  { id: "minimal-light", name: "Minimal Light", requiredPlan: "free", colors: { primary: "#5855F6", bg: "#FFFFFF", text: "#0F172A", border: "#E2E8F0" }, font: "Inter", designStyle: "clean" },
  { id: "classic-blue", name: "Classic Blue", requiredPlan: "free", colors: { primary: "#2563EB", bg: "#F8FAFC", text: "#1E293B", border: "#CBD5E1" }, font: "Roboto", designStyle: "standard" },
  { id: "nature-green", name: "Nature Green", requiredPlan: "free", colors: { primary: "#10B981", bg: "#F0FDF4", text: "#064E3B", border: "#A7F3D0" }, font: "Inter", designStyle: "soft" },
  { id: "warm-orange", name: "Warm Orange", requiredPlan: "free", colors: { primary: "#F59E0B", bg: "#FFFBEB", text: "#78350F", border: "#FDE68A" }, font: "Lora", designStyle: "warm" },
  { id: "soft-pink", name: "Soft Pink", requiredPlan: "free", colors: { primary: "#EC4899", bg: "#FDF2F8", text: "#831843", border: "#FBCFE8" }, font: "Inter", designStyle: "playful" },
  
  { id: "dark-knight", name: "Dark Knight", requiredPlan: "pro", colors: { primary: "#818CF8", bg: "#0F172A", text: "#F8FAFC", border: "#334155" }, font: "Inter", designStyle: "dark-mode" },
  { id: "elegant-serif", name: "Elegant Serif", requiredPlan: "pro", colors: { primary: "#0F172A", bg: "#FAFAFA", text: "#171717", border: "#E5E5E5" }, font: "Lora", designStyle: "professional" },
  { id: "neon-cyber", name: "Neon Cyber", requiredPlan: "pro", colors: { primary: "#22D3EE", bg: "#171717", text: "#FFFFFF", border: "#22D3EE" }, font: "Roboto", designStyle: "modern" },
  { id: "corporate-slate", name: "Corporate Slate", requiredPlan: "pro", colors: { primary: "#334155", bg: "#E2E8F0", text: "#0F172A", border: "#94A3B8" }, font: "Inter", designStyle: "corporate" },
  { id: "midnight-purple", name: "Midnight Purple", requiredPlan: "pro", colors: { primary: "#C084FC", bg: "#2E1065", text: "#FAF5FF", border: "#5B21B6" }, font: "Inter", designStyle: "vibrant" },
  
  { id: "enterprise-gold", name: "Enterprise Gold", requiredPlan: "enterprise", colors: { primary: "#EAB308", bg: "#000000", text: "#FFFFFF", border: "#CA8A04" }, font: "Inter", designStyle: "premium" }
];

onMounted(async () => {
  try {
    // 🌟 Make the request to your exact endpoint
    // If you want to show ALL templates to guests as a showcase, your backend should return all of them 
    // if no userId is provided. If it fails, we use the fallback!
    const response = await axios.get("http://localhost:3000/api/templateRouter");
    
    // Check if we got a valid array
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      templates.value = response.data;
    } else {
      templates.value = fallbackTemplates;
    }
  } catch (error) {
    console.warn("Could not reach /api/templateRouter. Loading fallback showcase templates.", error);
    templates.value = fallbackTemplates;
  } finally {
    isLoading.value = false;
  }
});

// Helper function to create a nice contrasting background behind the mockup card
const getMockupBg = (tpl) => {
  if (tpl.requiredPlan === 'pro' && tpl.colors?.bg === '#0F172A') return '#1E293B'; // Slightly lighter dark bg
  if (tpl.requiredPlan === 'enterprise') return '#111111';
  return '#F3F4F6'; // Default light gray background
};
</script>
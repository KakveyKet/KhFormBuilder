<template>
  <div class="min-h-screen bg-[#F8FAFF] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
    
    <div class="max-w-6xl w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col lg:flex-row border border-gray-200">
      
      <!-- LEFT SIDE: Information & Trust (Clean Light Theme) -->
      <div class="lg:w-[40%] bg-slate-50 p-10 lg:p-12 flex flex-col justify-between border-r border-gray-200 relative">
        
        <div>
          <a href="/" class="flex items-center gap-2 mb-12 text-slate-500 hover:text-[#5855F6] transition-colors w-fit font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span class="text-sm">Back to Home</span>
          </a>

          <h2 class="text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight text-slate-900">
            Let's build something <br/>
            <span class="text-[#5855F6]">amazing together.</span>
          </h2>
          <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-12">
            Tell us about your project. Our experts will analyze your requirements and craft a tailored solution that drives real business results.
          </p>

          <div class="space-y-8">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-gray-200 text-[#5855F6] shadow-sm">
                <span class="font-bold text-sm">1</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Discovery Call</h4>
                <p class="text-slate-500 text-xs mt-1.5 leading-relaxed">We'll schedule a brief call to understand your goals, challenges, and technical requirements.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-gray-200 text-[#5855F6] shadow-sm">
                <span class="font-bold text-sm">2</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Strategic Proposal</h4>
                <p class="text-slate-500 text-xs mt-1.5 leading-relaxed">Receive a detailed breakdown of the timeline, scope, architecture, and exact pricing.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-gray-200 text-[#5855F6] shadow-sm">
                <span class="font-bold text-sm">3</span>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Project Kickoff</h4>
                <p class="text-slate-500 text-xs mt-1.5 leading-relaxed">Once approved, we assemble your dedicated team and begin the development sprint.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between text-slate-600 text-xs font-semibold gap-4 sm:gap-0">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +1 (555) 123-4567
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            hello@lomh.ai
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: The Form -->
      <div class="lg:w-[60%] p-8 sm:p-12 lg:p-16 bg-white relative">
        
        <!-- Success State -->
        <div v-if="isSubmitted" class="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-12 text-center animate-fade-in">
          <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-3xl font-bold text-slate-900 mb-3">Request Received!</h3>
          <p class="text-slate-500 max-w-sm mb-8 leading-relaxed">
            Thank you for reaching out. A member of our strategy team will review your project details and get back to you within 24 hours.
          </p>
          <button @click="resetForm" class="px-6 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm">
            Submit another request
          </button>
        </div>

        <form v-else @submit.prevent="submitRequest" class="flex flex-col h-full animate-fade-in">
          
          <div class="mb-8">
            <h3 class="text-[11px] font-bold text-[#5855F6] uppercase tracking-widest mb-2">Request a Quote</h3>
            <p class="text-xl font-bold text-slate-900">What service are you looking for?</p>
          </div>

          <!-- Custom Service Selection Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div 
              v-for="service in serviceOptions" 
              :key="service.id"
              @click="form.selectedService = service.id"
              class="border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-start gap-4 bg-white"
              :class="form.selectedService === service.id ? 'border-[#5855F6] bg-indigo-50/50 shadow-md shadow-indigo-500/10 scale-[1.02]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" :class="form.selectedService === service.id ? 'bg-[#5855F6] text-white shadow-sm' : 'bg-gray-100 text-gray-500 border border-gray-200'">
                <span v-html="service.icon"></span>
              </div>
              <div>
                <h4 class="text-[15px] font-bold text-slate-900 mb-0.5" :class="form.selectedService === service.id ? 'text-[#5855F6]' : ''">{{ service.title }}</h4>
                <p class="text-xs text-slate-500 leading-tight">{{ service.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Input Fields -->
          <div class="space-y-6 flex-grow">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700">Full Name <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" required placeholder="John Doe" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 outline-none transition-all text-[15px] text-slate-900 placeholder-slate-400 shadow-sm" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700">Work Email <span class="text-red-500">*</span></label>
                <input v-model="form.email" type="email" required placeholder="john@company.com" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 outline-none transition-all text-[15px] text-slate-900 placeholder-slate-400 shadow-sm" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="+1 (555) 000-0000" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 outline-none transition-all text-[15px] text-slate-900 placeholder-slate-400 shadow-sm" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-sm font-bold text-slate-700">Project Details <span class="text-red-500">*</span></label>
              <textarea v-model="form.message" required rows="4" placeholder="Briefly describe your goals, timeline, and any specific requirements..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#5855F6] focus:ring-4 focus:ring-[#5855F6]/10 outline-none transition-all text-[15px] text-slate-900 placeholder-slate-400 resize-none shadow-sm"></textarea>
            </div>
          </div>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              :disabled="isLoading || !form.selectedService"
              class="w-full flex items-center justify-center gap-2 py-4 bg-[#5855F6] text-white rounded-xl font-bold text-[16px] hover:bg-[#4338CA] shadow-md shadow-[#5855F6]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>Send Request</span>
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
            <p v-if="!form.selectedService" class="text-center text-xs text-red-500 font-bold mt-3">
              Please select a service category above to continue.
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  selectedService: null,
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
});

const isLoading = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref("");

const serviceOptions = [
  {
    id: 'business',
    title: 'Business Solution',
    desc: 'ERP, CRM, & Enterprise tools',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  {
    id: 'webapp',
    title: 'Web App Dev',
    desc: 'Custom scalable applications',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
  {
    id: 'digital',
    title: 'Digital Service',
    desc: 'Marketing, SEO, & Branding',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`
  },
  {
    id: 'media',
    title: 'Media Service',
    desc: 'Video, Animation & Content',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polygon points="10 16 16 12 10 8 10 16"/></svg>`
  }
];

const submitRequest = async () => {
  if (!form.value.selectedService) return;
  
  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Simulate API Call to backend
    console.log("Submitting Quote Request:", form.value);
    await new Promise(resolve => setTimeout(resolve, 1200)); 
    
    isSubmitted.value = true;
  } catch (error) {
    errorMessage.value = "An error occurred while sending your request. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    selectedService: null,
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  };
  isSubmitted.value = false;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
</style>
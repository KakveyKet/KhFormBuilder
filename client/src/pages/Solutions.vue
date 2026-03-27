<template>
    <section class="min-h-screen bg-[#F8FAFF] py-24 px-4 sm:px-6 lg:px-8  flex flex-col items-center justify-center">
        <div class="w-full max-w-[1200px] mx-auto">

            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-[#5855F6] text-[12px] font-bold uppercase tracking-widest rounded-full shadow-sm mb-6">
                    <span class="w-2 h-2 rounded-full bg-[#5855F6] animate-pulse"></span> Our Expertise
                </div>
                <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    Comprehensive solutions for <br class="hidden sm:block" />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#5855F6] to-[#F0428A]">modern
                        businesses.</span>
                </h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    From strategic problem solving to full-scale software development and marketing, we provide
                    everything you need to scale, innovate, and dominate your market.
                </p>
            </div>

            <!-- Solutions Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">

                <div v-for="(solution, index) in solutions" :key="solution.title" class="solution-card group"
                    :style="{ animationDelay: `${index * 100}ms` }">
                    <!-- Icon Wrapper -->
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm border"
                        :class="solution.colorClass">
                        <span v-html="solution.icon" class="w-6 h-6"></span>
                    </div>

                    <!-- Content -->
                    <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#5855F6] transition-colors">
                        {{ solution.title }}
                    </h3>
                    <p class="text-[15px] text-slate-500 leading-relaxed flex-grow">
                        {{ solution.description }}
                    </p>

                    <!-- Hover Indicator -->
                    <div
                        class="mt-6 pt-4 border-t border-gray-100 flex items-center text-[#5855F6] text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Learn more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>

            </div>

            <!-- Bottom CTA -->
            <div class="mt-20 text-center animate-fade-up" style="animation-delay: 800ms;">
                <p class="text-slate-600 mb-6">Ready to transform your business?</p>
                <router-link to="/request-quote"
                    class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5855F6] text-white rounded-xl font-bold text-[16px] hover:bg-[#4338CA] shadow-md shadow-[#5855F6]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]">
                    Get a Custom Quote
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" x2="11" y1="2" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </router-link>
            </div>

        </div>
    </section>
</template>

<script setup>
const solutions = [
    {
        title: "Problem Solve",
        description: "We identify critical bottlenecks and provide actionable, strategic solutions to overcome your toughest business challenges.",
        colorClass: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>` // Lightbulb
    },
    {
        title: "Business Solution",
        description: "Comprehensive enterprise tools, operational streamlining, and custom CRM/ERP strategies tailored to scale your company.",
        colorClass: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` // Briefcase
    },
    {
        title: "Online Work Maintenance",
        description: "24/7 technical support, continuous updates, and security patches to keep your digital infrastructure running flawlessly.",
        colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>` // Server/Uptime
    },
    {
        title: "Software Provider",
        description: "End-to-end custom software development, web applications, and scalable SaaS products built on modern tech stacks.",
        colorClass: "bg-violet-50 text-violet-600 border-violet-100 group-hover:bg-violet-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` // Code
    },
    {
        title: "Social Media Management",
        description: "Engaging content creation, daily community management, and targeted growth strategies across all major social platforms.",
        colorClass: "bg-pink-50 text-pink-600 border-pink-100 group-hover:bg-pink-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` // Message Bubble
    },
    {
        title: "Digital Marketing",
        description: "Data-driven SEO, highly optimized paid advertising (PPC), and email campaigns designed to maximize ROI and conversions.",
        colorClass: "bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>` // Megaphone
    },
    {
        title: "Graphic Design",
        description: "Stunning visual identities, modern branding, and intuitive UI/UX design that captivates and converts your audience.",
        colorClass: "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>` // Pen Tool/Design
    },
    {
        title: "Mass Media",
        description: "Broad-reach broadcasting strategies, high-quality video production, and multimedia campaigns for maximum impact.",
        colorClass: "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>` // Radio/Broadcast
    }
];
</script>

<style scoped>
.solution-card {
    @apply bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-[#5855F6]/30 cursor-pointer;
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
}

.animate-fade-up {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fade-up {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
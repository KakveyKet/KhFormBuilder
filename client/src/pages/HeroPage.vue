<template>
  <div class="hero-container">
    <div class="hero-wrapper">
      <!-- LEFT SECTION (Text) -->
      <!-- Added 'relative' to allow absolute positioning of decorative floating background elements -->
      <div class="hero-content relative">
        <!-- Floating Decorative AI Bot Icon in the background -->
        <div
          class="absolute -top-12 -left-8 md:-left-16 text-[#5855F6]/10 animate-bounce animate-infinite animate-duration-[4000ms] pointer-events-none -z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>

        <div>
          <!-- Added an AI sparkle SVG and flex classes for alignment -->
          <div class="hero-badge flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-theme-primary animate-pulse animate-infinite"
            >
              <path
                d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
              />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            ការបង្កើតដោយ AI
          </div>
        </div>
        <div>
          <h3 class="hero-title">
            លឿន, ងាយស្រួល និង <br class="hero-title-br" /><span
              class="hero-title-highlight"
              >ឆ្លាតវៃ</span
            >
            <br />
            អ្នកបង្កើតទម្រង់ជាមួយ
            <!-- Gradient text for "AI" with an inline pulsing spark icon -->
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-[#5855F6] to-[#F0428A]"
              >AI</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#ai-gradient)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="inline-block ml-1 mb-2 animate-pulse animate-infinite"
            >
              <defs>
                <linearGradient
                  id="ai-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="#5855F6" />
                  <stop offset="100%" stop-color="#F0428A" />
                </linearGradient>
              </defs>
              <path
                d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
              />
            </svg>
          </h3>
        </div>
        <!-- <div>
                    <h3 class="hero-title">
                        Fast, Easy, and <br class="hero-title-br"><span class="hero-title-highlight">Smart</span> <br> 
                        Form Builder with 
                  
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#5855F6] to-[#F0428A]">AI</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#ai-gradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1 mb-2 animate-pulse animate-infinite">
                            <defs>
                                <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#5855F6" />
                                    <stop offset="100%" stop-color="#F0428A" />
                                </linearGradient>
                            </defs>
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                        </svg>
                    </h3>
                </div> -->
        <div>
          <p class="hero-description">
            <!-- Describe your ideal form in plain English, and watch our AI bring it to life instantly. 
                        No coding, no dragging and dropping—just pure, intelligent generation designed to save you hours. -->
            ពិពណ៌នាអំពីទ្រង់ទ្រាយអម្តរបស់អ្នកក្នុងភាសាអង់គ្លេសធម្មតា ហើយមើលឃើញ
            AI របស់យើងបង្កើតវា ប្រកាន់រយៈពេលភ្លាមៗ។ គ្មានការកូដ
            ឬការគាំទ្រទាញនិងទាញ - គ្រាន់តែជាការបង្កើតវាយ៉ាងប្លែក
            ដែលបានរចនាឡើងដើម្បីសន្សំសំចៃពេលវេលាអស់ម៉ោង។
          </p>
        </div>

        <!-- BUTTONS -->
        <div class="hero-actions">
          <!-- Added flex layout and a magic wand SVG to the primary button -->
          <button
            class="btn-primary flex items-center justify-center gap-2 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform group-hover:rotate-12"
            >
              <path
                d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"
              />
              <path d="m14 7 3 3" />
              <path d="M5 6v4" />
              <path d="M19 14v4" />
              <path d="M10 2v2" />
              <path d="M7 8H3" />
              <path d="M21 16h-4" />
              <path d="M11 3H9" />
            </svg>
            Generate Free with AI
          </button>
          <!-- demo link - opens video directly in a new tab -->
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary flex items-center justify-center gap-2 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform group-hover:scale-110"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            View Demo
          </a>
        </div>
      </div>

      <!-- RIGHT SECTION (Image) -->
      <div class="hero-image-section relative">
        <!-- Abstract glowing orb behind the image to reinforce the AI/Tech theme -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5855F6]/20 rounded-full blur-[80px] -z-10"
        ></div>

        <div class="hero-image-wrapper">
          <img
            src="../assets/Group 2.png"
            alt="AI Form Builder Hero Image"
            class="hero-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

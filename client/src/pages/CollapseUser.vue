<template>
  <section class="share-section">
    <div class="share-container">
      
      <!-- Header -->
      <div class="share-header">
        <div class="share-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
          </svg>
          One-Click Sharing
        </div>
        <h2 class="share-title">Distribute at scale</h2>
        <p class="share-subtitle">
          Send your generated forms to thousands of users instantly, or collaborate with specific team members in real-time.
        </p>
      </div>

      <!-- Interactive Diagram -->
      <div class="share-diagram">
        
        <!-- Left Side: The Form (Source) -->
        <div class="share-source">
          <div class="share-card group">
            <div class="share-icon-wrapper bg-indigo-50 text-[#5855F6] group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mt-4 text-center">Your AI Form</h3>
            <p class="text-xs text-gray-500 mt-1 text-center">Ready to deploy</p>
            
            <!-- Glowing background effect -->
            <div class="absolute inset-0 rounded-[24px] bg-[#5855F6] blur-xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        </div>

        <!-- Center: Animated SVG Connecting Lines (Desktop Only) -->
        <div class="share-lines-container hidden md:block">
          <svg class="share-svg" viewBox="0 0 200 300" preserveAspectRatio="none">
            <!-- Definitions for Gradients -->
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#CBD5E1" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#5855F6" stop-opacity="0.8" />
              </linearGradient>
            </defs>

            <!-- Base Paths (Faint background lines) -->
            <path class="share-path-base" d="M 0,150 C 100,150 100,50 200,50" />
            <path class="share-path-base" d="M 0,150 L 200,150" />
            <path class="share-path-base" d="M 0,150 C 100,150 100,250 200,250" />

            <!-- Animated Dash Paths (Data flowing) -->
            <path class="share-path-animated" d="M 0,150 C 100,150 100,50 200,50" />
            <path class="share-path-animated" d="M 0,150 L 200,150" />
            <path class="share-path-animated" d="M 0,150 C 100,150 100,250 200,250" />
          </svg>
        </div>

        <!-- Center: Mobile Vertical Line (Mobile Only) -->
        <div class="flex md:hidden justify-center py-6">
          <div class="w-1 h-16 bg-gradient-to-b from-[#CBD5E1]/30 to-[#5855F6]/80 rounded-full relative overflow-hidden">
             <div class="absolute top-0 left-0 w-full h-1/3 bg-[#5855F6] animate-flow-down"></div>
          </div>
        </div>

        <!-- Right Side: The Users (Targets) -->
        <div class="share-targets">
          
          <!-- User 1 -->
          <div class="share-user-card group">
            <div class="share-user-avatar">
              <img src="https://res.cloudinary.com/dvljcimlz/image/upload/v1774404983/photo_2026-03-25_09-14-44_boclwl.jpg" alt="Team Member" />
              <div class="share-status-dot"></div>
            </div>
            <div class="share-user-info">
              <h4 class="font-bold text-gray-900 text-sm">Internal Team</h4>
              <p class="text-[11px] text-gray-500">Collaborator Access</p>
            </div>
          </div>

          <!-- User 2 -->
          <div class="share-user-card group md:translate-x-6">
            <div class="share-user-avatar">
              <div class="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                200+
              </div>
              <div class="share-status-dot"></div>
            </div>
            <div class="share-user-info">
              <h4 class="font-bold text-gray-900 text-sm">Public Audience</h4>
              <p class="text-[11px] text-gray-500">Via Shareable Link</p>
            </div>
          </div>

          <!-- User 3 -->
          <div class="share-user-card group">
            <div class="share-user-avatar">
              <img src="https://res.cloudinary.com/dvljcimlz/image/upload/v1773715292/main-sample.png" alt="Client" />
              <div class="share-status-dot"></div>
            </div>
            <div class="share-user-info">
              <h4 class="font-bold text-gray-900 text-sm">Specific Clients</h4>
              <p class="text-[11px] text-gray-500">Email Invitation</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Purely visual component
</script>

<style scoped>
/* Scoped styles handled globally */
</style>
<template>
  <section class="team-section">
    <div class="team-container">
      
      <!-- Header -->
      <div class="team-header">
        <div class="team-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Our Team
        </div>
        <h2 class="team-title">Meet the minds behind លំហ.AI</h2>
        <p class="team-subtitle">
          We are a passionate group of engineers, designers, and creators dedicated to simplifying your data collection workflow.
        </p>
      </div>

      <!-- Team Grid -->
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.id" class="team-card group">
          
          <!-- Avatar -->
          <div class="team-avatar-wrapper">
            <!-- Profile Image (if available) -->
            <img v-if="member.image" :src="member.image" :alt="member.name" class="team-avatar object-cover" />
            
            <!-- Fallback: Dynamic gradient colors with initials -->
            <div v-else class="team-avatar" :class="member.gradient">
              {{ member.initials }}
            </div>
            
            <!-- Decorative outline that spins on hover -->
            <div class="team-avatar-ring"></div>
          </div>

          <!-- Info -->
          <div class="team-info">
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
          </div>

          <!-- 🌟 NEW: Tool Stack / Expertise -->
          <div class="team-tools">
            <div 
              v-for="(tool, index) in member.tools" 
              :key="index" 
              class="team-tool-icon" 
              :title="tool.name"
            >
              <span v-html="tool.icon"></span>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = ref([
    {
        id: 1,
        name: 'Ket Kakvey',
        role: 'Full Stack Developer',
        initials: 'KK',
        gradient: 'bg-gradient-to-br from-[#5855F6] to-[#8B5CF6]',
        image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1774405013/fp_46_of_194_k6hnqa.jpg',
        tools: [
            { name: 'VS Code', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
            { name: 'Database', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>' },
            { name: 'Git Workflow', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>' }
        ]
    },
    {
        id: 2,
        name: 'Suphan Chantra',
        role: 'Idea Support & Promotor',
        initials: 'SC',
        gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
        image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1774404983/photo_2026-03-25_09-14-44_boclwl.jpg',
        tools: [
            { name: 'Ideation', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>' },
            { name: 'Campaigns', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>' },
            { name: 'Growth', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' }
        ]
    },
    {
        id: 3,
        name: 'Rayuth',
        role: 'Graphics Designer & Digital Promotor',
        initials: 'R',
        gradient: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
        image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1774404982/photo_2026-03-25_09-14-54_qd6sou.jpg',
        tools: [
            { name: 'Vector Graphics', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>' },
            { name: 'Digital Marketing', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>' }
        ]
    },
    {
        id: 4,
        name: 'Hak Siv Hong',
        role: 'Supporter & Trainer',
        initials: 'HH',
        gradient: 'bg-gradient-to-br from-[#EC4899] to-[#BE185D]',
        image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1774404982/photo_2026-03-25_09-16-13_rqjyh2.jpg',
        tools: [
            { name: 'Customer Support', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>' },
            { name: 'Training & Documentation', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' }
        ]
    },
    {
        id: 5,
        name: 'Sor Si Ey',
        role: 'Graphics Designer & UI/UX Designer',
        initials: 'SE',
        gradient: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]',
        image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1774404983/photo_2026-03-25_09-15-06_lz4h8q.jpg',
        tools: [
            { name: 'Figma', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>' },
            { name: 'Wireframing', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>' },
            { name: 'Color Palette', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>' }
        ]
    }
]);
</script>
<template>
  <footer class="footer-section">
    <div class="footer-container">
      
      <!-- Top Section: Brand & Links -->
      <div class="footer-top">
        
        <!-- Brand Column -->
        <div class="footer-brand">
          <div class="footer-logo-wrapper">
            <!-- Vibrant Logo SVG Mimic -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#5855F6"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
            <span class="footer-logo-text">Lomh.AI Form</span>
          </div>
          <p class="footer-desc">
            Making creativity accessible, playful, and powerful for everyone.
          </p>
        </div>

        <!-- Links Columns -->
        <div class="footer-links-wrapper">
          
          <!-- Product -->
          <div>
            <h4 class="footer-heading">Product</h4>
            <div class="footer-list">
              <a href="#" class="footer-link">Features</a>
              <a href="#" class="footer-link">Pricing</a>
              <a href="#" class="footer-link">Showcase</a>
            </div>
          </div>

          <!-- Team (Changed from Company) -->
          <div>
            <h4 class="footer-heading">Our Team</h4>
            <div class="footer-list">
              <a href="#" class="footer-link">About</a>
              <!-- Changed from Careers -->
              <a href="#" class="footer-link">Join us</a>
              <!-- Changed from Blog -->
              <a href="#" class="footer-link">YouTube</a>
            </div>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="footer-heading">Locations</h4>
            <div class="footer-list">
              <a href="#" class="footer-link">Cambodia</a>
              <a href="#" class="footer-link">Battambang</a>
              <a href="#" class="footer-link">Phnom Penh</a>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Section: Copyright & Social -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © 2026 Lomh.AI Form. All rights reserved.
        </p>
        
        <div class="footer-social-wrapper">
          <!-- Social Icons Placeholders (Using subtle rounded squares to match the image) -->
          <div class="footer-social-icon"></div>
          <div class="footer-social-icon"></div>
          <div class="footer-social-icon"></div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
// No reactive state is strictly needed for the static footer at this stage,
// but you can easily add logic here later if you need dynamic links or a newsletter sign-up!
</script>
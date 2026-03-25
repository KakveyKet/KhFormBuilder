<template>
  <section class="cta-section">
    <div class="cta-container">
      <div class="cta-card">
        <!-- Decorative Background Shapes -->
        <div class="shape-top-left"></div>
        <div class="shape-bottom-right"></div>

        <!-- Content -->
        <div class="cta-content">
          <h2 class="cta-title">Ready to bring your ideas to life?</h2>
          <p class="cta-subtitle">
            Join the most playful community of creators. 
          </p>
          <router-link to="/generate" class="cta-button"
            >Start Building Today</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Cta",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

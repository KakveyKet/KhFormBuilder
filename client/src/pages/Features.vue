<template>
    <section class="features-section">
        <div class="features-container">
            <!-- HEADER -->
            <div class="features-header">
                <h2 class="features-title">Everything you need</h2>
                <p class="features-subtitle">Simple, powerful features to help you work better and faster.</p>
            </div>

            <!-- CARDS GRID -->
            <div class="features-grid">
                
                <!-- Card 1: Lightning Fast -->
                <div class="feature-card card-blue">
                    <div class="feature-icon-wrapper icon-blue text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon w-7 h-7">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                    </div>
                    <h3 class="feature-card-title">Lightning Fast</h3>
                    <p class="feature-card-text">
                        Built for speed from the ground up. Experience zero lag even with complex data sets.
                    </p>
                </div>

                <!-- Card 2: Pure Customization -->
                <div class="feature-card card-pink">
                    <div class="feature-icon-wrapper icon-pink text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon w-7 h-7">
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                    </div>
                    <h3 class="feature-card-title">Pure Customization</h3>
                    <p class="feature-card-text">
                        Tailor every pixel to your brand. No limits on how you present your creative vision.
                    </p>
                </div>

                <!-- Card 3: Real-time Collab -->
                <div class="feature-card card-yellow">
                    <div class="feature-icon-wrapper icon-yellow text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon w-7 h-7">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <h3 class="feature-card-title">Real-time Collab</h3>
                    <p class="feature-card-text">
                        Work together seamlessly with your team. Share feedback instantly and build together.
                    </p>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Features',
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>
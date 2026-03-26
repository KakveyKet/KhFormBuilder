<template>
    <section class="integrate-section">
        <div class="integrate-container">

            <!-- Header -->
            <div class="integrate-header">
                <div class="integrate-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Seamless Integrations
                </div>
                <h2 class="integrate-title">Collaborate with your favorite tools</h2>
                <p class="integrate-subtitle">
                    Instantly export your form data, generate reports, and sync responses directly to the Google
                    Workspace and Microsoft Office ecosystems.
                </p>
            </div>

            <!-- Integration Visual Hub -->
            <div class="integrate-hub">

                <!-- ================= LEFT SIDE: GOOGLE ================= -->
                <div class="integrate-group">
                    <!-- Google Docs -->
                    <div class="integrate-node group animate-wiggle animate-infinite animate-duration-[3500ms] animate-delay-[2500ms] animate-ease-in-out">
                        <div
                            class="integrate-icon bg-blue-50 text-blue-500 border-blue-100 group-hover:shadow-blue-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                            </svg>
                        </div>
                        <span class="integrate-label">Google Docs</span>
                    </div>

                    <!-- Horizontal Line (Desktop) / Vertical (Mobile) -->
                    <div class="integrate-line">
                        <div class="integrate-line-flow animate-flow-reverse"></div>
                    </div>

                    <!-- Google Sheets -->
                    <div class="integrate-node group animate-wiggle animate-infinite animate-duration-[3500ms] animate-delay-[2500ms] animate-ease-in-out">
                        <div
                            class="integrate-icon bg-emerald-50 text-emerald-500 border-emerald-100 group-hover:shadow-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-4 12v3h-2v-3H5v-2h3V9h2v3h3v2h-3zm4-5V3.5L18.5 9H14z" />
                            </svg>
                        </div>
                        <span class="integrate-label">Google Sheets</span>
                    </div>
                </div>

                <!-- ================= CENTER: LOMH.AI ================= -->
                <!-- Line connecting Left to Center -->
                <div class="integrate-line integrate-line-main">
                    <div class="integrate-line-flow animate-flow-reverse"></div>
                </div>

                <!-- Main Logo -->
                <div class="integrate-node integrate-center-node group z-10">
                    <div class="integrate-center-icon">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="group-hover:scale-110 transition-transform duration-500">
                            <rect width="32" height="32" rx="8" fill="white" />
                            <circle cx="16" cy="16" r="6" fill="#5855F6" />
                        </svg>
                        <!-- Glowing ring effect behind the logo -->
                        <div
                            class="absolute inset-0 rounded-2xl bg-[#5855F6] blur-xl opacity-40 -z-10 group-hover:opacity-60 transition-opacity duration-500">
                        </div>
                    </div>
                    <span class="integrate-label font-extrabold text-[#0F172A] mt-4">លំហ Form</span>
                </div>

                <!-- Line connecting Center to Right -->
                <div class="integrate-line integrate-line-main">
                    <div class="integrate-line-flow animate-flow-forward"></div>
                </div>

                <!-- ================= RIGHT SIDE: MICROSOFT ================= -->
                <div class="integrate-group">
                    <!-- Microsoft Word -->
                    <div class="integrate-node group animate-wiggle animate-infinite animate-duration-[3500ms] animate-delay-[2500ms] animate-ease-in-out">
                        <div
                            class="integrate-icon bg-blue-50 text-blue-600 border-blue-100 group-hover:shadow-blue-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm.4 13.6l-1.07-4.32-.15-1h-.04l-.15 1-1.14 4.31H10.1L8.5 10h1.56l.8 3.82.13.98h.03l.16-.98 1.12-3.82h1.36l1.1 3.82.16.98h.04l.13-.98.82-3.82H17.5l-1.6 5.6h-1.5z" />
                            </svg>
                        </div>
                        <span class="integrate-label">Microsoft Word</span>
                    </div>

                    <!-- Horizontal Line (Desktop) / Vertical (Mobile) -->
                    <div class="integrate-line">
                        <div class="integrate-line-flow animate-flow-forward"></div>
                    </div>

                    <!-- Microsoft Excel -->
                    <div class="integrate-node group animate-wiggle animate-infinite animate-duration-[3500ms] animate-delay-[2500ms] animate-ease-in-out">
                        <div
                            class="integrate-icon bg-green-50 text-green-600 border-green-100 group-hover:shadow-green-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm1.1 13.1l-1.7-2.6h-.04l-1.7 2.6H10l2.5-3.5L10.2 8h1.8l1.4 2.3h.04L14.9 8h1.7l-2.4 3.6 2.6 3.5h-1.7z" />
                            </svg>
                        </div>
                        <span class="integrate-label">Microsoft Excel</span>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script setup>
// This component is purely visual. No complex logic required.
</script>

<style scoped>
/* Animations specific to the data flow lines */
@keyframes flow-forward {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

@keyframes flow-reverse {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes flow-down {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(100%);
    }
}

@keyframes flow-up {
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(-100%);
    }
}

.animate-flow-forward {
    animation: flow-forward 2s linear infinite;
}

.animate-flow-reverse {
    animation: flow-reverse 2s linear infinite;
}

/* Mobile specific flow animations (vertical) */
@media (max-width: 1023px) {
    .animate-flow-forward {
        animation: flow-down 2s linear infinite;
    }

    .animate-flow-reverse {
        animation: flow-up 2s linear infinite;
    }
}
</style>
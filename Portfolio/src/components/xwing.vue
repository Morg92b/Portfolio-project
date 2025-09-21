<script setup>
import xwingImage from '@/assets/xwing.png'
</script>

<template>
    <div class="spaceship" :style="{ backgroundImage: `url(${xwingImage})` }"></div>
</template>

<style scoped>
.spaceship {
    width: 64px;
    height: 64px;
    background-position: -50px 0;
    background-repeat: no-repeat;
    background-size: 256px 128px;
    image-rendering: pixelated;
    animation: engine-glow 0.8s ease-in-out infinite alternate, fly 6s linear infinite;
    transform: scaleX(-1);
    position: absolute;
    top: 20vh;
    left: 0;
    z-index: 1;
}

@keyframes engine-glow {
    from {
        filter: brightness(1);
    }

    to {
        filter: brightness(1.3) drop-shadow(0 0 10px orange);
    }
}

@keyframes fly {
    0% {
        transform: translateX(-100px) translateY(0);
    }

    25% {
        transform: translateX(25vw) translateY(50px);
    }

    50% {
        transform: translateX(50vw) translateY(0);
    }

    75% {
        transform: translateX(75vw) translateY(50px);
    }

    100% {
        transform: translateX(calc(100vw + 100px)) translateY(0);
    }
}
</style>
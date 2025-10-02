<template>
    <div class="game-page">
        <SpaceButton to="/" label="Back" position="top-center" />
        <MiniGame />
    </div>
</template>

<script setup>
import MiniGame from '@/components/MiniGame.vue';
import SpaceButton from '@/components/SpaceButton.vue';
</script>

<style scoped>
.game-page {
    position: relative;
    min-height: 100vh;
    padding-top: 80px;
}

/* Adaptation mobile */
@media (max-width: 768px) {
    .game-page {
        padding-top: 60px;
    }
}

@media (max-height: 700px) {
    .game-page {
        padding-top: 50px;
    }
}
</style>
<template>
    <div class="play-button-wrapper">
        <RouterLink to="/game">
            <button class="game-button">Let's play</button>
        </RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.play-button-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2000;
    margin-top: 120px;
    margin-right: 50px;
}

.game-button {
    padding: 0.5rem 1rem;
    background-color: #222;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.game-button:hover {
    background-color: #444;
}
</style>

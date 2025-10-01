<template>
    <div>
        <SpaceButton to="/" label="Back" position="center" />
        <MiniGame />
    </div>
</template>


<script setup>
import MiniGame from '@/components/MiniGame.vue';
import SpaceButton from '@/components/SpaceButton.vue';
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
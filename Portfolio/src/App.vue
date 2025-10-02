<script setup>
import { onMounted, ref } from 'vue'
import xwing from './components/xwing.vue'
import AOS from 'aos'

const backgroundStars = ref([])
const starField1 = ref([])
const starField2 = ref([])

function generateStars(arr, count, speedRange) {
    for (let i = 0; i < count; i++) {
        arr.value.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0])
        })
    }
}

onMounted(() => {
    generateStars(backgroundStars, 100, [0, 0])
    generateStars(starField1, 80, [10, 20])
    generateStars(starField2, 60, [5, 10])

    AOS.init({
        once: false,
        mirror: true,
        duration: 800,
        easing: 'ease-in-out',
        anchorPlacement: 'top-bottom',
        offset: 150
    })

    window.addEventListener('scroll', () => {
        setTimeout(() => {
            AOS.refreshHard()
        }, 200)
    })
})
</script>

<template>
    <div class="app">
        <!-- Fond Star Wars -->
        <div class="star-wars-space">
            <div class="star-field star-field-1">
                <div v-for="star in starField1" :key="star.id" class="moving-star" :style="{
                    top: star.y + '%',
                    left: star.x + '%',
                    animationDelay: star.delay + 's',
                    animationDuration: star.duration + 's'
                }"></div>
            </div>

            <div class="star-field star-field-2">
                <div v-for="star in starField2" :key="star.id" class="moving-star moving-star-fast" :style="{
                    top: star.y + '%',
                    left: star.x + '%',
                    animationDelay: star.delay + 's',
                    animationDuration: star.duration + 's'
                }"></div>
            </div>

            <div class="background-stars">
                <div v-for="star in backgroundStars" :key="star.id" class="background-star" :style="{
                    left: star.x + '%',
                    top: star.y + '%',
                    animationDelay: star.delay + 's'
                }"></div>
            </div>

            <div class="distant-nebula nebula-blue"></div>
            <div class="distant-nebula nebula-purple"></div>
            <div class="distant-nebula nebula-red"></div>

            <xwing />
        </div>

        <!-- Affichage des pages -->
        <RouterView />
    </div>
</template>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
}

/* Fond Star Wars */
.star-wars-space {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #1a1a2e, #0f0f23);
    z-index: -1;
    overflow: hidden;
}

.star-field {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.moving-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation-name: moveStar;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.moving-star-fast {
    background: #87ceeb;
    width: 1.5px;
    height: 1.5px;
}

@keyframes moveStar {
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        transform: translateX(100vw);
        opacity: 0;
    }
}

.background-stars {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.background-star {
    position: absolute;
    width: 1.5px;
    height: 1.5px;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {

    0%,
    100% {
        opacity: 0.2;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.3);
    }
}

.distant-nebula {
    position: absolute;
    width: 400px;
    height: 400px;
    filter: blur(100px);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.nebula-blue {
    top: 20%;
    left: 10%;
    background: radial-gradient(circle, rgba(100, 149, 237, 0.3) 0%, transparent 70%);
}

.nebula-purple {
    top: 60%;
    left: 70%;
    background: radial-gradient(circle, rgba(186, 85, 211, 0.3) 0%, transparent 70%);
}

.nebula-red {
    top: 80%;
    left: 20%;
    background: radial-gradient(circle, rgba(255, 69, 0, 0.3) 0%, transparent 70%);
}
</style>

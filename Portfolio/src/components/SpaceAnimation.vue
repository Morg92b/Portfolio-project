<template>
  <div class="space-background">
    <!-- Étoiles fixes -->
    <div class="stars">
      <div v-for="star in stars" :key="star.id" 
           class="star" 
           :style="{ 
             left: star.x + '%', 
             top: star.y + '%',
             animationDelay: star.delay + 's',
             animationDuration: star.duration + 's'
           }">
      </div>
    </div>

    <!-- Particules flottantes -->
    <div class="particles">
      <div v-for="particle in particles" :key="particle.id"
           class="particle"
           :style="{
             left: particle.x + '%',
             top: particle.y + '%',
             animationDelay: particle.delay + 's',
             animationDuration: particle.duration + 's',
             width: particle.size + 'px',
             height: particle.size + 'px'
           }">
      </div>
    </div>

    <!-- Nébuleuse en arrière-plan -->
    <div class="nebula nebula-1"></div>
    <div class="nebula nebula-2"></div>
    <div class="nebula nebula-3"></div>

    <!-- Contenu par-dessus l'animation -->
    <div class="content-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Génération des étoiles
const stars = ref([])
const particles = ref([])

const generateStars = () => {
  const starArray = []
  for (let i = 0; i < 150; i++) {
    starArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    })
  }
  stars.value = starArray
}

const generateParticles = () => {
  const particleArray = []
  for (let i = 0; i < 30; i++) {
    particleArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 4
    })
  }
  particles.value = particleArray
}

onMounted(() => {
  generateStars()
  generateParticles()
})
</script>

<style scoped>
.space-background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0c0c1e 100%);
  overflow: hidden;
}

/* Étoiles scintillantes */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle infinite ease-in-out;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
}

.star:nth-child(3n) {
  background: #87ceeb;
  box-shadow: 0 0 6px rgba(135, 206, 235, 0.8);
}

.star:nth-child(5n) {
  background: #ffd700;
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
}

.star:nth-child(7n) {
  background: #ff69b4;
  box-shadow: 0 0 6px rgba(255, 105, 180, 0.8);
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Particules flottantes */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float infinite linear;
}

.particle:nth-child(2n) {
  background: rgba(135, 206, 235, 0.4);
}

.particle:nth-child(3n) {
  background: rgba(255, 215, 0, 0.3);
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Nébuleuses */
.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: nebula-drift 20s infinite ease-in-out;
}

.nebula-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.nebula-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 191, 255, 0.08) 0%, transparent 70%);
  top: 60%;
  right: 15%;
  animation-delay: -7s;
}

.nebula-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 20, 147, 0.06) 0%, transparent 70%);
  bottom: 30%;
  left: 60%;
  animation-delay: -14s;
}

@keyframes nebula-drift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -20px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 30px) scale(0.9);
  }
}

/* Contenu par-dessus */
.content-overlay {
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100vh;
}

/* Effet de profondeur */
.space-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .nebula {
    filter: blur(20px);
  }
  
  .nebula-1, .nebula-2, .nebula-3 {
    width: 200px;
    height: 200px;
  }
}
</style>
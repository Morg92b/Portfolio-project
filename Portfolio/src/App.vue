<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    once: false,
    mirror: true,
    duration: 800,
    easing: 'ease-in-out',
    anchorPlacement: 'top-bottom',
    offset: 150
  })
});

window.addEventListener('scroll', () => {
  setTimeout(() => {
    AOS.refreshHard();
  }, 200);
});



</script>

<template>
  <div class="app">
    <Header />
    <main>
      <Hero data-aos="fade-up" data-aos-anchor-placement="top-center" />
      <About data-aos="fade-up" data-aos-anchor-placement="top-center" />
      <Skills data-aos="fade-up" data-aos-anchor-placement="top-center" />
      <Projects data-aos="fade-up" data-aos-anchor-placement="top-center" />
      <Contact data-aos="fade-up" data-aos-anchor-placement="top-center" />
    </main>
    <Footer />
  </div>
</template>


<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

body {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Play from '@/components/Play.vue'
import AOS from 'aos'
import { onMounted } from 'vue'

onMounted(() => {
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
    <Header />

    <main>
        <Play />
        <Hero data-aos="fade-up" data-aos-anchor-placement="top-center" />
        <About data-aos="fade-up" data-aos-anchor-placement="top-center" />
        <Skills data-aos="fade-up" data-aos-anchor-placement="top-center" />
        <Projects data-aos="fade-up" data-aos-anchor-placement="top-center" />
        <Contact data-aos="fade-up" data-aos-anchor-placement="top-center" />
    </main>

    <Footer />
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 2rem;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => {
    AOS.init({
        once: false,
        mirror: true,
        duration: 800,
        easing: 'ease-in-out',
        anchorPlacement: 'top-bottom'
    });
});


const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
];

const isMenuOpen = ref(false);


const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};


const handleNavClick = (href) => {
    isMenuOpen.value = false;
    setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            AOS.refreshHard();
        }
    }, 300);
};
</script>

<template>
    <header class="header">
        <div class="container">
            <a href="#" class="logo">
                <img src="../assets/swlogo2t.png" alt="Portfolio Logo">
            </a>

            <nav :class="{ 'active': isMenuOpen }">
                <ul>
                    <li v-for="link in navLinks" :key="link.name">
                        <a :href="link.href" @click="handleNavClick(link.href)">{{ link.name }}</a>
                    </li>
                </ul>
            </nav>

            <button class="menu-toggle" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    height: 80px;
    display: flex;
    align-items: center;
}

.container {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.logo {
    margin-right: auto;
}

.logo img {
    height: 50px;
    width: auto;
    display: block;
}

nav {
    flex: 1;
    display: flex;
    justify-content: center;
}

nav ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
}

nav a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

nav a:hover {
    color: var(--primary-color);
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
    transition: all 0.3s;
}

@media (max-width: 768px) {
    nav {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: #2c3e50;
        padding: 1rem;
        transform: translateY(-150%);
        transition: transform 0.3s;
    }

    nav.active {
        transform: translateY(0);
    }

    nav ul {
        flex-direction: column;
        gap: 1rem;
    }

    .menu-toggle {
        display: block;
    }
}
</style>

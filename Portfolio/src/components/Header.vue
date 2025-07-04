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
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

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

/* Style futuriste Star Wars pour les liens */
nav a {
    color: #eee;
    text-decoration: none;
    position: relative;
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.05em;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    text-shadow:
        0 0 5px #4fc3f7,
        0 0 10px #4fc3f7,
        0 0 20px #4fc3f7;
}

nav a::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 2px;
    background: #4fc3f7;
    box-shadow: 0 0 8px #4fc3f7, 0 0 15px #4fc3f7;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 2px;
}

nav a:hover {
    color: #4fc3f7;
    text-shadow:
        0 0 10px #4fc3f7,
        0 0 20px #4fc3f7,
        0 0 30px #4fc3f7,
        0 0 40px #4fc3f7;
    animation: neonPulse 1.5s infinite alternate;
}

nav a:hover::before {
    opacity: 1;
}

@keyframes neonPulse {
    from {
        text-shadow:
            0 0 10px #4fc3f7,
            0 0 20px #4fc3f7,
            0 0 30px #4fc3f7,
            0 0 40px #4fc3f7;
    }

    to {
        text-shadow:
            0 0 15px #80d8ff,
            0 0 25px #80d8ff,
            0 0 40px #80d8ff,
            0 0 50px #80d8ff;
    }
}

/* Menu toggle (mobile) */
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

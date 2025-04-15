<script setup>
const socialLinks = [
    { name: 'GitHub', icon: 'github', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
]
</script>

<template>
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Hi, I'm <span>Morgan</span></h1>
                <h2>Fullstack Developer</h2>
                <p>I build digital experiences with Vue.js and modern web technologies.</p>

                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Contact Me</a>
                    <a href="#projects" class="btn btn-secondary">View Work</a>
                </div>

                <div class="social-links">
                    <a v-for="link in socialLinks" :key="link.name" :href="link.url" :aria-label="link.name"
                        target="_blank" rel="noopener noreferrer">
                        <i :class="`fab fa-${link.icon}`"></i>
                    </a>
                </div>
            </div>

            <div class="hero-image">
                <img src="../assets/morgan.png" alt="Developer illustration">
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    padding: 8rem 0 4rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: #f8f9fa;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    gap: 2rem;
}

.hero-content {
    max-width: 600px;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero h1 span {
    color: var(--primary-color);
}

.hero h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 1.5rem;
    color: #555;
}

.hero p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #666;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-color);
}

.btn-secondary {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}

.btn-secondary:hover {
    background-color: var(--primary-color);
    color: white;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9ecef;
    color: #2c3e50;
    transition: all 0.3s;
}

.social-links a:hover {
    background-color: var(--primary-color);
    color: white;
}

.hero-image {
    max-width: 500px;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px var(--primary-color);
}

@media (max-width: 992px) {
    .container {
        flex-direction: column;
        text-align: center;
    }

    .hero-buttons {
        justify-content: center;
    }

    .social-links {
        justify-content: center;
    }

    .hero-image {
        margin-top: 3rem;
    }
}

@media (max-width: 576px) {
    .hero h1 {
        font-size: 2.2rem;
    }

    .hero h2 {
        font-size: 1.2rem;
    }

    .hero-buttons {
        flex-direction: column;
    }
}
</style>
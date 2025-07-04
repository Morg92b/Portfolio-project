<script setup>
const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/Morg92b' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/morgan-bouaziz-50a2811b6/' },
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
                    <a href="/MorganBouazizCVFullstack.pdf" class="btn btn-tertiary" target="_blank"
                        rel="noopener noreferrer">Curriculum vitæ</a>
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
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.hero h1 span {
    color: #4fc3f7;
    text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
}

.hero h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
    text-shadow: none;
}

.btn-primary {
    background-color: #4fc3f7;
    color: white;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.3);
}

.btn-primary:hover {
    background-color: #29b6f6;
    box-shadow: 0 0 20px rgba(79, 195, 247, 0.5);
}

.btn-secondary {
    border: 1px solid #4fc3f7;
    color: #4fc3f7;
    background: rgba(79, 195, 247, 0.1);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    background-color: #4fc3f7;
    color: white;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.3);
}

.btn-tertiary {
    border: 1px solid #4fc3f7;
    color: #4fc3f7;
    background: rgba(79, 195, 247, 0.1);
    backdrop-filter: blur(10px);
}

.btn-tertiary:hover {
    background-color: #4fc3f7;
    color: white;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.3);
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
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-links a:hover {
    background-color: #4fc3f7;
    color: white;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.5);
}

.hero-image {
    max-width: 500px;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(79, 195, 247, 0.3);
    border: 2px solid rgba(79, 195, 247, 0.2);
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
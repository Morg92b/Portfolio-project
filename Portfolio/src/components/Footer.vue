<script setup>
const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
]

const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/Morg92b' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/morgan-bouaziz-50a2811b6/' },
]
</script>

<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-about">
                    <h3>Portfolio</h3>
                    <p>A showcase of my work and skills as a fullstack developer.</p>
                </div>

                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li v-for="link in footerLinks" :key="link.name">
                            <a :href="link.href">{{ link.name }}</a>
                        </li>
                    </ul>
                </div>

                <div class="footer-social">
                    <h4>Follow Me</h4>
                    <div class="social-icons">
                        <a v-for="link in socialLinks" :key="link.name" :href="link.url" :aria-label="link.name"
                            target="_blank" rel="noopener noreferrer">
                            <i :class="`fab fa-${link.icon}`"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ new Date().getFullYear() }} Morgan Bouaziz. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

.footer {
    background-color: #2c3e50;
    color: white;
    padding: 3rem 0 1rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin-bottom: 2rem;
}

.footer-about h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    color: #4fc3f7;
    text-shadow:
        0 0 5px #4fc3f7,
        0 0 10px #4fc3f7,
        0 0 20px #4fc3f7;
}

.footer-about p {
    color: #bbb;
    line-height: 1.6;
}

.footer-links h4,
.footer-social h4 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    color: #4fc3f7;
    text-shadow:
        0 0 5px #4fc3f7,
        0 0 10px #4fc3f7;
}

.footer-links h4::after,
.footer-social h4::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 2px;
    background-color: #4fc3f7;
    box-shadow: 0 0 8px #4fc3f7, 0 0 15px #4fc3f7;
    border-radius: 2px;
}

.footer-links ul {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.8rem;
}

/* Style futuriste Star Wars pour les liens du footer */
.footer-links a {
    color: #eee;
    text-decoration: none;
    position: relative;
    padding: 0.3rem 0.8rem;
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.05em;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    text-shadow:
        0 0 3px #4fc3f7,
        0 0 6px #4fc3f7,
        0 0 12px #4fc3f7;
    display: inline-block;
}

.footer-links a::before {
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

.footer-links a:hover {
    color: #4fc3f7;
    text-shadow:
        0 0 10px #4fc3f7,
        0 0 20px #4fc3f7,
        0 0 30px #4fc3f7,
        0 0 40px #4fc3f7;
    animation: neonPulse 1.5s infinite alternate;
}

.footer-links a:hover::before {
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

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s;
    position: relative;
    font-size: 1.1rem;
    border: 2px solid transparent;
}

.social-icons a:hover {
    background-color: transparent;
    color: #4fc3f7;
    border: 2px solid #4fc3f7;
    box-shadow:
        0 0 15px #4fc3f7,
        inset 0 0 15px rgba(79, 195, 247, 0.2);
    transform: translateY(-3px);
    text-shadow:
        0 0 10px #4fc3f7,
        0 0 20px #4fc3f7;
}

.social-icons a::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(79, 195, 247, 0.3) 0%, transparent 70%);
    transition: all 0.3s;
    transform: translate(-50%, -50%);
}

.social-icons a:hover::before {
    width: 60px;
    height: 60px;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(79, 195, 247, 0.3);
    color: #bbb;
    font-size: 0.9rem;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.05em;
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .footer-links h4::after,
    .footer-social h4::after {
        left: 50%;
        transform: translateX(-50%);
    }

    .social-icons {
        justify-content: center;
    }
}
</style>
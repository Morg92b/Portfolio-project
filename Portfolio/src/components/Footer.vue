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
}

.footer-links h4::after,
.footer-social h4::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 2px;
    background-color: var(--primary-color);
}

.footer-links ul {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.8rem;
}

.footer-links a {
    color: #bbb;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: var(--primary-color);
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
}

.social-icons a:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #bbb;
    font-size: 0.9rem;
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
<script setup>
const aboutText = `
Passionate about web development and creating dynamic, I successfully completed my first year at Holberton School, where I gained strong full-stack development skills.

I am looking for a 24-month apprenticeship in full-stack development, starting in September 2025, to further develop my skills and contribute to exciting, challenging projects.
`;
</script>

<template>
    <section id="about" class="about">
        <div class="container">
            <div class="section-header">
                <h2>About Me</h2>
                <p>Get to know me better</p>
            </div>

            <div class="about-content">
                <div class="about-text">
                    <h3>Who am I?</h3>
                    <p>{{ aboutText }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.about {
    padding: 5rem 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-header h2 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.section-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.about-content {
    display: flex;
    justify-content: center;
}

.about-text {
    max-width: 700px;
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-text h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.about-text p {
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
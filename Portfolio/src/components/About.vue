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
    background-color: white;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-header h2 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: #777;
    font-size: 1.1rem;
}

.about-content {
    display: flex;
    justify-content: center;
}

.about-text {
    max-width: 700px;
    text-align: center;
}

.about-text h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
}

.about-text p {
    line-height: 1.8;
    color: #555;
    margin-bottom: 1.5rem;
}
</style>

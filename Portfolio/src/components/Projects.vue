<script setup>
import { ref } from 'vue';
import logovb from '../assets/logovb.png';
import logomini from '../assets/logomini.png';
import logogit from '../assets/logogithub.jpg';

const showVideo = ref(false);
const currentVideo = ref('');

const openVideo = (videoUrl) => {
    currentVideo.value = videoUrl
    showVideo.value = true
};

const closeVideo = (videoUrl) => {
    showVideo.value = false
    currentVideo.value = ' '
};

const projects = [
    {
        id: 1,
        title: 'Vibebox',
        description: "A site to share Spotify playlists, discover new tracks, and highlight underrated artists",
        tags: ['Vue.js', 'Node.js', 'MongoDB'],
        image: logovb,
        link: 'https://vibebox-one.vercel.app/',
        github: 'https://github.com/Morg92b/Vibebox'
    },
    {
        id: 2,
        title: 'Mini-Racers',
        description: "A video game and website project made by me and my team — the site lets you explore the game's content and download it after signing up and logging in.",
        tags: ['Vue.js', 'Node.js', 'MongoDB', 'Unity', 'C#'],
        image: logomini,
        link: 'https://mini-racers.vercel.app/',
        github: 'https://github.com/S1even/Mini-Racers',
        video: 'https://www.youtube.com/embed/t693zvazigM?start=990'
    },
    {
        id: 3,
        title: 'Other project',
        description: "Thanks to Holberton, I had the opportunity to work on multiple projects that helped me learn and apply programming concepts in real situations. These experiences allowed me to develop my skills in various languages and tools. I invite you to take a look at my GitHub to see the work I've done!",
        tags: ['HTML/CSS', 'JavaScript', 'C', 'Python',],
        image: logogit,
        github: 'https://github.com/Morg92b?tab=repositories'
    }
];
</script>

<template>
    <section id="projects" class="projects">
        <div class="container">
            <div class="section-header">
                <h2>My Projects</h2>
                <p>Here are some of my latest works.</p>
            </div>

            <div class="projects-grid">
                <div v-for="project in projects" :key="project.id" class="project-card">
                    <div class="project-image">
                        <img :src="project.image" :alt="project.title">
                    </div>
                    <div class="project-content">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                        <div class="project-tags">
                            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                        </div>
                        <div class="project-links">
                            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                            <a :href="project.github" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github"></i> Code
                            </a>
                            <a v-if="project.video" @click.prevent="openVideo(project.video)" href="#">
                                <i class="fas fa-play"></i> Watch Demo Day
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showVideo" class="video-modal" @click.self="closeVideo">
            <div class="video-container">
                <iframe :src="currentVideo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <button class="close-btn" @click="closeVideo">✕</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.projects {
    padding: 5rem 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-header h2 {
    font-size: 2.5rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.section-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(79, 195, 247, 0.3);
    border-color: rgba(79, 195, 247, 0.5);
}

.project-image {
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}

.project-content h3 {
    font-size: 1.5rem;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.project-content p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.project-tags span {
    background: rgba(79, 195, 247, 0.2);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #4fc3f7;
    border: 1px solid rgba(79, 195, 247, 0.3);
}

.project-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.project-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #4fc3f7;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s;
    text-shadow: none;
}

.project-links a:hover {
    background-color: #29b6f6;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.5);
}

.project-links a i {
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.video-container {
    position: relative;
    width: 90%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
    background: black;
}

.video-container iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 1rem;
}
</style>
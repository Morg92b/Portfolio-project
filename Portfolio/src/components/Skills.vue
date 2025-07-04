<script setup>
import html from "../assets/Logo/html.png";
import css from "../assets/Logo/css.png";
import js from "../assets/Logo/js.png";
import python from "../assets/Logo/python.png";
import c from "../assets/Logo/C.png";
import vue from "../assets/Logo/vuejs.png";
import mongodb from "../assets/Logo/mongodb.png";
import mysql from "../assets/Logo/Mysql.png";
import flask from "../assets/Logo/flask.png";
import nodejs from "../assets/Logo/node.png";
import git from "../assets/Logo/git.png";
import postman from "../assets/Logo/postman.png";
import vscode from "../assets/Logo/vscode.png";
import firebase from "../assets/Logo/logofirebase.png";

const skillCategories = [
    {
        title: "Languages ​​and technologies",
        skills: [
            { name: "HTML", icon: html },
            { name: "CSS", icon: css },
            { name: "JavaScript", icon: js },
            { name: "Python", icon: python },
            { name: "C", icon: c }
        ]
    },
    {
        title: "Frameworks and databases",
        skills: [
            { name: "Vue.js", icon: vue },
            { name: "MongoDB", icon: mongodb },
            { name: "MySQL", icon: mysql },
            { name: "Flask", icon: flask },
            { name: "Node.js", icon: nodejs },
            { name: "Firebase", icon: firebase }
        ]
    },
    {
        title: "Tools and platforms",
        skills: [
            { name: "GitHub", icon: git },
            { name: "Postman", icon: postman },
            { name: "VS Code", icon: vscode }
        ]
    }
];
</script>

<template>
    <section id="skills" class="skills">
        <div class="container">
            <div class="section-header">
                <h2>My Skills</h2>
                <p>Technologies I work with</p>
            </div>

            <div class="skills-categories">
                <div v-for="category in skillCategories" :key="category.title" class="skill-category">
                    <h3>{{ category.title }}</h3>
                    <div class="skills-grid">
                        <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                            <img :src=skill.icon :alt="skill.name" class="skill-logo" />
                            <h4>{{ skill.name }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.skills {
    padding: 5rem 0;
    min-height: auto;
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
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.section-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.skills-categories {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.skill-category h3 {
    text-align: center;
    font-size: 1.0rem;
    color: #4fc3f7;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 2rem;
    justify-content: center;
}

.skill-item {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
}

.skill-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(79, 195, 247, 0.3);
    border-color: rgba(79, 195, 247, 0.5);
}

.skill-logo {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

h4 {
    font-size: 1.1rem;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
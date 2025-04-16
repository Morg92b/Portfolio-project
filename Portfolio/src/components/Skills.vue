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
            { name: "Node.js", icon: nodejs }
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
    background-color: #f8f9fa;
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

.skills-categories {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.skill-category h3 {
    text-align: center;
    font-size: 1.0rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 2rem;
    justify-content: center;
}

.skill-item {
    text-align: center;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.skill-logo {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
}

h4 {
    font-size: 1.1rem;
    color: #2c3e50;
}
</style>

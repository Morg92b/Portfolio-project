<template>
    <button type="button" class="btn" :class="position" @click="handleClick">
        <strong>{{ label }}</strong>
        <div id="container-stars">
            <div id="stars"></div>
        </div>
        <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
    to: { type: String, required: true },
    label: { type: String, required: true },
    position: { type: String, default: "default" }
});

const router = useRouter();

const handleClick = () => {
    router.push(props.to);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

.btn {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 10rem;
    overflow: hidden;
    height: 3rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
        linear-gradient(137.48deg,
            #ffdb3b 10%,
            #fe53bb 45%,
            #8f51ea 67%,
            #0044ff 87%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 9999;
}

#container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
}

strong {
    z-index: 2;
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
}

#glow {
    position: absolute;
    display: flex;
    width: 9rem;
}

.right {
    top: 5.5rem;
    right: 2rem;
    transform: none;
}

.center {
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
}

.circle {
    width: 100%;
    height: 20px;
    filter: blur(1.5rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
}

.circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
}

.btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
}

.btn:active .circle {
    background: #fe53bb;
}

#stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
}

#stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
}

#stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
}

#stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
}

#stars::before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
}

.top-center {
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
}

.center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
    .top-center {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .right {
        top: 1rem;
        right: 1rem;
        transform: none;
    }
}

@media (max-height: 700px) {
    .top-center {
        top: 0.5rem;
    }

    .btn {
        width: 5rem;
        height: 2rem;
    }

    strong {
        font-size: 10px;
        letter-spacing: 3px;
    }
}

@keyframes animStar {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-135rem);
    }
}

@keyframes animStarRotate {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0);
    }
}

@keyframes gradient_301 {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes pulse_3011 {
    0% {
        transform: scale(0.75);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.75);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}

@media (max-width: 768px) {
    .right {
        top: 6rem;
        left: 50%;
        right: auto;
        transform: translate(-50%);
        width: 100px;
        height: 30px;
        display: none;
    }

    .center {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
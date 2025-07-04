<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

const submitForm = async () => {
    isSubmitting.value = true;
    submitSuccess.value = false;
    submitError.value = false;

    try {
        const response = await fetch("https://formspree.io/f/mnnprrvw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(form.value)
        });

        const result = await response.json();
        if (response.ok) {
            submitSuccess.value = true;
            form.value = { name: '', email: '', subject: '', message: '' };

            setTimeout(() => {
                submitSuccess.value = false;
            }, 5000);
        } else {
            submitError.value = true;
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        submitError.value = true;
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <section id="contact" class="contact">
        <div class="container">
            <div class="section-header">
                <h2>Contact Me</h2>
                <p>Get in touch</p>
            </div>

            <div class="contact-content">
                <div class="contact-info">
                    <h3>Let's talk about everything!</h3>
                    <p>Feel free to reach out for collaborations or just a friendly hello.</p>

                    <ul class="info-list">
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>morgan.bouaziz@outlook.fr</span>
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>France</span>
                        </li>
                    </ul>

                    <div class="social-links">
                        <a href="https://github.com/Morg92b" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/morgan-bouaziz-50a2811b6/" aria-label="LinkedIn"><i
                                class="fab fa-linkedin"></i></a>
                    </div>
                </div>

                <form @submit.prevent="submitForm" class="contact-form">
                    <div class="form-group">
                        <input type="text" v-model="form.name" placeholder="Your Name" required>
                    </div>

                    <div class="form-group">
                        <input type="email" v-model="form.email" placeholder="Your Email" required>
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="form.subject" placeholder="Subject" required>
                    </div>

                    <div class="form-group">
                        <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>
                    </div>

                    <button type="submit" class="submit-btn" :disabled="isSubmitting">
                        <span v-if="!isSubmitting">Send Message</span>
                        <span v-else>Sending...</span>
                    </button>

                    <div v-if="submitSuccess" class="alert success">
                        <i class="fas fa-check-circle"></i>
                        <span>Your message has been sent successfully!</span>
                    </div>

                    <div v-if="submitError" class="alert error">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>There was an error sending your message. Please try again.</span>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact {
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
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.section-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.contact-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.contact-info h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.contact-info p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.info-list {
    list-style: none;
    margin-bottom: 2rem;
}

.info-list li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.info-list i {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4fc3f7;
    color: white;
    border-radius: 50%;
    margin-right: 1rem;
    box-shadow: 0 0 10px rgba(79, 195, 247, 0.3);
}

.info-list span {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
    background: rgba(255, 255, 255, 0.1);
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

.contact-form {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(5px);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #4fc3f7;
    box-shadow: 0 0 10px rgba(79, 195, 247, 0.3);
}

.form-group textarea {
    resize: vertical;
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background-color: #4fc3f7;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    text-shadow: none;
}

.submit-btn:hover {
    background-color: #29b6f6;
    box-shadow: 0 0 15px rgba(79, 195, 247, 0.5);
}

.submit-btn:disabled {
    background-color: rgba(79, 195, 247, 0.5);
    cursor: not-allowed;
}

.alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
    backdrop-filter: blur(10px);
}

.alert.success {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
    border: 1px solid rgba(76, 175, 80, 0.3);
}

.alert.error {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
}

.alert i {
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
    }
}
</style>
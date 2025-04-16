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

.section-header p {
    color: #777;
    font-size: 1.1rem;
}

.contact-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.contact-info h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

.contact-info p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
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
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    margin-right: 1rem;
}

.info-list span {
    color: #555;
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
    background-color: #e9ecef;
    color: #2c3e50;
    transition: all 0.3s;
}

.social-links a:hover {
    background-color: var(--primary-color);
    color: white;
}

.contact-form {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.form-group textarea {
    resize: vertical;
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: var(--primary-color);
}

.submit-btn:disabled {
    background-color: #41b0db;
    cursor: not-allowed;
}

.alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
}

.alert.success {
    background-color: #d4edda;
    color: #41b0db;
}

.alert.error {
    background-color: #f8d7da;
    color: #721c24;
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
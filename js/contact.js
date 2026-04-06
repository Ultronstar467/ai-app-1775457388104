document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('main-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status mt-2'; // Reset class

            if (name === '') {
                displayFormStatus('Please enter your name.', 'error');
                isValid = false;
            } else if (email === '' || !validateEmail(email)) {
                displayFormStatus('Please enter a valid email address.', 'error');
                isValid = false;
            } else if (subject === '') {
                displayFormStatus('Please enter the subject of your message.', 'error');
                isValid = false;
            } else if (message === '') {
                displayFormStatus('Please enter your message.', 'error');
                isValid = false;
            }

            if (isValid) {
                // Simulate sending data (in a real app, this would be an AJAX request)
                console.log('Contact Form Data:', { name, email, subject, message });

                // Simulate a delay for server response
                setTimeout(() => {
                    displayFormStatus('Your message has been sent successfully! We will get back to you shortly.', 'success');
                    contactForm.reset();
                }, 1000);
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.classList.add(type);
    }
});
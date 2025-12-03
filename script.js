// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
    updateIcons('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
});

function updateIcons(theme) {
    if (theme === 'dark') {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
    } else {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
    }
}

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Change icon or animate burger menu here if desired
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwYt_J2xxMK53NbFsTgXitNS2oU9e72QRGwjFqoAd6F_YZq4uHSoxNQ0ZPBm3o0f9g2/exec';

        fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(contactForm)
        })
            .then(response => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Error! Please try again later.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Initialize Lucide icons
lucide.createIcons();

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Initial check for elements in view
revealOnScroll();

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for background orbs
const background = document.querySelector('.background');
let lastScrollY = window.scrollY;

const updateParallax = () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;
    
    const orbs = background.querySelectorAll('.glow-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        const y = parseFloat(getComputedStyle(orb).top);
        orb.style.top = `${y + (delta * speed)}px`;
    });
    
    lastScrollY = scrollY;
};

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effect to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

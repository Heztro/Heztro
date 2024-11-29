const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
const tabSound = document.getElementById('tabSound');

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const particleLogo = document.querySelector('.particle-logo');
    
    const particles = Array(50).fill().map(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#4169E1';
        particle.style.borderRadius = '50%';
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50;
        particle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
        particle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
        
        particleLogo.appendChild(particle);
        return particle;
    });

    particles.forEach((particle) => {
        const targetX = 0;
        const targetY = 0;
        
        particle.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${targetX}px, ${targetY}px)` }
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
    });

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

links.forEach(link => {
    link.addEventListener('mouseover', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });

    link.addEventListener('click', (e) => {
        e.preventDefault();
        clickSound.currentTime = 0;
        clickSound.play();
        tabSound.currentTime = 0;
        tabSound.play();

        const targetId = link.getAttribute('href').slice(1);
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(targetId).classList.add('active');
        
        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

const glitchText = document.querySelector('.glitch-text');
setInterval(() => {
    if (Math.random() < 0.1) {
        glitchText.style.animation = 'glitch 0.2s ease';
        setTimeout(() => {
            glitchText.style.animation = 'none';
        }, 200);
    }
}, 2000);

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.brightness = Math.random();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.brightness += Math.random() * 0.02 - 0.01;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height ||
            this.brightness < 0 || this.brightness > 1) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
    }
}

const stars = Array(200).fill().map(() => new Star());

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.01;
    mouseY = (e.clientY - canvas.height / 2) * 0.01;
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = (touch.clientX - canvas.width / 2) * 0.01;
    mouseY = (touch.clientY - canvas.height / 2) * 0.01;
    
    cursor.style.left = touch.clientX + 'px';
    cursor.style.top = touch.clientY + 'px';
});

function drawConstellationLines() {
    stars.forEach((star1, i) => {
        stars.slice(i + 1).forEach(star2 => {
            const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(star2.x, star2.y);
                ctx.strokeStyle = `rgba(65, 105, 225, ${0.3 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        });
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.x += mouseX;
        star.y += mouseY;
        star.update();
        star.draw();
    });

    drawConstellationLines();
    requestAnimationFrame(animate);
}

animate();
document.querySelector('section').classList.add('active');

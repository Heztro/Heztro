document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

const links = document.querySelectorAll('.nav-links .tab');
const sections = document.querySelectorAll('section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
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
    if (Math.random() < 0.2) {
        glitchText.style.animation = 'glitch 0.2s ease';
        setTimeout(() => {
            glitchText.style.animation = 'none';
        }, 200);
    }
}, 3000);

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
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.glowSize = this.size * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.brightness += (Math.random() - 0.5) * 0.05;
        this.brightness = Math.max(0.5, Math.min(1, this.brightness));

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.size,
            this.x, this.y, this.glowSize
        );
        gradient.addColorStop(0, `rgba(65, 105, 225, ${this.brightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(65, 105, 225, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

const stars = Array(100).fill().map(() => new Star());
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.003;
    mouseY = (e.clientY - canvas.height / 2) * 0.003;
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = (touch.clientX - canvas.width / 2) * 0.003;
    mouseY = (touch.clientY - canvas.height / 2) * 0.003;
});

function drawConstellationLines() {
    stars.forEach((star1, i) => {
        stars.slice(i + 1).forEach(star2 => {
            const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(star2.x, star2.y);
                const opacity = (1 - distance / 150) * 0.15;
                ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
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

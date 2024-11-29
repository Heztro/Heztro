// Background Canvas Setup
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Stars and Constellations
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

const stars = Array(50).fill().map(() => new Star());
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.001;
    mouseY = (e.clientY - canvas.height / 2) * 0.001;
});

function drawConstellationLines() {
    ctx.strokeStyle = 'rgba(65, 105, 225, 0.1)';
    ctx.lineWidth = 0.5;
    
    stars.forEach((star1, i) => {
        stars.slice(i + 1).forEach(star2 => {
            const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(star2.x, star2.y);
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

// Navigation
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = tab.getAttribute('href').slice(1);
        
        sections.forEach(section => section.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        
        document.getElementById(targetId).classList.add('active');
        tab.classList.add('active');
    });
});

// Glitch Effect
const glitchText = document.querySelector('.glitch-text');
setInterval(() => {
    if (Math.random() < 0.1) {
        glitchText.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
        glitchText.style.opacity = Math.random() * 0.5 + 0.5;
        
        setTimeout(() => {
            glitchText.style.transform = 'none';
            glitchText.style.opacity = 1;
        }, 100);
    }
}, 2000);

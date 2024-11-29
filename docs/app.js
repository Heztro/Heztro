const loadingScreen = document.getElementById('loadingScreen');
const typedText = document.querySelector('.typed-text');
const text = 'Heztro';
let charIndex = 0;

function typeText() {
    if (charIndex < text.length) {
        typedText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }
}

window.addEventListener('load', typeText);

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.0005;
    mouseY = (e.clientY - canvas.height / 2) * 0.0005;
});

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 0.8;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.brightness = Math.random();
    }

    update() {
        this.x += this.speedX + mouseX;
        this.y += this.speedY + mouseY;
        this.brightness += this.twinkleSpeed;
        
        if (this.brightness > 1) {
            this.brightness = 0;
        }
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        const opacity = 0.3 + Math.sin(this.brightness * Math.PI * 2) * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    }
}

const stars = Array(40).fill().map(() => new Star());

function drawConstellationLines() {
    ctx.strokeStyle = 'rgba(65, 105, 225, 0.05)';
    ctx.lineWidth = 0.3;
    
    stars.forEach((star1, i) => {
        stars.slice(i + 1).forEach(star2 => {
            const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
            if (distance < 80) {
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
        star.update();
        star.draw();
    });
    
    drawConstellationLines();
    requestAnimationFrame(animate);
}

animate();

const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = tab.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('glitch-transition');
        });
        
        tabs.forEach(t => t.classList.remove('active'));
        
        setTimeout(() => {
            targetSection.classList.add('active');
            tab.classList.add('active');
            sections.forEach(section => {
                section.classList.remove('glitch-transition');
            });
        }, 300);
    });
});

const glitchText = document.querySelector('.glitch-text');

function applyRandomGlitchEffect() {
    if (Math.random() < 0.3) {
        glitchText.classList.add('active');
        
        const randomX = (Math.random() * 6 - 3) + 'px';
        const randomY = (Math.random() * 6 - 3) + 'px';
        const randomSkewX = (Math.random() * 20 - 10) + 'deg';
        const randomSkewY = (Math.random() * 20 - 10) + 'deg';
        
        glitchText.style.transform = `translate(${randomX}, ${randomY}) skew(${randomSkewX}, ${randomSkewY})`;
        
        const hue = Math.random() * 360;
        glitchText.style.filter = `hue-rotate(${hue}deg)`;
        
        setTimeout(() => {
            glitchText.classList.remove('active');
            glitchText.style.transform = 'none';
            glitchText.style.filter = 'none';
        }, 150);
    }
}

setInterval(applyRandomGlitchEffect, 800);

document.querySelectorAll('.content-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        box.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'none';
    });
});

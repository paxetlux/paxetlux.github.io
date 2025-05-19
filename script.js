// Canvas Animation
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust dot settings based on screen size
const isMobile = window.innerWidth <= 768; // Mobile breakpoint
const numDots = isMobile ? 40 : 100; // Fewer dots on mobile (40) vs desktop (100)
const maxDistance = isMobile ? 100 : 150; // Shorter connection distance on mobile
const speedFactor = isMobile ? 0.3 : 0.5; // Slower movement on mobile

const dots = [];

for (let i = 0; i < numDots; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1, // Keep radius small but consistent
        color: "#ffffff",
        vx: (Math.random() - 0.5) * speedFactor, // Adjusted speed
        vy: (Math.random() - 0.5) * speedFactor,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();

// Adjust canvas and reinitialize dots on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize dots only if mobile state changes
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        dots.length = 0; // Clear existing dots
        const newNumDots = newIsMobile ? 40 : 100;
        const newSpeedFactor = newIsMobile ? 0.3 : 0.5;
        for (let i = 0; i < newNumDots; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 1,
                color: "#ffffff",
                vx: (Math.random() - 0.5) * newSpeedFactor,
                vy: (Math.random() - 0.5) * newSpeedFactor,
            });
        }
    }
});

// Typing Animation and Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const text = "Turn conversations into smarter outcomes powered by always-on intelligence.";
    const heroText = document.querySelector('.hero-content h1');
    let index = 0;

    function typeLetter() {
        if (index < text.length) {
            if (text[index] === '.') {
                heroText.innerHTML += `<span class="blinking-dot">.</span>`;
            } else {
                heroText.textContent += text[index];
            }
            index++;
            setTimeout(typeLetter, 100);
        }
    }

    heroText.textContent = '';
    typeLetter();

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

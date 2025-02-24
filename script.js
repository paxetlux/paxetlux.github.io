const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const numDots = 100; // Increase the number of dots for a denser effect

// Initialize dots with random properties
for (let i = 0; i < numDots; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1, // Smaller radius for a more refined look
        color: "#ffffff", // White color for dots
        vx: (Math.random() - 0.5) * 0.5, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.5,
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

    // Draw connecting lines between dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) { // Increased threshold for more connections
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`; // White lines with gradual fade
                ctx.lineWidth = 0.8; // Slightly thicker lines
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


document.addEventListener('DOMContentLoaded', () => {
    const text = "Transforming property decisions with powerful proptech tools and insights.";
    const heroText = document.querySelector('.hero-content h1');
    let index = 0;

    // Function to type one letter at a time
    function typeLetter() {
        if (index < text.length) {
            if (text[index] === '.') {
                // When we reach the period, add it as a blinking dot
                heroText.innerHTML += `<span class="blinking-dot">.</span>`;
            } else {
                heroText.textContent += text[index];
            }
            index++;
            setTimeout(typeLetter, 100); /* Adjust speed (100ms per letter) */
        }
    }

    // Clear the initial text and start the animation
    heroText.textContent = '';
    typeLetter();
});
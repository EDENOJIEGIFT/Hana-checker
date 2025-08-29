// Particle Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ["#00e5ff", "#80d8ff", "#18ffff"];

function createParticles() {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(drawParticles);
}

createParticles();
drawParticles();

// Prank Video Popup
const searchBtn = document.getElementById("searchBtn");
const videoPopup = document.getElementById("videoPopup");
const closeBtn = document.getElementById("closeBtn");

searchBtn.addEventListener("click", () => {
  videoPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  videoPopup.style.display = "none";
});

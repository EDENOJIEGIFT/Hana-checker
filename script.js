const canvas = document.getElementById("butterflyCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const butterflies = [];
const butterflyImg = new Image();
butterflyImg.src = "assets/butterfly.png"; // Your image in assets folder

// Create butterflies
function createButterflies() {
  for (let i = 0; i < 15; i++) {
    butterflies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      size: 40 + Math.random() * 20,
    });
  }
}

function drawButterflies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  butterflies.forEach((b) => {
    ctx.drawImage(butterflyImg, b.x, b.y, b.size, b.size);

    b.x += b.speedX;
    b.y += b.speedY;

    if (b.x < 0 || b.x > canvas.width) b.speedX *= -1;
    if (b.y < 0 || b.y > canvas.height) b.speedY *= -1;
  });
  requestAnimationFrame(drawButterflies);
}

// Video popup
const checkoutBtn = document.getElementById("checkoutBtn");
const videoPopup = document.getElementById("videoPopup");
const prankVideo = document.getElementById("prankVideo");

checkoutBtn.addEventListener("click", () => {
  videoPopup.style.display = "flex";
  prankVideo.play();
});

videoPopup.addEventListener("click", () => {
  videoPopup.style.display = "none";
  prankVideo.pause();
  prankVideo.currentTime = 0;
});

createButterflies();
drawButterflies();

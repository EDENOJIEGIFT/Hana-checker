function showPopup() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a username or crypto address");
    return;
  }
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  const video = document.getElementById("prankVideo");
  video.pause(); // stop video when closing popup
  video.currentTime = 0;
}

// Particles background setup
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true },
    color: { value: "#ffffff" }
  }
});

const checkBtn = document.getElementById('check-btn');
const videoPopup = document.getElementById('video-popup');
const closeBtn = document.getElementById('close-btn');
const popupVideo = document.getElementById('popup-video');
const twitterInput = document.getElementById('twitter-input');
const errorMsg = document.getElementById('error-msg');

checkBtn.addEventListener('click', () => {
  const handle = twitterInput.value.trim();

  // Show error if handle is empty
  if (handle === "") {
    errorMsg.classList.remove('hidden');
    return;
  }

  // Hide error if valid handle
  errorMsg.classList.add('hidden');

  // Show popup and play video
  videoPopup.classList.remove('hidden');
  popupVideo.play();
});

// Close popup when clicking close button
closeBtn.addEventListener('click', () => {
  popupVideo.pause();
  videoPopup.classList.add('hidden');
});

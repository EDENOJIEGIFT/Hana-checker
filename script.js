// Grab the elements from the page
const checkBtn = document.getElementById('check-btn');
const videoPopup = document.getElementById('video-popup');
const closeBtn = document.getElementById('close-btn');
const popupVideo = document.getElementById('popup-video');

// When "Check Allocation" button is clicked
checkBtn.addEventListener('click', () => {
  // Show the popup by removing the "hidden" class
  videoPopup.classList.remove('hidden');

  // Start playing the popup video automatically
  popupVideo.play();
});

// Close button hides the popup
closeBtn.addEventListener('click', () => {
  // Pause the video and hide the popup again
  popupVideo.pause();
  videoPopup.classList.add('hidden');
});

function checkAllocations() {
  const username = document.getElementById("username").value;
  const popup = document.getElementById("popup");

  if (username) {
    popup.innerText = `Checking allocations for ${username}...`;
    popup.style.display = "block";
    setTimeout(() => {
      popup.innerText = `Allocations checked for ${username}`;
    }, 2000);
  } else {
    popup.innerText = "Please enter a username!";
    popup.style.display = "block";
  }
}

document.querySelectorAll(".hotspot").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  });
});
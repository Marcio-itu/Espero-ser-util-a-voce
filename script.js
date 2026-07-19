document.querySelectorAll(".hotspot").forEach((button)=>{
button.addEventListener("click",()=>{if(navigator.vibrate)navigator.vibrate(12);});
});
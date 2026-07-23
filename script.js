document.querySelectorAll(".hotspot").forEach((button) => {
    button.addEventListener("click", function(e) {
        if (navigator.vibrate) {
            navigator.vibrate(15);
        }
        
        this.classList.add("active");
        createRipple(e, this);
        
        setTimeout(() => {
            this.classList.remove("active");
        }, 200);
    });
    
    button.addEventListener("mouseleave", function() {
        this.classList.remove("active");
    });
});

function createRipple(event, element) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    let x, y;
    
    if (event.clientX && event.clientY) {
        x = event.clientX - rect.left - size / 2;
        y = event.clientY - rect.top - size / 2;
    } else {
        x = rect.width / 2 - size / 2;
        y = rect.height / 2 - size / 2;
    }
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        window.scrollTo(0, 0);
    }
});

document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });

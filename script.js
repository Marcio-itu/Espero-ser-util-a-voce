document.querySelectorAll(".hotspot").forEach((button) => {
    button.addEventListener("click", function(e) {
        // Impede o comportamento padrão do link
        e.preventDefault();
        
        // Feedback tátil (vibração)
        if (navigator.vibrate) {
            navigator.vibrate(15);
        }
        
        // Efeito visual de clique
        this.classList.add("active");
        createRipple(e, this);
        
        // Remove a classe active após animação
        setTimeout(() => {
            this.classList.remove("active");
        }, 200);
        
        // Pega o link do botão
        const href = this.getAttribute('href');
        const target = this.getAttribute('target');
        const rel = this.getAttribute('rel');
        
        // Abre o link após o efeito visual (pequeno delay)
        setTimeout(() => {
            if (this.getAttribute('href').startsWith('tel:')) {
                // Links de telefone - abrem normalmente
                window.location.href = href;
            } else if (this.getAttribute('href').startsWith('mailto:')) {
                // Links de email - abrem normalmente
                window.location.href = href;
            } else if (this.getAttribute('download')) {
                // Downloads - abrem normalmente
                window.location.href = href;
            } else {
                // Para outros links (WhatsApp, Instagram, Simulador)
                if (target === '_blank') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        }, 150);
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

// Impede rolagem ao clicar em links
document.addEventListener('click', function(e) {
    // Se o clique for em um link que está dentro de .hotspot
    const hotspot = e.target.closest('.hotspot');
    if (hotspot) {
        // Previne qualquer comportamento de rolagem
        e.preventDefault();
    }
}, { passive: false });

// Scroll suave para manter posição
let lastScrollY = 0;
document.addEventListener('touchstart', function() {
    lastScrollY = window.scrollY;
}, { passive: true });

document.addEventListener('touchend', function() {
    // Se a página rolou após um clique, volta para a posição anterior
    setTimeout(() => {
        if (Math.abs(window.scrollY - lastScrollY) > 50) {
            window.scrollTo({
                top: lastScrollY,
                behavior: 'smooth'
            });
        }
    }, 300);
}, { passive: true });

document.querySelectorAll(".hotspot").forEach((button) => {
    button.addEventListener("click", function(e) {
        // Impede completamente o comportamento padrão
        e.preventDefault();
        e.stopPropagation();
        
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
        
        // Salva o href e target
        const href = this.getAttribute('href');
        const target = this.getAttribute('target');
        
        // Abre o link após o efeito visual
        setTimeout(() => {
            // Para links de telefone
            if (href.startsWith('tel:')) {
                window.location.href = href;
            }
            // Para links de email
            else if (href.startsWith('mailto:')) {
                window.location.href = href;
            }
            // Para downloads
            else if (this.hasAttribute('download')) {
                window.location.href = href;
            }
            // Para outros links (WhatsApp, Instagram, Simulador)
            else {
                // Abre em nova aba com parâmetros para manter posição
                const newWindow = window.open(href, '_blank');
                if (newWindow) {
                    // Tenta manter a posição
                    newWindow.addEventListener('load', function() {
                        // Pequeno delay para garantir que a página carregou
                        setTimeout(() => {
                            // Centraliza no topo
                            newWindow.scrollTo(0, 0);
                        }, 100);
                    });
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

// Bloqueia qualquer clique que possa causar rolagem
document.addEventListener('click', function(e) {
    if (e.target.closest('.hotspot')) {
        e.preventDefault();
    }
}, { passive: false, capture: true });

// Força a página a ficar no topo em dispositivos móveis
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Previne rolagem ao tocar nos botões
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.hotspot')) {
        // Impede que o toque cause rolagem
        e.preventDefault();
        // Mas permite o clique
        e.target.click();
    }
}, { passive: false, capture: true });

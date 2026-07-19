document.addEventListener('DOMContentLoaded', () => {
    console.log("Cartão Digital Interativo carregado com sucesso.");

    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(button => {
        button.addEventListener('click', (e) => {
            // Executa vibração curta no celular se houver suporte
            if ('vibrate' in navigator) {
                navigator.vibrate(60);
            }
        });
    });
});
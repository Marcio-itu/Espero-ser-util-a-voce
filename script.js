document.addEventListener('DOMContentLoaded', () => {
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(button => {
        button.addEventListener('click', (e) => {
            if ('vibrate' in navigator) navigator.vibrate(60);
        });
    });
});
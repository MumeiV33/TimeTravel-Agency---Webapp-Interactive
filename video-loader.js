/**
 * Video Loader - Améliore le chargement de la vidéo hero
 * Évite le glitch au démarrage avec effet blur progressif
 */

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    
    if (!video) return;
    
    // Masquer la vidéo au début avec blur
    video.style.opacity = '0';
    video.style.filter = 'blur(20px)';
    video.style.transition = 'opacity 1s ease-in, filter 1.5s ease-out';
    
    // Attendre que la vidéo soit suffisamment chargée
    video.addEventListener('canplaythrough', () => {
        console.log('✅ Vidéo prête, affichage progressif');
        video.style.opacity = '1';
        video.style.filter = 'blur(0px)';
    }, { once: true });
    
    // Fallback : afficher après 3 secondes même si pas complètement chargée
    setTimeout(() => {
        if (video.style.opacity === '0') {
            console.log('⏱️ Timeout atteint, affichage de la vidéo');
            video.style.opacity = '1';
            video.style.filter = 'blur(0px)';
        }
    }, 3000);
    
    // Gérer le blur à la fin de la vidéo (avant le loop)
    video.addEventListener('timeupdate', () => {
        const timeRemaining = video.duration - video.currentTime;
        
        // Quand il reste moins de 1.5 secondes, commencer le blur
        if (timeRemaining <= 1.5 && timeRemaining > 0) {
            video.style.filter = 'blur(20px)';
        }
        // Quand la vidéo repart (loop), enlever le blur
        else if (video.currentTime < 1) {
            video.style.filter = 'blur(0px)';
        }
    });
});

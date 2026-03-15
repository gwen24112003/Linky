// Styles centralisés pour toutes les bannières
const bannerStyles = {
  minHeight: '50vh',
  background: [
    'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(13,148,136,0.25) 0%, transparent 60%)',
    'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(45,212,191,0.12) 0%, transparent 50%)',
    'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(15,118,110,0.3) 0%, transparent 70%)',
    '#0a0f0e',
  ].join(', '),
};

// Classe CSS pour l'overlay de la bannière (conservé pour compatibilité)
// Utiliser: <div className={bannerOverlayClass} />
const bannerOverlayClass = 'absolute inset-0 bg-overlay';

module.exports = { bannerStyles, bannerOverlayClass };

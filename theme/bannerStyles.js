// Styles centralisés pour toutes les bannières
const bannerStyles = {
  minHeight: '50vh',
  background: 'linear-gradient(135deg, #1A2332 0%, #2A3A50 60%, #1A2332 100%)',
};

// Classe CSS pour l'overlay de la bannière (conservé pour compatibilité)
// Utiliser: <div className={bannerOverlayClass} />
const bannerOverlayClass = 'absolute inset-0 bg-overlay';

module.exports = { bannerStyles, bannerOverlayClass };

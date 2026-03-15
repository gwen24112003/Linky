// Styles centralisés pour toutes les bannières
const bannerStyles = {
  minHeight: '50vh',
  background: 'linear-gradient(135deg, #0f766e 0%, #0e7490 60%, #0c4a6e 100%)',
};

// Classe CSS pour l'overlay de la bannière (conservé pour compatibilité)
// Utiliser: <div className={bannerOverlayClass} />
const bannerOverlayClass = 'absolute inset-0 bg-overlay';

module.exports = { bannerStyles, bannerOverlayClass };

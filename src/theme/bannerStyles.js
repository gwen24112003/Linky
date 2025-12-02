// Styles centralisés pour toutes les bannières
const bannerStyles = {
  minHeight: '50vh',
  backgroundImage: 'url(/images/linky-banner.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

// Classe CSS pour l'overlay de la bannière
// Utiliser: <div className={bannerOverlayClass} />
const bannerOverlayClass = 'absolute inset-0 bg-overlay';

module.exports = { bannerStyles, bannerOverlayClass };

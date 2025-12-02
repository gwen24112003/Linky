# 🔗 Linky - Site Web Officiel

Site web vitrine de **Linky**, votre partenaire en solutions no-code et automatisation pour booster votre productivité.

## 📋 À propos

Linky propose des services de création d'outils no-code, d'automatisation de processus et de maintenance pour les freelances et entreprises qui souhaitent optimiser leur productivité sans coder.

## 🚀 Technologies utilisées

- **React** 19.2.0 avec TypeScript
- **React Router DOM** 7.9.6 pour la navigation
- **Tailwind CSS** 3.4.1 pour le styling
- **Lucide React** pour les icônes
- **EmailJS** pour le formulaire de contact
- **CRACO** pour la configuration personnalisée

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **npm** (généralement installé avec Node.js)

Pour vérifier vos versions :
```bash
node --version
npm --version
```

## 🛠️ Installation et lancement

1. **Cloner le repository**
   ```bash
   git clone https://github.com/gwen24112003/Linky.git
   cd Linky_site/Linky_site
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le projet**
   ```bash
   npm start
   ```

L'application sera accessible sur :
- **Local** : [http://localhost:3000](http://localhost:3000)
- **Réseau** : http://192.168.x.x:3000

Le serveur se rechargera automatiquement à chaque modification du code.

## 📁 Structure du projet

```
Linky_site/
├── public/
│   ├── images/              # Images et logos
│   └── index.html           # Template HTML
├── src/
│   ├── components/          # Composants React
│   │   ├── home/           # Composants de la page d'accueil
│   │   └── layout/         # Header, Footer, etc.
│   ├── pages/              # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Team.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── theme/              # Configuration du thème
│   │   ├── colors.js
│   │   ├── fonts.js
│   │   ├── bannerStyles.js
│   │   └── index.js
│   ├── types/              # Types TypeScript
│   ├── App.tsx             # Composant principal
│   └── index.tsx           # Point d'entrée
├── tailwind.config.js      # Configuration Tailwind
├── craco.config.js         # Configuration CRACO
└── package.json
```

## 🎨 Pages disponibles

- **/** - Page d'accueil avec onglets Freelances/Entreprises
- **/services** - Présentation détaillée des services
- **/equipe** - Présentation de l'équipe Linky
- **/projets** - Portfolio des projets réalisés
- **/contact** - Formulaire de contact

## 🔧 Configuration

### Tailwind CSS

Le projet utilise Tailwind CSS avec une configuration personnalisée incluant :
- Polices personnalisées (Lexend, Meera Inimai)
- Palette de couleurs personnalisée
- Animations et transitions

### EmailJS

Pour le formulaire de contact, configurez vos clés EmailJS dans le composant `Contact.tsx`.

## 🌐 Déploiement

Le projet peut être déployé sur :
- **Vercel** (recommandé pour React)
- **Netlify**
- **GitHub Pages**
- Tout hébergeur supportant les applications React

### Exemple avec Vercel :

```bash
npm install -g vercel
npm run build
vercel --prod
```

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur de développement |
| `npm run build` | Crée le build de production |
| `npm test` | Lance les tests |
| `npm run eject` | Éjecte la configuration CRA (irréversible) |

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📧 Contact

Pour toute question ou demande :
- **Site web** : [linky4u.fr](https://linky4u.fr)
- **Email** : contact@linky4u.fr
- **Instagram** : [@linky4u_app](https://www.instagram.com/linky4u_app/)
- **LinkedIn** : [Enzo Monnier](https://www.linkedin.com/in/enzo-monnier-7524ab205/)
- **X (Twitter)** : [@linky4u_app](https://x.com/linky4u_app)

## 📄 Licence

Ce projet est la propriété de Linky. Tous droits réservés.

---

**Développé avec ❤️ par l'équipe Linky**

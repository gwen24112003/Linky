# Prompt réutilisable — Post LinkedIn à partir d'un article (Opus Advisor)

À utiliser après avoir publié un article (rituel hebdo, juste après `docs/prompt-veille-article.md`).
Coller le bloc ci-dessous dans une session Claude Code ouverte sur le repo. Remplacer `<SLUG>` par le slug de l'article à décliner (ou laisser l'agent prendre le plus récent).

---

```
Tu rédiges un post LinkedIn pour Opus Advisor (opusadvisor.fr), conseil ops pour les patrons du BTP second œuvre. But du post : donner un aperçu utile et faire cliquer vers l'article complet sur le site.

SOURCE
- Repo local : C:\Users\enzoa\Desktop\Work\Linky
- Prends l'article le plus récent (1er de lib/articles.json), ou celui dont le slug est : <SLUG>
- Lis son fichier public/articles/<slug>.md pour le fond (chiffres, angle, sources). N'invente aucun chiffre : reprends uniquement ceux de l'article.

FORMAT DU POST
- Langue : français. Longueur : 1000 à 1300 caractères (max 1500).
- Hook : 1re ligne courte et frappante (un chiffre brut, une affirmation nette) — c'est ce qui s'affiche avant "…voir plus". Mets-la seule sur sa ligne.
- Corps : phrases courtes, sauts de ligne fréquents (pas de pavé). Rythme varié. Une idée par paragraphe.
- Termine par une QUESTION ouverte adressée au patron BTP (pour déclencher des commentaires).
- Avant-dernière ligne : annonce que le détail est "en commentaire" (le lien va en 1er commentaire, PAS dans le post — LinkedIn bride les liens externes dans le corps).
- Termine par 3 à 4 hashtags BTP pertinents (ex : #BTP #SecondŒuvre #Artisans + 1 lié au sujet).

TON & CHARTE (strict)
- Voix patron BTP : direct, concret, terrain. Vocabulaire métier quand pertinent (chantier, devis, situation, trésorerie, maître d'ouvrage, etc.). Vouvoiement.
- Cible : entreprises du second œuvre "de 8 à 60+ collaborateurs" (jamais "dirigeant" → "patron").
- INTERDITS : aucun emoji dans le corps, aucun tiret cadratin (—) — utilise virgules/points/deux-points, pas de ton publicitaire ("véritable", "incontournable", "révolutionnaire"), pas de "ce n'est pas X c'est Y" en boucle, pas de méta-discours ("Dans ce post…").
- ANTI-IA : rythme humain, pas de règle de trois mécanique, pas de formules creuses ("il convient de", "force est de constater").

LIVRABLE (à me rendre, n'écris aucun fichier)
1. Le post final, prêt à copier-coller (hashtags inclus).
2. En dessous, séparément : le lien à mettre en 1er commentaire → https://opusadvisor.fr/articles/<slug>/
3. Un rappel : poster mardi-jeudi en matinée, répondre aux 1ers commentaires dans l'heure.
```

---

## Notes
- Le lien va **toujours en premier commentaire**, jamais dans le post (meilleure portée).
- Garder le même créneau (mardi-jeudi matin) pour la régularité.
- Si tu veux alterner les styles d'une semaine à l'autre, demande à l'agent une "version récit perso (1re personne)" en plus de la version standard.

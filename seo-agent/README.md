# SEO Auditor - Opus Advisor

Outil d'audit et de scoring SEO pour le site Opus Advisor.

## Installation

```bash
pip install -r requirements.txt
```

## Utilisation

```bash
python seo_auditor.py
```

Par defaut, analyse https://opusadvisor.fr

Pour specifier une URL:
```bash
python seo_auditor.py https://example.com
```

## Ce que l'outil verifie

- Title (presence, longueur)
- Meta description (presence, longueur)
- Headings (H1, H2)
- Images (attributs alt)
- Liens
- Contenu (quantite de texte)

## Score

Le score est sur 100 avec grade A/B/C/D

# Serveur d'opusadvisor.fr

VPS OVH (VPS-1, Beauharnois, Canada) sous Ubuntu 26.04, en service depuis le 06/10/2026, après la suppression de l'ancien VPS Infrawire. Aucun secret dans ce dossier.

## Disposition
- Site statique : `/var/www/opusadvisor/releases/<horodatage>`, servi via le lien `current` (bascule atomique, 3 dernières releases conservées).
- nginx : `/etc/nginx/sites-available/opusadvisor.fr`, en-têtes de sécurité dans `/etc/nginx/snippets/security-headers.conf`.
- HTTPS : certbot (Let's Encrypt), renouvellement automatique via `certbot.timer`.
- Sécurité : SSH par clé uniquement (`/etc/ssh/sshd_config.d/00-hardening.conf`), UFW (22/80/443), fail2ban, mises à jour de sécurité automatiques. Sauvegarde automatique OVH active.

## Déploiement (automatique)
1. Un push sur `main` lance le workflow GitHub `Build & publish` (`.github/workflows/deploy.yml`) : compilation du site, puis publication de `out/` dans la branche `deploy`.
2. Sur le serveur, la minuterie `opus-pull.timer` lance `/usr/local/bin/opus-pull` (copie de `infra/opus-pull.sh`) toutes les 2 minutes : si la branche `deploy` a changé, nouvelle release puis bascule atomique.

Aucun secret GitHub n'est nécessaire (dépôt public, `GITHUB_TOKEN` automatique). Une compilation en échec ne publie rien. Journal côté serveur : `journalctl -u opus-pull`.

Déploiement manuel de secours (depuis ce PC, alias SSH `opus-vps`) :
```bash
bash scripts/deploy-vps.sh
```

## Reconstruire un serveur de zéro
1. Commander un VPS Ubuntu, installer la clé SSH, vérifier la connexion par clé.
2. `scp infra/setup-vps.sh <hote>:/tmp/ && ssh <hote> 'bash /tmp/setup-vps.sh'` (pose aussi le bloc nginx par défaut `00-default`, qui coupe la connexion pour les noms d'hôte inconnus)
3. Pointer le DNS du domaine (enregistrement A chez IONOS) vers la nouvelle IP.
4. Installer le déploiement automatique :
   `scp infra/opus-pull.sh infra/opus-pull.service infra/opus-pull.timer <hote>:/tmp/`, puis sur le serveur :
   `sudo install -m 755 /tmp/opus-pull.sh /usr/local/bin/opus-pull && sudo install -m 644 /tmp/opus-pull.{service,timer} /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now opus-pull.timer`
5. Une fois le DNS propagé : `sudo certbot --nginx -d opusadvisor.fr -d www.opusadvisor.fr --redirect`
6. Réinstaller les redirections des anciennes URL (route `/article/` au singulier, articles supprimés) : copier `docs/nginx-redirects.conf` vers `/etc/nginx/snippets/opus-redirects.conf`, ajouter `include snippets/opus-redirects.conf;` dans le vhost opusadvisor.fr (avant `location /`), puis `sudo nginx -t && sudo systemctl reload nginx`. Sans ce fichier, Google voit des 404 sur des pages qu'il connaît encore.

## Mesure d'audience (Umami)
Umami 3.4.0 tourne dans Docker sur le VPS (`/srv/umami`, fichiers dans `infra/umami/`), sans cookie.
- Le site charge `opusadvisor.fr/s.js` et envoie ses mesures à `opusadvisor.fr/api/send` : nginx relaie vers `127.0.0.1:3100` (snippet `umami-proxy.conf`, inclus dans le vhost du site).
- Tableau de bord : `https://stats.opusadvisor.fr`, identifiant `admin`. Le mot de passe se définit sans jamais transiter en clair : `ssh -t opus-vps sudo umami-password`.
- Secrets (`DB_PASSWORD`, `APP_SECRET`) : `/srv/umami/.env`, générés sur le serveur, jamais versionnés.
- Mise à jour : changer la version de l'image dans `docker-compose.yml`, recopier le fichier, puis `cd /srv/umami && sudo docker compose pull && sudo docker compose up -d`.

Installation sur un serveur neuf :
1. `sudo apt install docker.io docker-compose-v2 python3-bcrypt`
2. Copier `docker-compose.yml` dans `/srv/umami/`, créer `.env` (chmod 600) avec deux valeurs aléatoires, puis `sudo docker compose up -d`.
3. `sudo install -m 755 umami-password /usr/local/bin/` puis `sudo umami-password --lock` : le compte `admin/umami` créé par défaut est aussitôt verrouillé.
4. Copier `umami-proxy.conf` dans `/etc/nginx/snippets/` et l'inclure dans le vhost du site ; copier `stats.opusadvisor.fr.conf` dans `sites-available/`, l'activer, puis `sudo certbot --nginx -d stats.opusadvisor.fr`.
5. Le site Umami (ID dans `lib/analytics.ts`) est déjà en base ; sur une base neuve, le recréer depuis le tableau de bord et reporter le nouvel ID.

## Diagnostic facture électronique (leads)
La page `/diagnostic-facture-electronique` envoie ses leads à un petit service Node (`services/lead-api`, détails dans son README), joint par nginx sur `/api/diagnostic-lead` (snippet `lead-api-proxy.conf`, port local 3101).
- Code : `/opt/opus-lead-api` (clone partiel de `main`), mis à jour par `opus-lead-api-pull`, lancé après `opus-pull`.
- Base SQLite : `/var/lib/opus-lead-api/leads.db`, hors du site. Elle est comprise dans la sauvegarde automatique OVH.
- Secrets : `/etc/opus-lead-api.env`. `ADMIN_TOKEN` est généré à l'installation ; le mot de passe SMTP se saisit sans transiter en clair : `ssh -t opus-vps sudo lead-api-smtp`.
- Rappels : `opus-lead-reminders.timer`, chaque jour à 9 h 30.
- Export CSV : `ssh opus-vps sudo leads-export > leads.csv`.

Installation, une fois le code dans `main` :
1. `scp -r infra/lead-api opus-vps:/tmp/ && ssh opus-vps 'bash /tmp/lead-api/setup-lead-api.sh'`
2. `ssh -t opus-vps sudo lead-api-smtp` (mot de passe d'application Google Workspace)

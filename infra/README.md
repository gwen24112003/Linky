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
2. `scp infra/setup-vps.sh <hote>:/tmp/ && ssh <hote> 'bash /tmp/setup-vps.sh'`
3. Pointer le DNS du domaine (enregistrement A chez IONOS) vers la nouvelle IP.
4. Installer le déploiement automatique :
   `scp infra/opus-pull.sh infra/opus-pull.service infra/opus-pull.timer <hote>:/tmp/`, puis sur le serveur :
   `sudo install -m 755 /tmp/opus-pull.sh /usr/local/bin/opus-pull && sudo install -m 644 /tmp/opus-pull.{service,timer} /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now opus-pull.timer`
5. Une fois le DNS propagé : `sudo certbot --nginx -d opusadvisor.fr -d www.opusadvisor.fr --redirect`

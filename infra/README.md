# Serveur d'opusadvisor.fr

VPS OVH (VPS-1, Beauharnois, Canada) sous Ubuntu 26.04, en service depuis le 06/10/2026, après la suppression de l'ancien VPS Infrawire. Aucun secret dans ce dossier.

## Disposition
- Site statique : `/var/www/opusadvisor/releases/<horodatage>`, servi via le lien `current` (bascule atomique, 3 dernières releases conservées).
- nginx : `/etc/nginx/sites-available/opusadvisor.fr`, en-têtes de sécurité dans `/etc/nginx/snippets/security-headers.conf`.
- HTTPS : certbot (Let's Encrypt), renouvellement automatique via `certbot.timer`.
- Sécurité : SSH par clé uniquement (`/etc/ssh/sshd_config.d/00-hardening.conf`), UFW (22/80/443), fail2ban, mises à jour de sécurité automatiques. Sauvegarde automatique OVH active.

## Déployer le site
```bash
bash scripts/deploy-vps.sh
```
Build local, puis envoi en SSH sur l'alias `opus-vps` (défini dans `~/.ssh/config`).

## Reconstruire un serveur de zéro
1. Commander un VPS Ubuntu, installer la clé SSH, vérifier la connexion par clé.
2. `scp infra/setup-vps.sh <hote>:/tmp/ && ssh <hote> 'bash /tmp/setup-vps.sh'`
3. Pointer le DNS du domaine (enregistrement A chez IONOS) vers la nouvelle IP.
4. `bash scripts/deploy-vps.sh <hote>`
5. Une fois le DNS propagé : `sudo certbot --nginx -d opusadvisor.fr -d www.opusadvisor.fr --redirect`

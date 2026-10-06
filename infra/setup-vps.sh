#!/usr/bin/env bash
# Mise en place du VPS OVH (Ubuntu 26.04) : base sécurisée + nginx pour opusadvisor.fr.
# À lancer en tant que "ubuntu" (sudo), APRÈS avoir vérifié que la connexion par clé SSH marche :
# l'étape SSH coupe la connexion par mot de passe.
set -euo pipefail

DOMAIN="opusadvisor.fr"
WEBROOT="/var/www/opusadvisor"
DEPLOY_USER="ubuntu"
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a
# Garde les fichiers de config existants sans poser de question
APT_OPTS=(-y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold)

echo "==> Mises à jour système + paquets"
sudo -E apt-get update -y
sudo -E apt-get upgrade "${APT_OPTS[@]}"
sudo -E apt-get install "${APT_OPTS[@]}" nginx certbot python3-certbot-nginx ufw fail2ban python3-systemd unattended-upgrades curl git

echo "==> Swap 2 Go (filet de sécurité mémoire)"
if ! swapon --show | grep -q '/swapfile'; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

echo "==> Pare-feu : SSH + HTTP/HTTPS uniquement"
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "==> fail2ban (SSH)"
sudo tee /etc/fail2ban/jail.local >/dev/null <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
backend = systemd
EOF
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban

echo "==> Mises à jour de sécurité automatiques"
sudo dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> SSH : clé uniquement, pas de connexion root"
sudo tee /etc/ssh/sshd_config.d/00-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF
sudo sshd -t
sudo systemctl reload ssh 2>/dev/null || sudo systemctl restart ssh

echo "==> Dossier du site (déploiements atomiques par lien symbolique)"
sudo mkdir -p "$WEBROOT/releases"
sudo chown -R "$DEPLOY_USER":www-data "$WEBROOT"
if [ ! -e "$WEBROOT/current" ]; then
  mkdir -p "$WEBROOT/releases/init"
  printf '<!doctype html><meta charset="utf-8"><title>Opus Advisor</title><p>Mise à jour en cours.</p>\n' \
    > "$WEBROOT/releases/init/index.html"
  ln -sfn "$WEBROOT/releases/init" "$WEBROOT/current"
fi

echo "==> nginx"
# Ubuntu 26.04 déclare déjà server_tokens dans nginx.conf : on le modifie au lieu de le dupliquer.
if grep -qE '^\s*server_tokens' /etc/nginx/nginx.conf; then
  sudo sed -i -E 's/^(\s*)server_tokens\s+[^;]+;.*/\1server_tokens off;/' /etc/nginx/nginx.conf
else
  echo 'server_tokens off;' | sudo tee /etc/nginx/conf.d/hardening.conf >/dev/null
fi

# En-têtes de sécurité, inclus dans chaque bloc (add_header ne s'hérite pas dans les location qui en ont).
# Pas de Permissions-Policy camera/micro : l'iframe cal.com de /contact les déclare.
sudo tee /etc/nginx/snippets/security-headers.conf >/dev/null <<'EOF'
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
EOF

sudo tee "/etc/nginx/sites-available/$DOMAIN" >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root $WEBROOT/current;
    index index.html;
    include snippets/security-headers.conf;

    # Export statique Next.js (trailingSlash: true)
    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }
    error_page 404 /404.html;

    # Assets versionnés par Next : cache long
    location /_next/static/ {
        include snippets/security-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files \$uri =404;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
EOF

sudo ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "==> Terminé. Étape suivante : certbot, une fois que le DNS pointe sur ce serveur."

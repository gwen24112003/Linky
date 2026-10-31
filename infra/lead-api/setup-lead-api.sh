#!/usr/bin/env bash
# Installe le service des leads du diagnostic facture électronique sur le VPS. Idempotent.
# Depuis le dépôt :  scp -r infra/lead-api opus-vps:/tmp/ && ssh opus-vps 'bash /tmp/lead-api/setup-lead-api.sh'
# Ensuite : autoriser les IP du serveur dans le relais SMTP de Google Workspace (voir infra/README.md).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
VHOST=/etc/nginx/sites-available/opusadvisor.fr

node -e 'const [a,b]=process.versions.node.split(".").map(Number); process.exit(a>22||(a===22&&b>=13)?0:1)' \
  || { echo "Node 22.13 ou plus récent requis (module node:sqlite)" >&2; exit 1; }

echo "==> Utilisateur système et dossiers"
id opuslead >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin opuslead
sudo install -d -o ubuntu -g ubuntu -m 755 /opt/opus-lead-api
sudo install -d -o opuslead -g opuslead -m 750 /var/lib/opus-lead-api

echo "==> Secrets (/etc/opus-lead-api.env) : ADMIN_TOKEN généré ici, mot de passe SMTP à saisir ensuite"
if [ ! -f /etc/opus-lead-api.env ]; then
  TMP=$(mktemp)
  sed "s/^ADMIN_TOKEN=$/ADMIN_TOKEN=$(openssl rand -hex 24)/" "$HERE/opus-lead-api.env.example" > "$TMP"
  sudo install -m 640 -o root -g opuslead "$TMP" /etc/opus-lead-api.env
  rm -f "$TMP"
fi

echo "==> Code (clone partiel de main) et commandes"
sudo install -m 755 "$HERE/lead-api-pull.sh" /usr/local/bin/opus-lead-api-pull
sudo install -m 750 "$HERE/lead-api-smtp" /usr/local/sbin/lead-api-smtp
sudo install -m 750 "$HERE/leads-export" /usr/local/sbin/leads-export
sudo -u ubuntu /usr/local/bin/opus-lead-api-pull

echo "==> systemd : service, rappels quotidiens, mise à jour avec le site"
sudo install -m 644 "$HERE/opus-lead-api.service" "$HERE/opus-lead-reminders.service" "$HERE/opus-lead-reminders.timer" /etc/systemd/system/
if ! grep -q opus-lead-api-pull /etc/systemd/system/opus-pull.service; then
  echo 'ExecStart=-/usr/local/bin/opus-lead-api-pull' | sudo tee -a /etc/systemd/system/opus-pull.service >/dev/null
fi
sudo systemctl daemon-reload
sudo systemctl enable --now opus-lead-api opus-lead-reminders.timer

echo "==> nginx : /api/diagnostic-lead vers 127.0.0.1:3101"
sudo install -m 644 "$HERE/lead-api-proxy.conf" /etc/nginx/snippets/lead-api-proxy.conf
if ! sudo grep -q 'lead-api-proxy.conf' "$VHOST"; then
  sudo cp "$VHOST" "/root/opusadvisor.fr.$(date +%Y%m%d-%H%M%S).bak"
  sudo sed -i 's|^\(\s*\)include snippets/umami-proxy.conf;|&\n\1include snippets/lead-api-proxy.conf;|' "$VHOST"
fi
if sudo nginx -t; then
  sudo systemctl reload nginx
else
  echo "nginx -t en échec : corriger le vhost avant de recharger" >&2
  exit 1
fi

sleep 1
curl -sf http://127.0.0.1:3101/api/diagnostic-lead/health && echo " service OK"
echo "==> Terminé. Reste à autoriser les IP du serveur dans le relais SMTP de Google Workspace (infra/README.md)."

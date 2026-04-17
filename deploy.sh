#!/bin/bash
set -euo pipefail

# Déploiement zero-downtime avec swap atomique :
#   - Le build tourne dans un checkout parallèle /var/www/linky-build
#   - Nginx continue de servir l'ancien /var/www/linky/out pendant tout le build
#   - Une fois le build OK, swap via mv (fenêtre <10 ms sur même filesystem)
#   - Rollback auto si le build plante
#
# Nginx root reste /var/www/linky/out — aucun changement côté nginx.

APP_DIR="/var/www/linky"
BUILD_DIR="/var/www/linky-build"

echo "🔄 Mise à jour du site Opus Advisor..."

# Premier run : crée le checkout de build en reprenant le remote de $APP_DIR
if [ ! -d "$BUILD_DIR/.git" ]; then
  echo "📦 Création du checkout de build : $BUILD_DIR"
  REMOTE_URL=$(git -C "$APP_DIR" config --get remote.origin.url)
  rm -rf "$BUILD_DIR"
  git clone "$REMOTE_URL" "$BUILD_DIR"
fi

# 1) Sync build dir sur origin/main (depuis GitHub)
cd "$BUILD_DIR"
git fetch origin
git reset --hard origin/main

# 2) Install + build (out/ s'écrit dans $BUILD_DIR/out/, nginx sert toujours l'ancien)
npm ci --silent
npm run build

# 3) Swap atomique
OLD_TMP="${APP_DIR}/out.old.$$"
if [ -d "$APP_DIR/out" ]; then
  mv "$APP_DIR/out" "$OLD_TMP"
fi
mv "$BUILD_DIR/out" "$APP_DIR/out"

# 4) Nettoyage de l'ancien out/ en arrière-plan
rm -rf "$OLD_TMP" 2>/dev/null &

# 5) Reload nginx (pour headers et config si modifiée)
sudo systemctl reload nginx

echo "✅ Site mis à jour : $APP_DIR/out est servi par Nginx."

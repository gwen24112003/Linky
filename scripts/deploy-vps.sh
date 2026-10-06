#!/usr/bin/env bash
# Build local d'opusadvisor.fr + envoi atomique sur le VPS.
# Usage : bash scripts/deploy-vps.sh [hote]   (defaut : opus-vps, alias SSH de ~/.ssh/config)
set -euo pipefail

HOST="${1:-opus-vps}"
SSH_USER="ubuntu"
WEBROOT="/var/www/opusadvisor"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
TS=$(date +%Y%m%d%H%M%S)

cd "$REPO"
rm -rf out
npm run build

# Nouvelle release dans releases/<horodatage>, bascule atomique du lien "current",
# on garde les 3 dernières releases pour pouvoir revenir en arrière.
tar -C out -czf - . | ssh "$SSH_USER@$HOST" "set -e
d=$WEBROOT/releases/$TS
mkdir -p \$d
tar -xzf - -C \$d
ln -sfn \$d $WEBROOT/current.tmp
mv -Tf $WEBROOT/current.tmp $WEBROOT/current
ls -1dt $WEBROOT/releases/*/ | tail -n +4 | xargs -r rm -rf"

echo "Déployé : release $TS sur $HOST"

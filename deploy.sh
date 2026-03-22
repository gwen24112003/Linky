#!/bin/bash
set -e

echo "🔄 Mise à jour du site Linky..."

cd /var/www/linky

git pull origin main

npm install --silent

npm run build

sudo systemctl reload nginx

echo "✅ Site mis à jour et en ligne !"

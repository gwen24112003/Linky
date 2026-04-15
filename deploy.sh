#!/bin/bash
set -e

echo "🔄 Mise à jour du site Opus Advisor..."

cd /var/www/linky

git pull origin main

npm ci --silent

npm run build

sudo systemctl reload nginx

echo "✅ Site mis à jour : /var/www/linky/out est servi par Nginx."

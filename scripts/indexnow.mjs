// Prévient Bing (et les moteurs qui s'appuient sur lui, comme DuckDuckGo) que des pages ont changé.
// Protocole IndexNow : https://www.indexnow.org — la clé est publiée dans public/<clé>.txt.
// Usage : node scripts/indexnow.mjs                 → toutes les adresses du sitemap en ligne
//         node scripts/indexnow.mjs /services/ /     → seulement ces pages
// Google n'utilise pas IndexNow : pour lui, passer par l'inspection d'URL de la Search Console.
const HOST = 'opusadvisor.fr';
const KEY = '41402867b7c03c01b2ef3957f4b858b9';

let urls = process.argv.slice(2).map((p) => (p.startsWith('http') ? p : `https://${HOST}${p}`));
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow : ${urls.length} adresse(s) envoyée(s), réponse HTTP ${res.status}`);
if (res.status >= 300) process.exitCode = 1;

# Opus Advisor Audit SaaS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a monorepo SaaS audit tool with a public questionnaire (free + paid), Stripe payment, PDF export, and an admin panel to write and send personalized reports.

**Architecture:** Three Vite/Node packages under `opus-advisor-audit/` — `server/` (Express + SQLite + Stripe + Nodemailer), `client/` (public audit flow), `admin/` (protected report management panel). All built on a shared `.env` at the monorepo root.

**Tech Stack:** Node 20 + Express 5 + better-sqlite3 · Vite 5 + React 18 + TypeScript 5 + Tailwind CSS 3 + Framer Motion · jsPDF · Stripe SDK · Nodemailer · React Router 6 · react-quill

---

## File Map

```
opus-advisor-audit/
├── package.json                   ← monorepo scripts (concurrently)
├── .env                           ← secrets (from .env.example)
├── .env.example
├── nginx.conf
├── server/
│   ├── package.json
│   ├── index.js                   ← Express app, CORS, routes mount
│   ├── db.js                      ← SQLite init + schema
│   ├── middleware/
│   │   └── auth.js                ← Bearer token check
│   └── routes/
│       ├── audit.js               ← POST submit-free, submit-premium
│       ├── payment.js             ← POST create-checkout, GET verify, POST webhook
│       └── admin.js               ← GET/PUT/POST audits (protected)
├── client/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx                ← React Router routes
│       ├── types.ts               ← shared TS types
│       ├── data/
│       │   └── questions.ts       ← all 25 questions + axes
│       ├── utils/
│       │   ├── scores.ts          ← score calculation + level labels
│       │   └── pdf.ts             ← jsPDF free report generator
│       ├── components/
│       │   ├── ScoreGauge.tsx     ← animated circular gauge
│       │   └── ScoreBar.tsx       ← axis bar with label
│       └── pages/
│           ├── Landing.tsx
│           ├── Audit.tsx          ← multi-step questionnaire
│           ├── Resultats.tsx
│           ├── Upgrade.tsx
│           └── Confirmation.tsx
└── admin/
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── types.ts
        ├── api/
        │   └── client.ts          ← fetch wrapper with auth header
        └── pages/
            ├── Login.tsx
            ├── Dashboard.tsx
            └── AuditDetail.tsx
```

---

## Task 1: Monorepo scaffold + root config

**Files:**
- Create: `opus-advisor-audit/package.json`
- Create: `opus-advisor-audit/.env.example`
- Create: `opus-advisor-audit/nginx.conf`

- [ ] **Step 1: Create root directory and package.json**

```bash
mkdir -p opus-advisor-audit && cd opus-advisor-audit
```

`package.json`:
```json
{
  "name": "opus-advisor-audit",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\" \"npm run dev --prefix admin\"",
    "build": "npm run build --prefix client && npm run build --prefix admin",
    "start": "npm run start --prefix server"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

- [ ] **Step 2: Create .env.example**

```
ADMIN_TOKEN=ton_token_secret_ici
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=587
SMTP_USER=contact@opusadvisory.fr
SMTP_PASS=
EMAIL_FROM=contact@opusadvisory.fr
PORT=3001
CLIENT_URL=https://audit.opusadvisory.fr
```

- [ ] **Step 3: Create nginx.conf**

```nginx
server {
    listen 80;
    server_name audit.opusadvisory.fr;

    location / {
        root /var/www/audit/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /admin {
        alias /var/www/audit/admin/dist;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] **Step 4: Install root deps**

```bash
npm install
```

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: monorepo scaffold"
```

---

## Task 2: Server — init, DB, base Express app

**Files:**
- Create: `server/package.json`
- Create: `server/index.js`
- Create: `server/db.js`

- [ ] **Step 1: Create server/package.json**

```json
{
  "name": "opus-advisor-audit-server",
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file=../.env index.js",
    "start": "node --env-file=../.env index.js"
  },
  "dependencies": {
    "better-sqlite3": "^9.4.3",
    "cors": "^2.8.5",
    "express": "^5.0.1",
    "nodemailer": "^6.9.13",
    "stripe": "^15.8.0"
  }
}
```

- [ ] **Step 2: Create server/db.js**

```js
import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');

mkdirSync(dataDir, { recursive: true });

const db = new Database(join(dataDir, 'audit.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS audits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    entreprise TEXT NOT NULL,
    email TEXT NOT NULL,
    score_processus REAL,
    score_outils REAL,
    score_automatisation REAL,
    score_global REAL,
    answers TEXT,
    statut TEXT DEFAULT 'en_attente',
    rapport TEXT,
    stripe_session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
```

- [ ] **Step 3: Create server/index.js**

```js
import express from 'express';
import cors from 'cors';
import auditRoutes from './routes/audit.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'] }));

// Raw body needed for Stripe webhooks — must be before express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/audit', auditRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

- [ ] **Step 4: Install deps**

```bash
cd server && npm install
```

- [ ] **Step 5: Verify server starts**

```bash
# In server/ directory, with ../.env present:
npm run dev
```

Expected: `Server running on port 3001`

- [ ] **Step 6: Commit**

```bash
git add server/
git commit -m "feat: server init with SQLite DB"
```

---

## Task 3: Server — auth middleware + audit routes

**Files:**
- Create: `server/middleware/auth.js`
- Create: `server/routes/audit.js`

- [ ] **Step 1: Create server/middleware/auth.js**

```js
export function requireAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
```

- [ ] **Step 2: Create server/routes/audit.js**

```js
import { Router } from 'express';
import db from '../db.js';

const router = Router();

// POST /api/audit/submit-free
router.post('/submit-free', (req, res) => {
  const { prenom, entreprise, email, answers, scores } = req.body;

  if (!prenom || !entreprise || !email) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const stmt = db.prepare(`
    INSERT INTO audits (prenom, entreprise, email, score_processus, score_outils, score_automatisation, score_global, answers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    prenom,
    entreprise,
    email,
    scores.processus,
    scores.outils,
    scores.automatisation,
    scores.global,
    JSON.stringify(answers)
  );

  res.json({ id: result.lastInsertRowid, scores });
});

// POST /api/audit/submit-premium
router.post('/submit-premium', (req, res) => {
  const { auditId, stripeSessionId } = req.body;

  db.prepare(`
    UPDATE audits SET stripe_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(stripeSessionId, auditId);

  res.json({ success: true });
});

export default router;
```

- [ ] **Step 3: Test submit-free manually**

```bash
curl -X POST http://localhost:3001/api/audit/submit-free \
  -H "Content-Type: application/json" \
  -d '{"prenom":"Jean","entreprise":"ACME","email":"jean@acme.fr","answers":{},"scores":{"processus":60,"outils":45,"automatisation":30,"global":45}}'
```

Expected: `{"id":1,"scores":{...}}`

- [ ] **Step 4: Commit**

```bash
git add server/middleware/ server/routes/audit.js
git commit -m "feat: auth middleware + audit submission routes"
```

---

## Task 4: Server — Stripe payment routes

**Files:**
- Create: `server/routes/payment.js`

- [ ] **Step 1: Create server/routes/payment.js**

```js
import { Router } from 'express';
import Stripe from 'stripe';
import db from '../db.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-checkout
router.post('/create-checkout', async (req, res) => {
  const { auditId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Rapport audit Opus Advisor' },
          unit_amount: 2900,
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: { auditId: String(auditId) },
      success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/upgrade`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/payment/verify/:session_id
router.get('/verify/:session_id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id);
    const paid = session.payment_status === 'paid';

    if (paid && session.metadata?.auditId) {
      db.prepare(`
        UPDATE audits SET stripe_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(session.id, session.metadata.auditId);
    }

    res.json({ paid, auditId: session.metadata?.auditId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payment/webhook
router.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (session.metadata?.auditId) {
      db.prepare(`
        UPDATE audits SET stripe_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(session.id, session.metadata.auditId);
    }
  }

  res.json({ received: true });
});

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add server/routes/payment.js
git commit -m "feat: Stripe payment routes"
```

---

## Task 5: Server — admin routes + email sending

**Files:**
- Create: `server/routes/admin.js`

- [ ] **Step 1: Create server/routes/admin.js**

```js
import { Router } from 'express';
import nodemailer from 'nodemailer';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// GET /api/admin/audits
router.get('/audits', (req, res) => {
  const audits = db.prepare(`
    SELECT id, prenom, entreprise, email, score_processus, score_outils,
           score_automatisation, score_global, statut, created_at
    FROM audits ORDER BY created_at DESC
  `).all();
  res.json(audits);
});

// GET /api/admin/audits/:id
router.get('/audits/:id', (req, res) => {
  const audit = db.prepare('SELECT * FROM audits WHERE id = ?').get(req.params.id);
  if (!audit) return res.status(404).json({ error: 'Not found' });
  audit.answers = audit.answers ? JSON.parse(audit.answers) : {};
  res.json(audit);
});

// PUT /api/admin/audits/:id/rapport
router.put('/audits/:id/rapport', (req, res) => {
  const { rapport } = req.body;
  db.prepare(`
    UPDATE audits SET rapport = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(rapport, req.params.id);
  res.json({ success: true });
});

// POST /api/admin/audits/:id/envoyer
router.post('/audits/:id/envoyer', async (req, res) => {
  const { rapport } = req.body;
  const audit = db.prepare('SELECT * FROM audits WHERE id = ?').get(req.params.id);
  if (!audit) return res.status(404).json({ error: 'Not found' });

  // Save rapport
  db.prepare(`
    UPDATE audits SET rapport = ?, statut = 'rapport_envoye', updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(rapport, req.params.id);

  // Send email
  try {
    await transporter.sendMail({
      from: `"Opus Advisor" <${process.env.EMAIL_FROM}>`,
      to: audit.email,
      subject: `Votre rapport d'audit Opus Advisor — ${audit.entreprise}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1A2332;padding:24px 32px">
            <h1 style="color:#C9A84C;margin:0;font-size:20px">Opus Advisor</h1>
          </div>
          <div style="padding:32px;background:#F8F6F1">
            <p style="color:#1A2332;font-size:16px">Bonjour ${audit.prenom},</p>
            <p style="color:#1A2332">Voici votre rapport d'audit opérationnel personnalisé.</p>
            <div style="background:#fff;border-left:4px solid #C9A84C;padding:24px;margin:24px 0;color:#1A2332">
              ${rapport.replace(/\n/g, '<br>')}
            </div>
            <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
            <p style="color:#666;font-size:12px">
              audit.opusadvisory.fr · contact@opusadvisory.fr
            </p>
          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: `Email failed: ${err.message}` });
  }
});

// POST /api/admin/verify-token (for admin login)
router.post('/verify-token', (req, res) => {
  // requireAuth middleware already validated the token
  res.json({ valid: true });
});

export default router;
```

- [ ] **Step 2: Test auth protection**

```bash
curl http://localhost:3001/api/admin/audits
```
Expected: `{"error":"Unauthorized"}` (401)

```bash
curl http://localhost:3001/api/admin/audits \
  -H "Authorization: Bearer ton_token_secret_ici"
```
Expected: `[]` (empty array)

- [ ] **Step 3: Commit**

```bash
git add server/routes/admin.js
git commit -m "feat: admin routes + Nodemailer email sending"
```

---

## Task 6: Client — Vite setup, routing, types, questions data, score utils

**Files:**
- Create: `client/package.json`
- Create: `client/vite.config.ts`
- Create: `client/tailwind.config.ts`
- Create: `client/index.html`
- Create: `client/src/main.tsx`
- Create: `client/src/App.tsx`
- Create: `client/src/types.ts`
- Create: `client/src/data/questions.ts`
- Create: `client/src/utils/scores.ts`

- [ ] **Step 1: Create client/package.json**

```json
{
  "name": "opus-advisor-audit-client",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.2.10",
    "jspdf": "^2.5.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.5",
    "vite": "^5.3.1"
  }
}
```

- [ ] **Step 2: Create client/vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
```

- [ ] **Step 3: Create client/tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1A2332',
        gold: '#C9A84C',
        offwhite: '#F8F6F1',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
} satisfies Config
```

- [ ] **Step 4: Create client/index.html**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Audit Opérationnel — Opus Advisor</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create client/src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 6: Create client/src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #F8F6F1; color: #1A2332; }
```

- [ ] **Step 7: Create client/src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Audit from './pages/Audit'
import Resultats from './pages/Resultats'
import Upgrade from './pages/Upgrade'
import Confirmation from './pages/Confirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/resultats" element={<Resultats />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 8: Create client/src/types.ts**

```ts
export type Axe = 'processus' | 'outils' | 'automatisation'

export interface Question {
  id: number
  axe: Axe
  text: string
  options: string[]
  premium: boolean
}

export interface Scores {
  processus: number
  outils: number
  automatisation: number
  global: number
}

export interface AuditState {
  prenom: string
  entreprise: string
  email: string
  answers: Record<number, number>
  scores: Scores
  auditId: number | null
}
```

- [ ] **Step 9: Create client/src/data/questions.ts**

```ts
import { Question } from '../types'

export const QUESTIONS: Question[] = [
  // AXE 1 — Processus internes (free)
  { id: 1, axe: 'processus', premium: false, text: 'Vos processus clés sont-ils documentés ?', options: ['Jamais', 'Partiellement', 'Oui pour la plupart', 'Tout est documenté'] },
  { id: 2, axe: 'processus', premium: false, text: 'Combien de temps perd votre équipe sur des tâches répétitives chaque semaine ?', options: ['+10h', '5-10h', '1-5h', "Moins d'1h"] },
  { id: 3, axe: 'processus', premium: false, text: "Avez-vous des processus qui dépendent d'une seule personne ?", options: ['Oui beaucoup', 'Quelques-uns', 'Rarement', 'Non'] },
  { id: 4, axe: 'processus', premium: false, text: 'Vos nouveaux collaborateurs sont-ils opérationnels en moins de 2 semaines ?', options: ['Non', 'Plutôt non', 'Plutôt oui', 'Oui'] },

  // AXE 2 — Outils & stack digitale (free)
  { id: 5, axe: 'outils', premium: false, text: "Combien d'outils différents votre équipe utilise-t-elle au quotidien ?", options: ['+15', '8-15', '4-7', 'Moins de 4'] },
  { id: 6, axe: 'outils', premium: false, text: 'Vos outils communiquent-ils entre eux ?', options: ['Pas du tout', 'Peu', 'Partiellement', 'Très bien'] },
  { id: 7, axe: 'outils', premium: false, text: 'Avez-vous une source unique de vérité pour vos données ?', options: ['Non', 'On essaie', 'Partiellement', 'Oui'] },
  { id: 8, axe: 'outils', premium: false, text: 'Votre stack actuelle freine-t-elle votre croissance ?', options: ['Oui clairement', 'Parfois', 'Rarement', 'Non'] },

  // AXE 3 — Automatisation (free)
  { id: 9, axe: 'automatisation', premium: false, text: 'Quelle part de vos tâches récurrentes est automatisée ?', options: ['Aucune', '-25%', '25-50%', '+50%'] },
  { id: 10, axe: 'automatisation', premium: false, text: "Utilisez-vous des outils d'automatisation ?", options: ['Non', 'On y réfléchit', 'Quelques-uns', 'Oui activement'] },
  { id: 11, axe: 'automatisation', premium: false, text: 'Avez-vous déjà chiffré le temps perdu sur des tâches manuelles ?', options: ['Jamais', 'Vaguement', 'Oui', 'Oui et c\'est énorme'] },
  { id: 12, axe: 'automatisation', premium: false, text: 'Votre équipe est-elle à l\'aise avec les outils no-code/automatisation ?', options: ['Pas du tout', 'Peu', 'Moyennement', 'Très à l\'aise'] },

  // AXE 1 — Processus internes (premium)
  { id: 13, axe: 'processus', premium: true, text: 'Avez-vous une cartographie visuelle de vos processus clés ?', options: ['Non', 'En cours', 'Partielle', 'Oui complète'] },
  { id: 14, axe: 'processus', premium: true, text: 'Vos processus sont-ils revus et mis à jour régulièrement ?', options: ['Jamais', 'Rarement', 'Annuellement', 'Trimestriellement'] },
  { id: 15, axe: 'processus', premium: true, text: 'Avez-vous des indicateurs de performance sur vos processus ?', options: ['Non', 'Quelques-uns', 'Oui mais peu suivis', 'Oui et pilotés'] },
  { id: 16, axe: 'processus', premium: true, text: "Combien de temps prend l'onboarding d'un nouveau client ?", options: ['+2 semaines', '1-2 semaines', '3-5 jours', '-3 jours'] },
  { id: 17, axe: 'processus', premium: true, text: 'Vos processus sont-ils adaptés à une croissance x2 de votre activité ?', options: ['Non', 'Partiellement', 'Probablement', 'Oui'] },

  // AXE 2 — Outils & stack digitale (premium)
  { id: 18, axe: 'outils', premium: true, text: 'Avez-vous un CRM actif et à jour ?', options: ['Non', 'On utilise Excel', 'CRM mais mal utilisé', 'Oui pleinement'] },
  { id: 19, axe: 'outils', premium: true, text: 'Votre stack a-t-elle été choisie stratégiquement ou accumulée au fil du temps ?', options: ['Accumulée', 'Mixte', 'Partiellement réfléchie', 'Stratégique'] },
  { id: 20, axe: 'outils', premium: true, text: 'Quel est votre budget mensuel outils SaaS ?', options: ['-100€', '100-500€', '500-2000€', '+2000€'] },
  { id: 21, axe: 'outils', premium: true, text: 'Avez-vous déjà audité votre stack pour éliminer les doublons ?', options: ['Jamais', 'Rarement', 'Une fois', 'Régulièrement'] },

  // AXE 3 — Automatisation (premium)
  { id: 22, axe: 'automatisation', premium: true, text: "Avez-vous des automatisations en production aujourd'hui ?", options: ['Non', '1-2 basiques', 'Quelques-unes', 'Système complet'] },
  { id: 23, axe: 'automatisation', premium: true, text: 'Vos automatisations sont-elles documentées et maintenables ?', options: ['Non', 'Partiellement', 'Plutôt oui', 'Oui complètement'] },
  { id: 24, axe: 'automatisation', premium: true, text: "Avez-vous une personne dédiée à l'amélioration continue de vos outils ?", options: ['Non', 'Personne partielle', 'Oui interne', 'Oui externe'] },
  { id: 25, axe: 'automatisation', premium: true, text: "Quel est votre principal frein à l'automatisation ?", options: ['Manque de temps', 'Manque de compétences', 'Budget', 'Pas de frein'] },
]

export const FREE_QUESTIONS = QUESTIONS.filter(q => !q.premium)
export const PREMIUM_QUESTIONS = QUESTIONS.filter(q => q.premium)
```

- [ ] **Step 10: Create client/src/utils/scores.ts**

```ts
import { Axe, Question, Scores } from '../types'

export function calculateScores(answers: Record<number, number>, questions: Question[]): Scores {
  const axeQuestions = (axe: Axe) => questions.filter(q => q.axe === axe)

  const axeScore = (axe: Axe): number => {
    const qs = axeQuestions(axe)
    const answered = qs.filter(q => answers[q.id] !== undefined)
    if (answered.length === 0) return 0
    const sum = answered.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
    return Math.round((sum / (answered.length * 3)) * 100)
  }

  const processus = axeScore('processus')
  const outils = axeScore('outils')
  const automatisation = axeScore('automatisation')
  const global = Math.round((processus + outils + automatisation) / 3)

  return { processus, outils, automatisation, global }
}

export type Level = { label: string; color: string; emoji: string }

export function getLevel(score: number): Level {
  if (score <= 40) return { label: 'Critique', color: '#ef4444', emoji: '🔴' }
  if (score <= 65) return { label: 'À améliorer', color: '#f59e0b', emoji: '🟡' }
  if (score <= 85) return { label: 'Bon niveau', color: '#22c55e', emoji: '🟢' }
  return { label: 'Excellent', color: '#10b981', emoji: '✅' }
}

export function getWeakAxes(scores: Scores): Axe[] {
  const axes: Axe[] = ['processus', 'outils', 'automatisation']
  return axes.filter(a => scores[a] < 66).sort((a, b) => scores[a] - scores[b])
}

export const AXE_LABELS: Record<Axe, string> = {
  processus: 'Processus internes',
  outils: 'Outils & stack digitale',
  automatisation: 'Automatisation',
}

export const RECOMMENDATIONS: Record<Axe, string> = {
  processus: 'Documentez et cartographiez vos 3 processus les plus critiques. Utilisez Notion ou Loom pour créer des SOPs accessibles à toute l\'équipe.',
  outils: 'Auditez votre stack actuelle. Éliminez les doublons fonctionnels et centralisez vos données dans un CRM unique connecté à vos outils.',
  automatisation: 'Identifiez la tâche manuelle qui vous coûte le plus de temps et automatisez-la avec Make ou Zapier. Visez -3h/semaine dès le premier mois.',
}
```

- [ ] **Step 11: Install client deps**

```bash
cd client && npm install
```

- [ ] **Step 12: Commit**

```bash
git add client/
git commit -m "feat: client Vite setup, types, questions data, score utils"
```

---

## Task 7: Client — Landing page

**Files:**
- Create: `client/src/pages/Landing.tsx`

- [ ] **Step 1: Create client/src/pages/Landing.tsx**

```tsx
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-navy px-8 py-4 flex items-center justify-between">
        <span className="text-gold font-bold text-xl">Opus Advisor</span>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-navy leading-tight mb-4">
          Évaluez la maturité opérationnelle<br />de votre entreprise en 10 minutes
        </h1>
        <p className="text-lg text-navy/70 mb-8">
          Diagnostic sur vos processus, outils et automatisations
        </p>
        <button
          onClick={() => navigate('/audit')}
          className="bg-gold text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gold/90 transition"
        >
          Démarrer mon audit
        </button>
      </section>

      {/* 3 axes */}
      <section className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Processus', desc: 'Évaluez la maturité et la robustesse de vos processus clés.' },
          { title: 'Outils', desc: 'Analysez votre stack digitale et son efficacité réelle.' },
          { title: 'Automatisation', desc: 'Mesurez votre niveau d\'automatisation et les gains potentiels.' },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gold/20">
            <h3 className="font-bold text-navy text-lg mb-2">{title}</h3>
            <p className="text-navy/60 text-sm">{desc}</p>
          </div>
        ))}
      </section>

      {/* Tableau comparatif */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-navy text-center mb-8">Gratuit vs Premium</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gold/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-3 text-left">Fonctionnalité</th>
                <th className="px-4 py-3 text-center">Gratuit</th>
                <th className="px-4 py-3 text-center text-gold">Premium 29€</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['12 questions', '✓', '✓'],
                ['Score par axe', '✓', '✓'],
                ['PDF basique', '✓', '✓'],
                ['25 questions complètes', '✗', '✓'],
                ['Rapport personnalisé expert', '✗', '✓'],
                ['Recommandations détaillées', '✗', '✓'],
                ['Envoi par email', '✗', '✓'],
              ].map(([feat, free, premium]) => (
                <tr key={feat} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-navy">{feat}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{free}</td>
                  <td className="px-4 py-3 text-center text-gold font-semibold">{premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/audit')}
            className="bg-gold text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gold/90 transition"
          >
            Démarrer mon audit
          </button>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Run client dev server and check landing**

```bash
cd client && npm run dev
```
Open `http://localhost:5173` — verify hero, 3 axes, comparison table, and CTA button render correctly.

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/Landing.tsx
git commit -m "feat: landing page"
```

---

## Task 8: Client — Audit questionnaire (multi-step)

**Files:**
- Create: `client/src/pages/Audit.tsx`

- [ ] **Step 1: Create client/src/pages/Audit.tsx**

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FREE_QUESTIONS } from '../data/questions'
import { calculateScores } from '../utils/scores'

const TOTAL = FREE_QUESTIONS.length // 12 questions

export default function Audit() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0-11 = questions, 12 = form
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [form, setForm] = useState({ prenom: '', entreprise: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [direction, setDirection] = useState(1)

  const question = FREE_QUESTIONS[step]
  const progress = Math.round((step / (TOTAL + 1)) * 100)

  function selectAnswer(value: number) {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
    setDirection(1)
    setTimeout(() => setStep(s => s + 1), 200)
  }

  function goBack() {
    if (step === 0) return
    setDirection(-1)
    setStep(s => s - 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const scores = calculateScores(answers, FREE_QUESTIONS)

    try {
      const res = await fetch('/api/audit/submit-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, answers, scores }),
      })
      const data = await res.json()

      sessionStorage.setItem('audit', JSON.stringify({
        ...form,
        answers,
        scores,
        auditId: data.id,
      }))

      navigate('/resultats')
    } catch {
      alert('Erreur lors de la soumission. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-offwhite flex flex-col">
      {/* Header */}
      <header className="bg-navy px-8 py-4">
        <span className="text-gold font-bold text-xl">Opus Advisor</span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-navy/10">
        <div
          className="h-full bg-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            {step < TOTAL ? (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                {/* Question counter */}
                <p className="text-sm text-navy/50 mb-2 text-center">
                  Question {step + 1} / {TOTAL}
                </p>

                {/* Axe badge */}
                <div className="flex justify-center mb-4">
                  <span className="bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    {question.axe === 'processus' ? 'Processus' : question.axe === 'outils' ? 'Outils' : 'Automatisation'}
                  </span>
                </div>

                {/* Question */}
                <h2 className="text-xl font-bold text-navy text-center mb-8">
                  {question.text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className="w-full text-left px-5 py-4 bg-white rounded-xl border-2 border-transparent hover:border-gold hover:shadow-sm transition font-medium text-navy"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-6 text-sm text-navy/50 hover:text-navy mx-auto block transition"
                  >
                    ← Retour
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-navy text-center mb-2">
                  Presque terminé !
                </h2>
                <p className="text-center text-navy/60 mb-8">
                  Entrez vos informations pour recevoir vos résultats.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean' },
                    { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'ACME SAS' },
                    { name: 'email', label: 'Email professionnel', type: 'email', placeholder: 'jean@acme.fr' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-navy mb-1">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[name as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [name]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 bg-white focus:outline-none focus:border-gold transition"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold text-white font-semibold py-4 rounded-xl hover:bg-gold/90 transition disabled:opacity-60"
                  >
                    {loading ? 'Envoi en cours...' : 'Voir mes résultats →'}
                  </button>
                </form>
                <button
                  onClick={goBack}
                  className="mt-4 text-sm text-navy/50 hover:text-navy mx-auto block transition"
                >
                  ← Retour
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Test questionnaire manually**

Navigate to `http://localhost:5173/audit`. Verify:
- Progress bar updates each question
- Framer Motion slide transitions work
- Back button works
- Form submits and redirects to `/resultats`

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/Audit.tsx
git commit -m "feat: multi-step audit questionnaire with Framer Motion"
```

---

## Task 9: Client — Resultats page + ScoreGauge + ScoreBar + PDF util

**Files:**
- Create: `client/src/components/ScoreGauge.tsx`
- Create: `client/src/components/ScoreBar.tsx`
- Create: `client/src/utils/pdf.ts`
- Create: `client/src/pages/Resultats.tsx`

- [ ] **Step 1: Create client/src/components/ScoreGauge.tsx**

```tsx
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface Props { score: number; size?: number }

export default function ScoreGauge({ score, size = 160 }: Props) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))

  useEffect(() => {
    const controls = animate(count, score, { duration: 1.2, ease: 'easeOut' })
    return controls.stop
  }, [score])

  const radius = (size - 20) / 2
  const circ = 2 * Math.PI * radius
  const strokeDash = (score / 100) * circ

  return (
    <div style={{ width: size, height: size }} className="relative mx-auto">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={10} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke="#C9A84C" strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - strokeDash }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="text-3xl font-bold text-navy">{rounded}</motion.span>
        <span className="text-xs text-navy/50">/100</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create client/src/components/ScoreBar.tsx**

```tsx
import { motion } from 'framer-motion'
import { getLevel } from '../utils/scores'

interface Props { label: string; score: number }

export default function ScoreBar({ label, score }: Props) {
  const level = getLevel(score)
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-navy">{label}</span>
        <span className="text-sm font-semibold" style={{ color: level.color }}>
          {score}/100 — {level.emoji} {level.label}
        </span>
      </div>
      <div className="h-2.5 bg-navy/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#C9A84C' }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create client/src/utils/pdf.ts**

```ts
import jsPDF from 'jspdf'
import { Scores } from '../types'
import { getLevel, AXE_LABELS, RECOMMENDATIONS, getWeakAxes } from './scores'

export function generateFreePDF(
  prenom: string,
  entreprise: string,
  scores: Scores
) {
  const doc = new jsPDF()
  const navy = [26, 35, 50] as [number, number, number]
  const gold = [201, 168, 76] as [number, number, number]

  // Header
  doc.setFillColor(...navy)
  doc.rect(0, 0, 210, 30, 'F')
  doc.setTextColor(...gold)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Opus Advisor — Rapport d\'audit', 14, 20)

  // Meta
  doc.setTextColor(...navy)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Préparé pour : ${prenom} — ${entreprise}`, 14, 42)
  doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 14, 50)

  // Scores
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Vos scores', 14, 65)

  const axes = ['processus', 'outils', 'automatisation'] as const
  let y = 76

  axes.forEach(axe => {
    const score = scores[axe]
    const level = getLevel(score)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...navy)
    doc.text(`${AXE_LABELS[axe]} :`, 14, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${score}/100 — ${level.emoji} ${level.label}`, 80, y)
    y += 10
  })

  // Global
  const globalLevel = getLevel(scores.global)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...gold)
  doc.text(`Score global : ${scores.global}/100 — ${globalLevel.label}`, 14, y + 8)

  // Recommendations
  y += 24
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...navy)
  doc.text('3 recommandations prioritaires', 14, y)

  const weakAxes = getWeakAxes(scores).slice(0, 3)
  weakAxes.forEach((axe, i) => {
    y += 12
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...navy)
    doc.text(`${i + 1}. ${AXE_LABELS[axe]}`, 14, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    const lines = doc.splitTextToSize(RECOMMENDATIONS[axe], 180)
    doc.text(lines, 14, y)
    y += lines.length * 6
  })

  // Footer
  doc.setFillColor(...navy)
  doc.rect(0, 275, 210, 22, 'F')
  doc.setTextColor(...gold)
  doc.setFontSize(9)
  doc.text('audit.opusadvisory.fr · contact@opusadvisory.fr', 14, 288)

  doc.save(`audit-opus-advisor-${entreprise.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}
```

- [ ] **Step 4: Create client/src/pages/Resultats.tsx**

```tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScoreGauge from '../components/ScoreGauge'
import ScoreBar from '../components/ScoreBar'
import { AXE_LABELS, RECOMMENDATIONS, getWeakAxes } from '../utils/scores'
import { generateFreePDF } from '../utils/pdf'
import { AuditState, Axe } from '../types'

export default function Resultats() {
  const navigate = useNavigate()
  const [audit, setAudit] = useState<AuditState | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('audit')
    if (!stored) { navigate('/'); return }
    setAudit(JSON.parse(stored))
  }, [])

  if (!audit) return null

  const { prenom, entreprise, scores } = audit
  const weakAxes = getWeakAxes(scores).slice(0, 3) as Axe[]

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-navy px-8 py-4">
        <span className="text-gold font-bold text-xl">Opus Advisor</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-navy text-center mb-2">
          Vos résultats, {prenom}
        </h1>
        <p className="text-center text-navy/60 mb-10">{entreprise}</p>

        {/* Global score */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/20 mb-6 text-center">
          <p className="text-sm font-semibold text-navy/50 uppercase tracking-wide mb-4">Score global</p>
          <ScoreGauge score={scores.global} />
        </div>

        {/* Axes */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/20 mb-6">
          <p className="text-sm font-semibold text-navy/50 uppercase tracking-wide mb-6">Score par axe</p>
          {(['processus', 'outils', 'automatisation'] as Axe[]).map(axe => (
            <ScoreBar key={axe} label={AXE_LABELS[axe]} score={scores[axe]} />
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/20 mb-8">
          <p className="text-sm font-semibold text-navy/50 uppercase tracking-wide mb-6">
            3 recommandations prioritaires
          </p>
          <div className="space-y-4">
            {weakAxes.map((axe, i) => (
              <div key={axe} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-navy text-sm mb-1">{AXE_LABELS[axe]}</p>
                  <p className="text-navy/60 text-sm">{RECOMMENDATIONS[axe]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => generateFreePDF(prenom, entreprise, scores)}
            className="w-full border-2 border-navy text-navy font-semibold py-4 rounded-xl hover:bg-navy/5 transition"
          >
            Télécharger le rapport gratuit (PDF)
          </button>
          <button
            onClick={() => navigate('/upgrade')}
            className="w-full bg-gold text-white font-semibold py-4 rounded-xl hover:bg-gold/90 transition"
          >
            Rapport détaillé personnalisé — 29€ →
          </button>
          <a
            href="mailto:contact@opusadvisory.fr"
            className="block w-full text-center text-sm text-navy/50 hover:text-navy py-2 transition"
          >
            Prendre un appel avec un expert →
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify results page**

Complete audit flow at `http://localhost:5173/audit`. Verify:
- Circular gauge animates
- Bar scores animate
- PDF download works and contains correct info

- [ ] **Step 6: Commit**

```bash
git add client/src/components/ client/src/utils/pdf.ts client/src/pages/Resultats.tsx
git commit -m "feat: results page with animated gauge, score bars, free PDF"
```

---

## Task 10: Client — Upgrade + Confirmation pages

**Files:**
- Create: `client/src/pages/Upgrade.tsx`
- Create: `client/src/pages/Confirmation.tsx`

- [ ] **Step 1: Create client/src/pages/Upgrade.tsx**

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upgrade() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const auditRaw = sessionStorage.getItem('audit')
  const audit = auditRaw ? JSON.parse(auditRaw) : null

  if (!audit) {
    navigate('/')
    return null
  }

  async function handlePayment() {
    setLoading(true)
    try {
      const res = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: audit.auditId, email: audit.email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Erreur lors du paiement. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    '25 questions d\'analyse complète',
    'Rapport rédigé par un expert Opus Advisor',
    'Recommandations personnalisées pour votre entreprise',
    'Plan d\'action prioritaire sur 90 jours',
    'Envoi par email sous 48h',
  ]

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-navy px-8 py-4">
        <span className="text-gold font-bold text-xl">Opus Advisor</span>
      </header>

      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-navy text-center mb-2">
          Rapport expert personnalisé
        </h1>
        <p className="text-center text-navy/60 mb-10">
          Obtenez une analyse complète de votre maturité opérationnelle
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/20 mb-8">
          <ul className="space-y-3 mb-8">
            {features.map(f => (
              <li key={f} className="flex items-start gap-3">
                <span className="text-gold font-bold">✓</span>
                <span className="text-navy text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-navy">29€</span>
            <span className="text-navy/50 ml-2">TTC · Paiement unique</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gold text-white font-semibold py-4 rounded-xl text-lg hover:bg-gold/90 transition disabled:opacity-60"
          >
            {loading ? 'Redirection...' : 'Payer 29€ et recevoir mon rapport →'}
          </button>
        </div>

        <p className="text-center text-xs text-navy/40">
          Paiement sécurisé par Stripe · Remboursement possible sous 7 jours
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create client/src/pages/Confirmation.tsx**

```tsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Confirmation() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const [status, setStatus] = useState<'loading' | 'paid' | 'error'>('loading')

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return }

    fetch(`/api/payment/verify/${sessionId}`)
      .then(r => r.json())
      .then(data => setStatus(data.paid ? 'paid' : 'error'))
      .catch(() => setStatus('error'))
  }, [sessionId])

  return (
    <div className="min-h-screen bg-offwhite flex flex-col">
      <header className="bg-navy px-8 py-4">
        <span className="text-gold font-bold text-xl">Opus Advisor</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          {status === 'loading' && (
            <p className="text-navy/60">Vérification du paiement...</p>
          )}

          {status === 'paid' && (
            <>
              <div className="text-5xl mb-6">✅</div>
              <h1 className="text-2xl font-bold text-navy mb-3">Paiement reçu !</h1>
              <p className="text-navy/60 mb-8">
                Votre rapport est en cours de rédaction par notre équipe.<br />
                Vous le recevrez par email <strong>sous 48h</strong>.
              </p>
              <a
                href="https://opusadvisory.fr"
                className="inline-block bg-navy text-gold font-semibold px-8 py-3 rounded-xl hover:bg-navy/90 transition"
              >
                Retour au site Opus Advisor
              </a>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-5xl mb-6">⚠️</div>
              <h1 className="text-2xl font-bold text-navy mb-3">Une erreur est survenue</h1>
              <p className="text-navy/60 mb-8">
                Si votre paiement a bien été effectué, contactez-nous à{' '}
                <a href="mailto:contact@opusadvisory.fr" className="text-gold">
                  contact@opusadvisory.fr
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/Upgrade.tsx client/src/pages/Confirmation.tsx
git commit -m "feat: upgrade and confirmation pages"
```

---

## Task 11: Admin — Vite setup, routing, API client, Login page

**Files:**
- Create: `admin/package.json`
- Create: `admin/vite.config.ts`
- Create: `admin/tailwind.config.ts`
- Create: `admin/index.html`
- Create: `admin/src/main.tsx`
- Create: `admin/src/App.tsx`
- Create: `admin/src/types.ts`
- Create: `admin/src/api/client.ts`
- Create: `admin/src/pages/Login.tsx`

- [ ] **Step 1: Create admin/package.json**

```json
{
  "name": "opus-advisor-audit-admin",
  "private": true,
  "scripts": {
    "dev": "vite --port 5174",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "react-quill": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.5",
    "vite": "^5.3.1"
  }
}
```

- [ ] **Step 2: Create admin/vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/admin',
  server: { port: 5174, proxy: { '/api': 'http://localhost:3001' } },
})
```

- [ ] **Step 3: Create admin/tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1A2332',
        gold: '#C9A84C',
        offwhite: '#F8F6F1',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
} satisfies Config
```

- [ ] **Step 4: Create admin/index.html**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin — Opus Advisor Audit</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create admin/src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
)
```

- [ ] **Step 6: Create admin/src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #F8F6F1; color: #1A2332; }
```

- [ ] **Step 7: Create admin/src/types.ts**

```ts
export interface AuditRow {
  id: number
  prenom: string
  entreprise: string
  email: string
  score_processus: number
  score_outils: number
  score_automatisation: number
  score_global: number
  statut: 'en_attente' | 'rapport_envoye'
  created_at: string
}

export interface AuditDetail extends AuditRow {
  answers: Record<number, number>
  rapport: string | null
  stripe_session_id: string | null
}
```

- [ ] **Step 8: Create admin/src/api/client.ts**

```ts
const BASE = '/api/admin'

function getToken() {
  return localStorage.getItem('admin_token') || ''
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...options, headers: headers() })
  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const api = {
  verifyToken: (token: string) =>
    fetch(`${BASE}/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    }).then(r => r.ok),

  getAudits: () => request<import('./types').AuditRow[]>('/audits'),

  getAudit: (id: number) => request<import('./types').AuditDetail>(`/audits/${id}`),

  saveRapport: (id: number, rapport: string) =>
    request(`/audits/${id}/rapport`, { method: 'PUT', body: JSON.stringify({ rapport }) }),

  sendRapport: (id: number, rapport: string) =>
    request(`/audits/${id}/envoyer`, { method: 'POST', body: JSON.stringify({ rapport }) }),
}
```

- [ ] **Step 9: Create admin/src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AuditDetail from './pages/AuditDetail'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('admin_token')
  return token ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/audits/:id" element={<PrivateRoute><AuditDetail /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 10: Create admin/src/pages/Login.tsx**

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export default function Login() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const valid = await api.verifyToken(token)
    if (valid) {
      localStorage.setItem('admin_token', token)
      navigate('/')
    } else {
      setError('Token invalide')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-navy mb-1">Opus Advisor</h1>
        <p className="text-navy/50 text-sm mb-6">Panel d'administration</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Token d'accès</label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-4 py-3 border border-navy/20 rounded-xl focus:outline-none focus:border-gold"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-white font-semibold py-3 rounded-xl hover:bg-gold/90 transition disabled:opacity-60"
          >
            {loading ? 'Vérification...' : 'Accéder au panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 11: Install admin deps**

```bash
cd admin && npm install
```

- [ ] **Step 12: Commit**

```bash
git add admin/
git commit -m "feat: admin Vite setup, router, API client, login page"
```

---

## Task 12: Admin — Dashboard

**Files:**
- Create: `admin/src/pages/Dashboard.tsx`

- [ ] **Step 1: Create admin/src/pages/Dashboard.tsx**

```tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { AuditRow } from '../types'

type Filter = 'tous' | 'en_attente' | 'rapport_envoye'

export default function Dashboard() {
  const navigate = useNavigate()
  const [audits, setAudits] = useState<AuditRow[]>([])
  const [filter, setFilter] = useState<Filter>('tous')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAudits()
      .then(setAudits)
      .finally(() => setLoading(false))
  }, [])

  function logout() {
    localStorage.removeItem('admin_token')
    navigate('/login')
  }

  const filtered = filter === 'tous' ? audits : audits.filter(a => a.statut === filter)

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-navy px-8 py-4 flex items-center justify-between">
        <span className="text-gold font-bold text-xl">Opus Advisor — Admin</span>
        <button onClick={logout} className="text-white/60 hover:text-white text-sm transition">
          Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Audits reçus</h1>
          <div className="flex gap-2">
            {(['tous', 'en_attente', 'rapport_envoye'] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy border border-navy/20 hover:border-navy'
                }`}
              >
                {f === 'tous' ? 'Tous' : f === 'en_attente' ? 'En attente' : 'Envoyés'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-navy/50 text-center py-12">Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="text-navy/50 text-center py-12">Aucun audit trouvé.</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-navy/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy/10 bg-navy/5 text-navy">
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Prénom</th>
                  <th className="px-4 py-3 text-left font-semibold">Entreprise</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-center font-semibold">Score global</th>
                  <th className="px-4 py-3 text-center font-semibold">Statut</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(audit => (
                  <tr key={audit.id} className="border-b border-navy/5 hover:bg-navy/2 transition">
                    <td className="px-4 py-3 text-navy/60">
                      {new Date(audit.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{audit.prenom}</td>
                    <td className="px-4 py-3 text-navy">{audit.entreprise}</td>
                    <td className="px-4 py-3 text-navy/60">{audit.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-gold">{audit.score_global}/100</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        audit.statut === 'rapport_envoye'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {audit.statut === 'rapport_envoye' ? 'Rapport envoyé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/audits/${audit.id}`)}
                        className="text-gold hover:text-gold/70 font-semibold text-sm transition"
                      >
                        Voir →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add admin/src/pages/Dashboard.tsx
git commit -m "feat: admin dashboard with filter and audits table"
```

---

## Task 13: Admin — AuditDetail page

**Files:**
- Create: `admin/src/pages/AuditDetail.tsx`

- [ ] **Step 1: Create admin/src/pages/AuditDetail.tsx**

```tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { AuditDetail as AuditDetailType } from '../types'
import { QUESTIONS } from '../../src/data/questions' // Note: import from client — see Step 2 for workaround

// Inline question labels to avoid cross-package import
const QUESTION_MAP: Record<number, { text: string; options: string[]; axe: string }> = {
  1: { axe: 'Processus', text: 'Vos processus clés sont-ils documentés ?', options: ['Jamais', 'Partiellement', 'Oui pour la plupart', 'Tout est documenté'] },
  2: { axe: 'Processus', text: 'Combien de temps perd votre équipe sur des tâches répétitives chaque semaine ?', options: ['+10h', '5-10h', '1-5h', "Moins d'1h"] },
  3: { axe: 'Processus', text: "Avez-vous des processus qui dépendent d'une seule personne ?", options: ['Oui beaucoup', 'Quelques-uns', 'Rarement', 'Non'] },
  4: { axe: 'Processus', text: 'Vos nouveaux collaborateurs sont-ils opérationnels en moins de 2 semaines ?', options: ['Non', 'Plutôt non', 'Plutôt oui', 'Oui'] },
  5: { axe: 'Outils', text: "Combien d'outils différents votre équipe utilise-t-elle au quotidien ?", options: ['+15', '8-15', '4-7', 'Moins de 4'] },
  6: { axe: 'Outils', text: 'Vos outils communiquent-ils entre eux ?', options: ['Pas du tout', 'Peu', 'Partiellement', 'Très bien'] },
  7: { axe: 'Outils', text: 'Avez-vous une source unique de vérité pour vos données ?', options: ['Non', 'On essaie', 'Partiellement', 'Oui'] },
  8: { axe: 'Outils', text: 'Votre stack actuelle freine-t-elle votre croissance ?', options: ['Oui clairement', 'Parfois', 'Rarement', 'Non'] },
  9: { axe: 'Automatisation', text: 'Quelle part de vos tâches récurrentes est automatisée ?', options: ['Aucune', '-25%', '25-50%', '+50%'] },
  10: { axe: 'Automatisation', text: "Utilisez-vous des outils d'automatisation ?", options: ['Non', 'On y réfléchit', 'Quelques-uns', 'Oui activement'] },
  11: { axe: 'Automatisation', text: 'Avez-vous déjà chiffré le temps perdu sur des tâches manuelles ?', options: ['Jamais', 'Vaguement', 'Oui', "Oui et c'est énorme"] },
  12: { axe: 'Automatisation', text: "Votre équipe est-elle à l'aise avec les outils no-code/automatisation ?", options: ['Pas du tout', 'Peu', 'Moyennement', 'Très à l\'aise'] },
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score <= 40 ? '#ef4444' : score <= 65 ? '#f59e0b' : '#22c55e'
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-navy font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 bg-navy/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: '#C9A84C' }} />
      </div>
    </div>
  )
}

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [audit, setAudit] = useState<AuditDetailType | null>(null)
  const [rapport, setRapport] = useState('')
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!id) return
    api.getAudit(Number(id)).then(data => {
      setAudit(data)
      setRapport(data.rapport || '')
    })
  }, [id])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function handleSave() {
    if (!id) return
    setSaving(true)
    try {
      await api.saveRapport(Number(id), rapport)
      showToast('Brouillon sauvegardé ✓')
    } catch {
      showToast('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  async function handleSend() {
    if (!id) return
    setSending(true)
    setShowConfirm(false)
    try {
      await api.sendRapport(Number(id), rapport)
      setAudit(prev => prev ? { ...prev, statut: 'rapport_envoye' } : prev)
      showToast('Rapport envoyé au client ✓')
    } catch {
      showToast('Erreur lors de l\'envoi')
    } finally {
      setSending(false)
    }
  }

  if (!audit) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center">
      <p className="text-navy/50">Chargement...</p>
    </div>
  )

  const answeredQs = Object.entries(audit.answers)

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-navy text-white px-4 py-2 rounded-lg text-sm z-50 shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-navy px-8 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-white/60 hover:text-white text-sm transition">
          ← Retour
        </button>
        <span className="text-gold font-bold text-xl">Opus Advisor — Admin</span>
        <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
          audit.statut === 'rapport_envoye' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'
        }`}>
          {audit.statut === 'rapport_envoye' ? 'Rapport envoyé' : 'En attente'}
        </span>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT — Infos + Scores + Réponses */}
        <div className="space-y-6">
          {/* Client info */}
          <div className="bg-white rounded-xl p-6 border border-navy/10 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Informations client</h2>
            <dl className="space-y-2 text-sm">
              {[
                ['Prénom', audit.prenom],
                ['Entreprise', audit.entreprise],
                ['Email', audit.email],
                ['Date', new Date(audit.created_at).toLocaleDateString('fr-FR')],
                ['Stripe', audit.stripe_session_id || '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-navy/50 w-24 flex-shrink-0">{k}</dt>
                  <dd className="text-navy font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Scores */}
          <div className="bg-white rounded-xl p-6 border border-navy/10 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Scores</h2>
            <ScoreBar label="Processus internes" score={audit.score_processus} />
            <ScoreBar label="Outils & stack digitale" score={audit.score_outils} />
            <ScoreBar label="Automatisation" score={audit.score_automatisation} />
            <div className="mt-4 pt-4 border-t border-navy/10 flex justify-between items-center">
              <span className="font-bold text-navy">Score global</span>
              <span className="text-2xl font-bold text-gold">{audit.score_global}/100</span>
            </div>
          </div>

          {/* Réponses */}
          <div className="bg-white rounded-xl p-6 border border-navy/10 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Réponses détaillées</h2>
            {answeredQs.length === 0 ? (
              <p className="text-navy/40 text-sm">Aucune réponse enregistrée.</p>
            ) : (
              <div className="space-y-3">
                {answeredQs.map(([qId, answerIdx]) => {
                  const q = QUESTION_MAP[Number(qId)]
                  if (!q) return null
                  return (
                    <div key={qId} className="text-sm">
                      <p className="text-navy/50 text-xs font-semibold uppercase tracking-wide">{q.axe}</p>
                      <p className="text-navy font-medium">{q.text}</p>
                      <p className="text-gold font-semibold">{q.options[Number(answerIdx)]}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Éditeur rapport */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-navy/10 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Rapport personnalisé</h2>
            <textarea
              value={rapport}
              onChange={e => setRapport(e.target.value)}
              placeholder="Rédigez le rapport personnalisé pour ce client..."
              rows={20}
              className="w-full px-4 py-3 border border-navy/20 rounded-xl text-sm font-mono resize-y focus:outline-none focus:border-gold transition"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 border-2 border-navy text-navy font-semibold py-3 rounded-xl hover:bg-navy/5 transition disabled:opacity-60"
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder le brouillon'}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={sending || audit.statut === 'rapport_envoye' || !rapport.trim()}
              className="flex-1 bg-gold text-white font-semibold py-3 rounded-xl hover:bg-gold/90 transition disabled:opacity-60"
            >
              {audit.statut === 'rapport_envoye' ? 'Rapport envoyé ✓' : 'Envoyer au client'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-navy text-lg mb-2">Envoyer le rapport ?</h3>
            <p className="text-navy/60 text-sm mb-6">
              Le rapport sera envoyé par email à <strong>{audit.email}</strong>. Cette action ne peut pas être annulée.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 border-navy/20 text-navy py-2 rounded-xl hover:border-navy transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 bg-gold text-white font-semibold py-2 rounded-xl hover:bg-gold/90 transition disabled:opacity-60"
              >
                {sending ? 'Envoi...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Fix cross-package import in AuditDetail**

The `QUESTION_MAP` is already inlined in the component above — no cross-package import needed. The inline map covers all 12 free questions. This is intentional to keep packages independent.

- [ ] **Step 3: Verify admin flow end-to-end**

1. Start all services: `npm run dev` from monorepo root
2. Go to `http://localhost:5174/admin/login`
3. Enter token from `.env` → should redirect to dashboard
4. Complete an audit at `http://localhost:5173`
5. Verify audit appears in dashboard
6. Click "Voir" → check scores, answers
7. Write a rapport → save draft → send to client (verify email received)

- [ ] **Step 4: Commit**

```bash
git add admin/src/pages/AuditDetail.tsx
git commit -m "feat: admin audit detail with rapport editor and send confirmation"
```

---

## Task 14: Final wiring — postcss configs + build verification

**Files:**
- Create: `client/postcss.config.js`
- Create: `admin/postcss.config.js`
- Create: `client/tsconfig.json`
- Create: `admin/tsconfig.json`

- [ ] **Step 1: Create PostCSS configs**

`client/postcss.config.js` and `admin/postcss.config.js` (identical):
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 2: Create tsconfig files**

`client/tsconfig.json` and `admin/tsconfig.json` (identical):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Test full build**

```bash
cd client && npm run build
cd ../admin && npm run build
```

Expected: Both complete without errors. `client/dist/` and `admin/dist/` created.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: postcss and tsconfig for client and admin builds"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Landing page hero + 3 axes + comparison table + CTA → Task 7
- [x] Questionnaire 12 free questions multi-step + progress bar + transitions → Task 8
- [x] Formulaire prenom/entreprise/email before results → Task 8
- [x] POST /api/audit/submit-free → Task 3
- [x] Score calculation (0-3 per option, per-axe %, global average) → Task 6
- [x] Resultats: circular gauge, axis bars, levels, 3 recommendations → Task 9
- [x] PDF gratuit jsPDF → Task 9
- [x] CTA vers /upgrade → Task 9
- [x] Stripe checkout 29€ → Task 4 + Task 10
- [x] Confirmation page + verify session → Task 4 + Task 10
- [x] Webhook Stripe → Task 4
- [x] Admin login (static token) → Task 11
- [x] Dashboard table + filtre statut → Task 12
- [x] AuditDetail: infos + scores + réponses + textarea rapport → Task 13
- [x] Save draft → Task 13
- [x] Send email + modal confirmation + statut update → Task 5 + Task 13
- [x] Email template navy/gold Opus Advisor → Task 5
- [x] SQLite schema → Task 2
- [x] Auth middleware → Task 3
- [x] CORS config → Task 2
- [x] nginx.conf → Task 1
- [x] .env.example → Task 1
- [x] monorepo package.json with concurrently → Task 1
- [x] server/data/ auto-created → Task 2

**Gaps fixed:**
- Added `POST /api/admin/verify-token` in admin routes (needed for Login.tsx) → Task 5
- QUESTION_MAP inlined in AuditDetail to avoid cross-package import → Task 13 Step 2

**Type consistency verified:**
- `AuditState` interface used consistently in client sessionStorage → Tasks 8, 9, 10
- `AuditRow` / `AuditDetail` used consistently in admin → Tasks 12, 13
- `api.getAudit()` returns `AuditDetail` which has `answers: Record<number, number>` matching server JSON.parse output ✓

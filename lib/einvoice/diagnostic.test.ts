// Tests de computeDiagnostic : `npm test` (exécuteur de tests intégré à Node, sans dépendance).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeDiagnostic } from './diagnostic.ts';
import { QUESTIONS, parseAnswers, type Answers } from './questions.ts';

const TODAY = new Date('2026-10-31T10:00:00Z');

const base: Answers = {
  q1_taille: 'pme',
  q2_tva: 'taxable',
  q3_clients: ['entreprises'],
  q4_secteur: 'autre',
  q5_outil: 'logiciel',
  q6_pa: 'oui',
  q7_volume: '10-50',
};
const run = (over: Partial<Answers>) => computeDiagnostic({ ...base, ...over }, TODAY);

test('micro-entreprise en franchise, sans plateforme, avec des clients pros', () => {
  const d = run({ q1_taille: 'micro', q2_tva: 'franchise', q6_pa: 'non', q7_volume: '0-10', q5_outil: 'bureautique' });
  assert.equal(d.verdict, 'EN_RETARD');
  assert.equal(d.reception.statut, 'en_retard');
  assert.match(d.reception.risque ?? '', /mise en demeure/);
  assert.match(d.reception.risque ?? '', /500\s€/);
  assert.match(d.reception.risque ?? '', /1\s000\s€/);
  assert.equal(d.emission.concerne, 'oui');
  assert.equal(d.emission.date, '2027-09-01');
  assert.equal(d.emission.enVigueur, false);
  assert.match(d.emission.texte, /franchise de TVA ne vous en dispense pas/);
  assert.equal(d.ereporting.concerne, false);
  // 5 factures par mois × 12 × 50 € = 3 000 €, sous le plafond.
  assert.equal(d.amende?.montant, 3_000);
  assert.match(d.amende?.texte ?? '', /pas un montant certain/);
  assert.match(d.amende?.texte ?? '', /première infraction réparée dans les 30 jours/);
  assert.match(d.recommandation, /Word, Excel ou Canva/);
  assert.equal(d.plan[0].titre, 'Désigner votre plateforme agréée de réception');
  assert.equal(d.plan.at(-1)?.date, '2027-09-01');
  assert.equal(d.plan.at(-1)?.titre, 'Émission obligatoire');
  assert.equal(d.plan.at(-1)?.echeance, true);
  assert.ok(!d.plan[0].echeance, 'la première étape est une action à faire');
});

test('organisme de formation 100 % exonéré, avec plateforme', () => {
  const d = run({ q2_tva: 'exoneree', q4_secteur: 'formation', q3_clients: ['entreprises', 'particuliers'] });
  assert.equal(d.verdict, 'EN_REGLE');
  assert.equal(d.verdictLabel, "En règle pour l'instant");
  assert.equal(d.emission.concerne, 'non');
  assert.match(d.emission.texte, /261 à 261 E/);
  assert.equal(d.ereporting.concerne, false, "pas d'e-reporting pour une activité entièrement exonérée");
  assert.equal(d.amende, null);
  assert.match(d.recommandation, /réception/);
});

test('organisme de formation 100 % exonéré, sans plateforme : en retard sur la réception', () => {
  const d = run({ q2_tva: 'exoneree', q4_secteur: 'formation', q6_pa: 'non' });
  assert.equal(d.verdict, 'EN_RETARD');
  assert.match(d.resume, /activité exonérée ne vous dispense pas de la réception/);
  assert.equal(d.amende, null);
});

test('PME mixte avec des particuliers', () => {
  const d = run({ q2_tva: 'mixte', q3_clients: ['entreprises', 'particuliers'], q7_volume: '50-200' });
  assert.equal(d.verdict, 'A_PREPARER');
  assert.equal(d.emission.concerne, 'partiel');
  assert.match(d.emission.texte, /partie taxable/);
  assert.equal(d.ereporting.concerne, true);
  assert.equal(d.ereporting.date, '2027-09-01');
  assert.match(d.ereporting.texte ?? '', /des particuliers/);
  // 125 × 12 × 50 € dépasse le plafond : 15 000 €.
  assert.equal(d.amende?.montant, 15_000);
  assert.match(d.plan.at(-1)?.detail ?? '', /e-reporting/);
});

test('grande entreprise : émission déjà obligatoire', () => {
  const d = run({ q1_taille: 'grande', q3_clients: ['entreprises', 'etranger'], q7_volume: '200+' });
  assert.equal(d.verdict, 'A_PREPARER');
  assert.equal(d.emission.date, '2026-09-01');
  assert.equal(d.emission.enVigueur, true);
  assert.match(d.titre, /obligatoire depuis le 1er\sseptembre 2026/);
  assert.match(d.emission.texte, /^Depuis le 1er\sseptembre 2026/);
  assert.equal(d.ereporting.enVigueur, true);
  assert.equal(d.amende?.montant, 15_000);
  assert.ok(d.plan.every((s) => s.date > '2026-10-31'), 'aucune étape dans le passé');
});

test('TVA inconnue : émission à vérifier avec le comptable', () => {
  const d = run({ q2_tva: 'inconnu', q6_pa: 'non' });
  assert.equal(d.verdict, 'EN_RETARD');
  assert.equal(d.emission.concerne, 'a_verifier');
  assert.match(d.emission.texte, /À vérifier avec votre comptable/);
  assert.ok(d.amende, "l'amende reste affichée comme ordre de grandeur");
  assert.ok(d.plan.some((s) => /régime de TVA/.test(s.titre)));
  assert.ok(d.plan.length <= 5);
});

test('« Je ne sais pas ce que c’est » compte comme une plateforme non désignée', () => {
  const d = run({ q6_pa: 'inconnu' });
  assert.equal(d.verdict, 'EN_RETARD');
  assert.match(d.reception.texte, /service validé par l'administration/);
});

test('ventes aux seuls particuliers : pas d’émission, mais de l’e-reporting', () => {
  const d = run({ q3_clients: ['particuliers'] });
  assert.equal(d.verdict, 'A_PREPARER');
  assert.equal(d.emission.concerne, 'non');
  assert.equal(d.ereporting.concerne, true);
  assert.equal(d.amende, null);
  assert.match(d.titre, /e-reporting/);
});

test('logiciel de facturation nommé : le nom apparaît dans la recommandation', () => {
  const d = run({ q5_outil: 'logiciel', q5_outil_nom: 'Facturo' });
  assert.match(d.recommandation, /votre logiciel \(Facturo\)/);
});

test('toutes les combinaisons : plan de 3 à 5 étapes, datées, futures et dans l’ordre', () => {
  const opts = (id: string) => QUESTIONS.find((q) => q.id === id)!.options.map((o) => o.value);
  const clientSets = [['entreprises'], ['particuliers'], ['etranger'], ['entreprises', 'particuliers'], ['entreprises', 'particuliers', 'etranger']];
  let n = 0;
  for (const q1 of opts('q1_taille'))
    for (const q2 of opts('q2_tva'))
      for (const q3 of clientSets)
        for (const q5 of opts('q5_outil'))
          for (const q6 of opts('q6_pa'))
            for (const q7 of opts('q7_volume')) {
              const answers = parseAnswers({ ...base, q1_taille: q1, q2_tva: q2, q3_clients: q3, q5_outil: q5, q6_pa: q6, q7_volume: q7 });
              assert.ok(answers);
              const d = computeDiagnostic(answers, TODAY);
              const ctx = JSON.stringify({ q1, q2, q3, q5, q6, q7 });
              assert.ok(d.plan.length >= 3 && d.plan.length <= 5, `${d.plan.length} étapes pour ${ctx}`);
              assert.ok(d.plan.every((s, i) => s.date > '2026-10-31' && (i === 0 || s.date > d.plan[i - 1].date)), `dates du plan pour ${ctx}`);
              assert.ok(!/—/.test(JSON.stringify(d)), `tiret cadratin pour ${ctx}`);
              if (q6 !== 'oui') assert.equal(d.verdict, 'EN_RETARD', ctx);
              n++;
            }
  assert.ok(n > 1000);
});

test('parseAnswers rejette une réponse inconnue ou manquante', () => {
  assert.equal(parseAnswers({ ...base, q6_pa: 'peut-être' }), null);
  assert.equal(parseAnswers({ ...base, q3_clients: [] }), null);
  const { q7_volume, ...sansVolume } = base;
  assert.equal(parseAnswers(sansVolume), null);
  assert.equal(parseAnswers({ ...base, q5_outil: 'comptable', q5_outil_nom: 'Ignoré' })?.q5_outil_nom, undefined);
});

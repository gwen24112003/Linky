'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarCheck, Check, ExternalLink, RotateCcw } from 'lucide-react';
import { QUESTIONS, type Answers, type QuestionId } from '@/lib/einvoice/questions';
import { computeDiagnostic, type Diagnostic, type Verdict } from '@/lib/einvoice/diagnostic';
import { DATES, DISCLAIMER, OFFICIAL_LINKS, dateFr, typo } from '@/lib/einvoice/rules';
import { BOOKING_URL, LEAD_API_URL, OFFER_PRICE, PRIVACY_URL } from '@/lib/einvoice/config';
import { track } from '@/lib/analytics';

const NAVY = '#1A2332';
const GOLD = '#C9A84C';
const GOLD_INK = '#8A6A1C';
const PAPER = '#FAF7F0';
const RULE = 'rgba(26,35,50,0.16)';

const VERDICT_STYLE: Record<Verdict, { bg: string; ink: string; border: string }> = {
  EN_RETARD: { bg: '#FBEAEA', ink: '#8B1D1D', border: '#E5B3B3' },
  A_PREPARER: { bg: '#FAF3DF', ink: GOLD_INK, border: GOLD },
  EN_REGLE: { bg: '#E7F2EA', ink: '#1E5E3A', border: '#A7CDB3' },
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

/** Provenance du visiteur : ?src= (site, email, linkedin…) et paramètres UTM. */
function readTracking(): { src: string; utm: Record<string, string> } {
  const q = new URLSearchParams(window.location.search);
  let src = (q.get('src') ?? '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  if (!src) {
    try {
      src = document.referrer && new URL(document.referrer).host === window.location.host ? 'site' : 'direct';
    } catch {
      src = 'direct';
    }
  }
  const utm: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = (q.get(k) ?? '').trim().slice(0, 100);
    if (v) utm[k] = v;
  }
  return { src, utm };
}

type Stage = 'intro' | 'quiz' | 'result';
type SendState = 'idle' | 'sending' | 'done' | 'error';
type SendError = 'network' | 'server' | 'rate' | 'invalid';

const ERRORS: Record<SendError, string> = {
  network: "La connexion a échoué. Vérifiez votre accès à internet, puis réessayez.",
  server: "Le serveur n'a pas répondu correctement. Réessayez dans un instant.",
  rate: "Trop d'envois depuis cette connexion. Réessayez dans une heure.",
  invalid: 'Un champ ne semble pas valide. Vérifiez votre email et réessayez.',
};

const primaryBtn =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base bg-[#1A2332] text-[#FAF7F0] hover:bg-[#26334a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2332]';
const ghostBtn =
  'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-base text-[#1A2332] hover:bg-[#1A2332]/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2332]';
const fieldCls =
  'mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-3 text-base text-[#1A2332] focus:outline-none focus:ring-2 focus:ring-[#1A2332] focus:border-[#1A2332]';

export const EInvoiceDiagnostic: React.FC = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const tracking = useRef<{ src: string; utm: Record<string, string> }>({ src: 'direct', utm: {} });
  const headingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    tracking.current = readTracking();
  }, []);

  // À chaque écran, le focus va sur son titre : le lecteur d'écran annonce la question.
  useEffect(() => {
    if (stage !== 'intro') headingRef.current?.focus();
  }, [stage, index]);

  const question = QUESTIONS[index];
  const total = QUESTIONS.length;

  const result: Diagnostic | null = useMemo(
    () => (stage === 'result' ? computeDiagnostic(answers as Answers, new Date()) : null),
    [stage, answers],
  );

  useEffect(() => {
    if (result) track('diagnostic_complete', { verdict: result.verdict, src: tracking.current.src });
  }, [result]);

  const start = () => {
    track('diagnostic_start', { src: tracking.current.src });
    setStage('quiz');
    setIndex(0);
  };

  const isAnswered = (id: QuestionId) => {
    const v = answers[id];
    return Array.isArray(v) ? v.length > 0 : Boolean(v);
  };

  const next = () => {
    if (!isAnswered(question.id)) return;
    if (index < total - 1) setIndex(index + 1);
    else setStage('result');
  };
  const back = () => (index > 0 ? setIndex(index - 1) : setStage('intro'));
  const restart = () => {
    setAnswers({});
    setIndex(0);
    setStage('quiz');
  };

  const setSingle = (id: QuestionId, value: string, viaPointer: boolean) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    // Au clic, on passe à la question suivante ; au clavier, la flèche ne fait que changer la réponse.
    if (viaPointer && !(id === 'q5_outil' && value === 'logiciel')) {
      // Le garde sur l'index évite de sauter une question en cas de double clic.
      window.setTimeout(() => {
        if (index < total - 1) setIndex((i) => (i === index ? i + 1 : i));
        else setStage('result');
      }, 220);
    }
  };
  const toggleMulti = (id: QuestionId, value: string) =>
    setAnswers((a) => {
      const cur = (a[id] as string[] | undefined) ?? [];
      return { ...a, [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  return (
    <section className="pt-32 md:pt-40 pb-20 md:pb-28" style={{ background: PAPER }}>
      <div className="container mx-auto px-5 md:px-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_INK }}>
          Diagnostic gratuit
        </p>
        <h1 className="mt-4 font-heading font-bold leading-[1.05] tracking-tight text-4xl md:text-6xl" style={{ color: NAVY }}>
          Facture électronique&nbsp;: où en êtes-vous&nbsp;?
        </h1>

        {stage === 'intro' && (
          <div className="mt-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              7 questions, 2 minutes, un verdict clair et les dates qui vous concernent.
            </p>
            <button type="button" onClick={start} className={`${primaryBtn} mt-8`}>
              Commencer
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="mt-4 text-sm text-gray-600">Sans inscription. Votre verdict s'affiche avant toute demande d'email.</p>
          </div>
        )}

        {stage === 'quiz' && (
          <form
            className="mt-8 rounded-2xl border bg-white p-5 md:p-8"
            style={{ borderColor: RULE }}
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
              <span>
                Question {index + 1} sur {total}
              </span>
            </div>
            <div
              className="mt-2 h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: '#ECE7DA' }}
              role="progressbar"
              aria-label="Progression du diagnostic"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={index + 1}
            >
              <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%`, background: GOLD }} />
            </div>

            <fieldset className="mt-7">
              <legend className="w-full">
                <span
                  ref={headingRef as React.RefObject<HTMLSpanElement>}
                  tabIndex={-1}
                  className="block font-heading font-bold text-2xl md:text-3xl leading-snug focus:outline-none"
                  style={{ color: NAVY }}
                >
                  {typo(question.label)}
                </span>
                {question.hint && <span className="mt-1 block text-sm text-gray-600">{question.hint}</span>}
              </legend>

              <div className="mt-5 grid gap-3">
                {question.options.map((o) => {
                  const name = question.id;
                  const checked = question.multiple
                    ? ((answers[name] as string[] | undefined) ?? []).includes(o.value)
                    : answers[name] === o.value;
                  return (
                    <label key={o.value} className="block cursor-pointer">
                      <input
                        type={question.multiple ? 'checkbox' : 'radio'}
                        name={name}
                        value={o.value}
                        checked={checked}
                        className="peer sr-only"
                        onChange={() => (question.multiple ? toggleMulti(name, o.value) : setSingle(name, o.value, false))}
                        onClick={(e) => {
                          if (!question.multiple && e.detail > 0) setSingle(name, o.value, true);
                        }}
                      />
                      <span
                        className="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-base leading-snug transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#1A2332] peer-focus-visible:ring-offset-2 hover:border-[#1A2332]"
                        style={{
                          borderColor: checked ? NAVY : RULE,
                          background: checked ? '#F6F1E3' : '#FFFFFF',
                          color: NAVY,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center border ${question.multiple ? 'rounded' : 'rounded-full'}`}
                          style={{ borderColor: checked ? NAVY : '#9CA3AF', background: checked ? NAVY : '#FFFFFF' }}
                        >
                          {checked && <Check size={13} strokeWidth={3} color="#FAF7F0" />}
                        </span>
                        {typo(o.label)}
                      </span>
                    </label>
                  );
                })}
              </div>

              {question.id === 'q5_outil' && answers.q5_outil === 'logiciel' && (
                <div className="mt-4">
                  <label htmlFor="q5-nom" className="text-sm font-semibold" style={{ color: NAVY }}>
                    Lequel ? <span className="font-normal text-gray-600">(facultatif)</span>
                  </label>
                  <input
                    id="q5-nom"
                    type="text"
                    maxLength={80}
                    autoComplete="off"
                    value={answers.q5_outil_nom ?? ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, q5_outil_nom: e.target.value }))}
                    className={fieldCls}
                    style={{ borderColor: RULE }}
                  />
                </div>
              )}
            </fieldset>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={back} className={ghostBtn}>
                <ArrowLeft size={18} aria-hidden="true" />
                Retour
              </button>
              <button type="submit" className={primaryBtn} disabled={!isAnswered(question.id)}>
                {index < total - 1 ? 'Suivant' : 'Voir mon verdict'}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {stage === 'result' && result && (
          <Result
            d={result}
            answers={answers as Answers}
            tracking={tracking.current}
            headingRef={headingRef as React.RefObject<HTMLHeadingElement>}
            onRestart={restart}
            onBack={() => {
              setStage('quiz');
              setIndex(total - 1);
            }}
          />
        )}
      </div>
    </section>
  );
};

const STATUS_EMISSION: Record<Diagnostic['emission']['concerne'], string> = {
  oui: 'Concerné',
  partiel: 'Partie taxable concernée',
  a_verifier: 'À vérifier',
  non: 'Non concerné',
};

const Result: React.FC<{
  d: Diagnostic;
  answers: Answers;
  tracking: { src: string; utm: Record<string, string> };
  headingRef: React.RefObject<HTMLHeadingElement>;
  onRestart: () => void;
  onBack: () => void;
}> = ({ d, answers, tracking, headingRef, onRestart, onBack }) => {
  const style = VERDICT_STYLE[d.verdict];
  const rows = [
    {
      label: 'Réception',
      status: d.reception.statut === 'ok' ? 'En place' : 'En retard',
      date: `Obligatoire depuis le ${dateFr(DATES.reception)}`,
      text: d.reception.texte,
      extra: d.reception.risque,
    },
    {
      label: 'Émission',
      status: STATUS_EMISSION[d.emission.concerne],
      date: d.emission.concerne === 'non' ? null : `${d.emission.enVigueur ? 'Obligatoire depuis le' : 'À partir du'} ${dateFr(d.emission.date)}`,
      text: d.emission.texte,
      extra: null,
    },
    ...(d.ereporting.concerne
      ? [
          {
            label: 'E-reporting',
            status: 'Concerné',
            date: `${d.ereporting.enVigueur ? 'Obligatoire depuis le' : 'À partir du'} ${dateFr(d.ereporting.date)}`,
            text: d.ereporting.texte ?? '',
            extra: null,
          },
        ]
      : []),
  ];

  return (
    <div className="mt-8">
      <div className="rounded-2xl border bg-white p-5 md:p-8" style={{ borderColor: RULE }}>
        <p
          className="inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]"
          style={{ background: style.bg, color: style.ink, borderColor: style.border }}
        >
          Verdict : {d.verdictLabel}
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-heading font-bold text-2xl md:text-4xl leading-tight focus:outline-none"
          style={{ color: NAVY }}
        >
          {typo(d.titre)}
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">{typo(d.resume)}</p>

        <dl className="mt-8">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-x-6 gap-y-1 border-t py-5 md:grid-cols-[11rem_1fr]" style={{ borderColor: RULE }}>
              <dt>
                <span className="block font-semibold" style={{ color: NAVY }}>
                  {r.label}
                </span>
                <span className="block text-sm font-semibold" style={{ color: GOLD_INK }}>
                  {r.status}
                </span>
                {r.date && <span className="block text-sm text-gray-600">{r.date}</span>}
              </dt>
              <dd className="text-base text-gray-700 leading-relaxed">
                {typo(r.text)}
                {r.extra && <span className="mt-2 block text-gray-700">{typo(r.extra)}</span>}
              </dd>
            </div>
          ))}
          {d.amende && (
            <div className="grid gap-x-6 gap-y-1 border-t py-5 md:grid-cols-[11rem_1fr]" style={{ borderColor: RULE }}>
              <dt className="font-semibold" style={{ color: NAVY }}>
                Amende indicative
              </dt>
              <dd className="text-base text-gray-700 leading-relaxed">{typo(d.amende.texte)}</dd>
            </div>
          )}
          <div className="grid gap-x-6 gap-y-1 border-t border-b py-5 md:grid-cols-[11rem_1fr]" style={{ borderColor: RULE }}>
            <dt className="font-semibold" style={{ color: NAVY }}>
              Votre outil
            </dt>
            <dd className="text-base text-gray-700 leading-relaxed">{typo(d.recommandation)}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-gray-600 leading-relaxed">
          {DISCLAIMER} Pour aller plus loin&nbsp;:{' '}
          <a href={OFFICIAL_LINKS.faqImpots.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#1A2332]">
            {OFFICIAL_LINKS.faqImpots.label}
            <ExternalLink size={12} aria-hidden="true" className="inline ml-1 -mt-0.5" />
          </a>{' '}
          et{' '}
          <a href={OFFICIAL_LINKS.servicePublic.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#1A2332]">
            {OFFICIAL_LINKS.servicePublic.label}
            <ExternalLink size={12} aria-hidden="true" className="inline ml-1 -mt-0.5" />
          </a>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={onBack} className={ghostBtn}>
            <ArrowLeft size={18} aria-hidden="true" />
            Modifier mes réponses
          </button>
          <button type="button" onClick={onRestart} className={ghostBtn}>
            <RotateCcw size={18} aria-hidden="true" />
            Recommencer
          </button>
        </div>
      </div>

      <LeadForm d={d} answers={answers} tracking={tracking} />

      <div className="mt-6 rounded-2xl p-5 md:p-8" style={{ background: NAVY }}>
        <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-white">Vous préférez qu'on s'en occupe ?</h2>
        <p className="mt-3 text-base text-white/80 leading-relaxed">
          En 20 minutes, on regarde votre situation et ce qu'il reste à faire, sans engagement.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('booking_click', { position: 'appel', verdict: d.verdict, src: tracking.src })}
          className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ background: GOLD, color: NAVY }}
        >
          <CalendarCheck size={18} aria-hidden="true" />
          Réserver un appel de 20 min
        </a>

        <div className="mt-8 border-t border-white/15 pt-6">
          <h3 className="font-heading font-semibold text-xl text-white">Mise en conformité clé en main</h3>
          <p className="mt-2 text-base text-white/80 leading-relaxed">
            On choisit avec vous la plateforme agréée, on relie votre outil de facturation, on teste vos premières factures et on forme la
            personne qui facture.
          </p>
          {OFFER_PRICE && <p className="mt-3 font-heading font-bold text-2xl text-white">{OFFER_PRICE}</p>}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('booking_click', { position: 'offre', verdict: d.verdict, src: tracking.src })}
            className="mt-4 inline-flex items-center gap-2 font-semibold text-base underline underline-offset-4 decoration-[#C9A84C] text-white hover:text-[#F3E6BD]"
          >
            En parler pendant l'appel
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

const LeadForm: React.FC<{ d: Diagnostic; answers: Answers; tracking: { src: string; utm: Record<string, string> } }> = ({ d, answers, tracking }) => {
  const [form, setForm] = useState({ prenom: '', email: '', entreprise: '', consent: false, website: '' });
  const [state, setState] = useState<SendState>('idle');
  const [error, setError] = useState<SendError | null>(null);
  const [mailSent, setMailSent] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === 'done') doneRef.current?.focus();
  }, [state]);

  const send = async () => {
    setState('sending');
    setError(null);
    try {
      const res = await fetch(LEAD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, answers, src: tracking.src, utm: tracking.utm }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; mailSent?: boolean; error?: string };
      if (res.status === 429) throw new Error('rate');
      if (res.status === 400) throw new Error('invalid');
      if (!res.ok || !data.ok) throw new Error('server');
      setMailSent(Boolean(data.mailSent));
      setState('done');
      track('lead_submit', { verdict: d.verdict, src: tracking.src });
    } catch (e) {
      const kind = e instanceof Error && (e.message === 'rate' || e.message === 'invalid' || e.message === 'server') ? e.message : 'network';
      setError(kind as SendError);
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="mt-6 rounded-2xl border bg-white p-5 md:p-8" style={{ borderColor: RULE }}>
        <h2 ref={doneRef} tabIndex={-1} className="font-heading font-bold text-2xl md:text-3xl leading-tight focus:outline-none" style={{ color: NAVY }}>
          Votre plan d'action
        </h2>
        <p className="mt-3 text-base text-gray-700 leading-relaxed" role="status">
          {mailSent
            ? `C'est envoyé : votre plan arrive à ${form.email}. Pensez à vérifier vos indésirables.`
            : "C'est noté. Le mail n'a pas pu partir pour l'instant : votre plan est ci-dessous, et nous vous le renverrons."}
        </p>
        <ol className="mt-6">
          {d.plan.map((s, i) => (
            <li key={s.date + s.titre} className="grid gap-x-6 gap-y-1 border-t py-5 md:grid-cols-[11rem_1fr]" style={{ borderColor: RULE }}>
              <span className="text-sm font-semibold" style={{ color: GOLD_INK }}>
                Étape {i + 1} · {s.echeance ? 'le' : 'avant le'} {dateFr(s.date)}
              </span>
              <span>
                <span className="block font-semibold" style={{ color: NAVY }}>
                  {typo(s.titre)}
                </span>
                <span className="mt-1 block text-base text-gray-700 leading-relaxed">{typo(s.detail)}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const sending = state === 'sending';
  return (
    <form
      className="relative mt-6 rounded-2xl border bg-white p-5 md:p-8"
      style={{ borderColor: RULE }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!sending) send();
      }}
    >
      <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight" style={{ color: NAVY }}>
        Recevez votre plan d'action daté
      </h2>
      <p className="mt-3 text-base text-gray-700 leading-relaxed">
        3 à 5 étapes datées selon vos réponses, puis un rappel avant votre prochaine échéance.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="lead-prenom" className="text-sm font-semibold" style={{ color: NAVY }}>
            Prénom
          </label>
          <input id="lead-prenom" required maxLength={60} autoComplete="given-name" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} className={fieldCls} style={{ borderColor: RULE }} />
        </div>
        <div>
          <label htmlFor="lead-entreprise" className="text-sm font-semibold" style={{ color: NAVY }}>
            Entreprise
          </label>
          <input id="lead-entreprise" required maxLength={120} autoComplete="organization" value={form.entreprise} onChange={(e) => setForm({ ...form, entreprise: e.target.value })} className={fieldCls} style={{ borderColor: RULE }} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="lead-email" className="text-sm font-semibold" style={{ color: NAVY }}>
            Email
          </label>
          <input id="lead-email" type="email" required maxLength={254} autoComplete="email" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldCls} style={{ borderColor: RULE }} />
        </div>
      </div>

      {/* Piège à robots : invisible pour les visiteurs, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Ne pas remplir</label>
        <input id="lead-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-5 w-5 shrink-0 rounded border-gray-400 accent-[#1A2332] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2332]"
        />
        <label htmlFor="lead-consent" className="text-sm text-gray-700 leading-relaxed">
          J'accepte de recevoir mon plan d'action et d'être recontacté par Opus Advisor au sujet de la facturation électronique.
          Désinscription en un clic.{' '}
          <a href={PRIVACY_URL} className="underline underline-offset-2 hover:text-[#1A2332]">
            Politique de confidentialité
          </a>
          .
        </label>
      </div>

      {state === 'error' && error && (
        <div className="mt-5 rounded-lg border px-4 py-3" style={{ borderColor: '#E5B3B3', background: '#FBEAEA' }} role="alert">
          <p className="text-sm" style={{ color: '#8B1D1D' }}>
            {ERRORS[error]}
          </p>
          {(error === 'network' || error === 'server') && (
            <button type="button" onClick={send} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-2" style={{ color: '#8B1D1D' }}>
              <RotateCcw size={14} aria-hidden="true" />
              Réessayer
            </button>
          )}
        </div>
      )}

      <button type="submit" className={`${primaryBtn} mt-6 w-full md:w-auto`} disabled={sending}>
        {sending ? 'Envoi en cours…' : 'Recevoir mon plan'}
        {!sending && <ArrowRight size={18} aria-hidden="true" />}
      </button>
    </form>
  );
};

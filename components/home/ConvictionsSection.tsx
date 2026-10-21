import React from 'react';

const NAVY = '#1A2332';
const RULE = 'rgba(255,255,255,0.16)';

const rules = [
  {
    title: "Vous comprenez tout ce qu'on installe.",
    desc: "On forme votre équipe et on vous laisse la documentation. Si on arrête de travailler ensemble, votre système continue de tourner.",
  },
  {
    title: "On ne touche rien sur les logiciels qu'on recommande.",
    desc: "Aucune commission d'éditeur. On vous conseille l'outil qui vous convient, et c'est souvent celui que vous avez déjà.",
  },
  {
    title: 'On chiffre le gain avant de commencer.',
    desc: 'Si on ne peut pas montrer ce que ça vous rapporte, on ne vous le vend pas.',
  },
  {
    title: 'Si on ne vous sert à rien, on vous le dit.',
    desc: "Certaines boîtes n'ont pas besoin de nous. Dans ce cas, on vous oriente vers quelqu'un d'autre.",
  },
];

export const ConvictionsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: NAVY }} aria-labelledby="convictions-title">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2
          data-reveal
          id="convictions-title"
          className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl text-white max-w-3xl"
        >
          Quatre règles qu'on s'impose
        </h2>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {rules.map((r, i) => (
            <li key={r.title} data-reveal data-reveal-delay={String(i % 2 + 1)} className="py-7 border-t" style={{ borderColor: RULE }}>
              <h3 className="font-heading font-semibold text-xl md:text-2xl leading-snug text-white">
                {r.title}
              </h3>
              <p className="mt-3 text-base text-white/70 leading-relaxed">{r.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

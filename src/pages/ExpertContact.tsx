import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ArrowRight, Users, Star, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SEO } from '../components/SEO';
import { CustomSelect } from '../components/ui/CustomSelect';

const inputClass =
  'w-full bg-transparent border-b border-gray-200 outline-none py-3 text-gray-900 transition-colors duration-300 placeholder:text-gray-400 text-lg';


export const ExpertContact: React.FC = () => {
  const [formData, setFormData] = useState({
    objet: '', expertise: '', message: '', email: '', nom: '', prenom: '', linkedin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      emailjs.init('7nk-E4GjPBoHa_-Py');
      await emailjs.send('service_d1de6lx', 'template_n3wiuwt', {
        from_email: formData.email,
        to_name: 'Opus Advisor Recrutement',
        objet: `[Candidature Expert] ${formData.objet}`,
        service: `Expertise: ${formData.expertise}`,
        message: `Nom: ${formData.nom}\nPrénom: ${formData.prenom}\nLinkedIn: ${formData.linkedin}\n\nMessage:\n${formData.message}`,
      });
      setSubmitStatus('success');
      setFormData({ objet: '', expertise: '', message: '', email: '', nom: '', prenom: '', linkedin: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Rejoignez le réseau Opus Advisor - Candidature Expert"
        description="Vous êtes consultant ou expert en organisation ? Rejoignez notre réseau de partenaires qualifiés."
        url="https://opusadvisor.fr/expert-contact"
      />
      <Header />

      {/* ── Hero Section ── */}
      <section
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A2332, #2A3A50, #1A2332)',
          backgroundSize: '400% 400%',
          animation: 'mesh-shift 14s ease infinite',
        }}
      >
        <div className="absolute pointer-events-none opacity-20 hidden md:block"
          style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.4), transparent)', filter: 'blur(70px)', top: '-20%', right: '5%', animation: 'float 9s ease-in-out infinite' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Réseau · Experts
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-white font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Rejoignez l'Excellence
          </motion.h1>
        </div>
      </section>

      {/* ── Contact Section — split layout ── */}
      <section className="flex-grow relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ── Colonne gauche : infos ── */}
          <div className="relative bg-gray-50 px-10 py-20 lg:px-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute pointer-events-none"
              style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent)', filter: 'blur(60px)', top: '10%', left: '-20%', animation: 'float 10s ease-in-out infinite' }} />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-[0.95]">
                Partagez votre{' '}
                <span className="text-gradient">expertise</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
                Nous recherchons des consultants et experts pour enrichir notre réseau et co-construire des missions à forte valeur ajoutée.
              </p>

              {[
                { icon: <Users size={20} style={{ color: '#C9A84C' }} />, label: 'Réseau', text: 'Missions en co-traitance' },
                { icon: <Briefcase size={20} style={{ color: '#C9A84C' }} />, label: 'Projets', text: 'PME & ETI ambitieuses' },
                { icon: <Star size={20} style={{ color: '#C9A84C' }} />, label: 'Profils', text: 'Experts & Consultants seniors' },
              ].map(({ icon, label, text }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-4 mb-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
                  whileHover={{ background: 'rgba(201,168,76,0.10)', x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.2)' }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">{label}</p>
                    <p className="text-gray-900 font-medium">{text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Colonne droite : formulaire ── */}
          <div className="bg-white px-10 py-20 lg:px-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute pointer-events-none opacity-40"
              style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.06), transparent)', filter: 'blur(40px)', top: '5%', right: '-10%' }} />

            <motion.div
              className="relative z-10 max-w-lg mx-auto w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Votre candidature</h3>

              <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Nom</label>
                    <input type="text" name="nom" placeholder="Dupont" required value={formData.nom} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Prénom</label>
                    <input type="text" name="prenom" placeholder="Marie" required value={formData.prenom} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Email professionnel</label>
                  <input type="email" name="email" placeholder="votre@email.com" required value={formData.email} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Lien LinkedIn</label>
                  <input type="url" name="linkedin" placeholder="linkedin.com/in/votre-profil" required value={formData.linkedin} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Objet de la candidature</label>
                  <input type="text" name="objet" placeholder="Ex : Consultant en organisation" required value={formData.objet} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Domaine d'expertise</label>
                  <CustomSelect
                    name="expertise"
                    value={formData.expertise}
                    onChange={val => setFormData(f => ({ ...f, expertise: val }))}
                    placeholder="Sélectionnez une expertise…"
                    required
                    options={[
                      { value: 'Consulting en Organisation', label: 'Consulting en Organisation' },
                      { value: 'Automatisation & No-Code', label: 'Automatisation & No-Code' },
                      { value: 'Data & Analytics', label: 'Data & Analytics' },
                      { value: 'Product Management', label: 'Product Management' },
                      { value: 'Développement Spécifique', label: 'Développement Spécifique' },
                      { value: 'Autre', label: 'Autre' },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Pourquoi rejoindre Opus Advisor ?</label>
                  <textarea name="message" placeholder="Décrivez votre parcours, vos motivations et comment vous souhaitez collaborer…" required rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>

                {submitStatus === 'success' && (
                  <motion.div className="p-4 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-emerald-700 font-medium">✓ Candidature envoyée ! Nous vous recontacterons sous 48h.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div className="p-4 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-red-600 font-medium">✗ Erreur lors de l'envoi. Réessayez ou contactez-nous directement.</p>
                  </motion.div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 text-white px-8 py-4 rounded-xl text-base font-semibold hover:scale-105 transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 btn-shimmer group"
                    style={{ background: '#1A2332' }}
                  >
                    <span>{isSubmitting ? 'Envoi en cours…' : 'Envoyer ma candidature'}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

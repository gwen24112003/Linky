import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SEO } from '../components/SEO';
import { bannerStyles } from '../theme/bannerStyles';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    objet: '',
    service: '',
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialisation d'EmailJS avec la clé publique
      emailjs.init('7nk-E4GjPBoHa_-Py');

      const serviceId = 'service_d1de6lx';
      const templateId = 'template_n3wiuwt';

      const templateParams = {
        from_email: formData.email,
        to_name: 'Linky',
        objet: formData.objet,
        service: formData.service,
        message: formData.message,
      };

      const response = await emailjs.send(serviceId, templateId, templateParams);

      console.log('Email envoyé avec succès:', response);
      setSubmitStatus('success');
      setFormData({ objet: '', service: '', message: '', email: '' });

      // Reset le message de succès après 5 secondes
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Erreur détaillée:', error);
      console.error('Status:', error?.status);
      console.error('Text:', error?.text);
      setSubmitStatus('error');

      // Reset le message d'erreur après 5 secondes
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Contactez Linky - Audit & Conseil Stratégique"
        description="Prenez rendez-vous avec un associé Linky pour un audit de cadrage. Discutons de vos enjeux de structuration et de croissance."
        url="https://linky4u.com/contact"
      />
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        style={bannerStyles}
      >
        <motion.h1
          className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Contactez nos associés
        </motion.h1>
      </section>

      {/* Contact Section */}
      <section className="flex-grow py-20 section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Informations de contact */}
            <div>
              {/* Ambient glow */}
              <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(13,148,136,0.1)', filter: 'blur(60px)' }} />

              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white relative z-10"
                style={{ lineHeight: '0.9' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Vos enjeux
                <br />
                méritent une <span className="text-gradient">expertise</span>
              </motion.h2>

              <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white/60 leading-relaxed relative z-10">
                Discutons de vos défis de structuration et de croissance. Premier audit de cadrage sans engagement avec un consultant senior.
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex-shrink-0">
                  <Mail size={32} className="text-teal-400" />
                </div>
                <a
                  href="mailto:linky4u.contact@gmail.com"
                  className="text-xl md:text-2xl text-white/80 hover:text-teal-400 transition-colors underline"
                >
                  linky4u.contact@gmail.com
                </a>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex-shrink-0">
                  <Phone size={32} className="text-teal-400" />
                </div>
                <a
                  href="tel:+33615756549"
                  className="text-xl md:text-2xl text-white/80 hover:text-teal-400 transition-colors"
                >
                  +33 6 15 75 65 49
                </a>
              </div>
            </div>

            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Objet */}
                <div>
                  <input
                    type="text"
                    name="objet"
                    placeholder="Objet *"
                    required
                    value={formData.objet}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-lg text-white placeholder-white/40 focus:outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(13,148,136,0.25)',
                    }}
                    onFocus={e => { e.target.style.border = '1px solid #0d9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(13,148,136,0.25)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Service demandé */}
                <div>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg text-lg focus:outline-none transition-all duration-200 ${formData.service === '' ? 'text-white/40' : 'text-white'}`}
                    style={{
                      background: 'rgba(26,36,33,0.9)',
                      border: '1px solid rgba(13,148,136,0.25)',
                    }}
                    onFocus={e => { (e.target as HTMLSelectElement).style.border = '1px solid #0d9488'; (e.target as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; }}
                    onBlur={e => { (e.target as HTMLSelectElement).style.border = '1px solid rgba(13,148,136,0.25)'; (e.target as HTMLSelectElement).style.boxShadow = 'none'; }}
                  >
                    <option value="" disabled style={{ background: '#111918' }}>Type de besoin *</option>
                    <option value="Diagnostic & Stratégie" style={{ background: '#111918' }}>Diagnostic & Stratégie</option>
                    <option value="Optimisation des Processus" style={{ background: '#111918' }}>Optimisation des Processus</option>
                    <option value="Accompagnement Long Terme" style={{ background: '#111918' }}>Accompagnement Long Terme</option>
                    <option value="Autre" style={{ background: '#111918' }}>Autre demande</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Décrivez vos enjeux *"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-lg text-white placeholder-white/40 focus:outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(13,148,136,0.25)',
                    }}
                    onFocus={e => { e.target.style.border = '1px solid #0d9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(13,148,136,0.25)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email professionnel *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-lg text-white placeholder-white/40 focus:outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(13,148,136,0.25)',
                    }}
                    onFocus={e => { e.target.style.border = '1px solid #0d9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(13,148,136,0.25)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg text-teal-300 border border-teal-600/30" style={{ background: 'rgba(13,148,136,0.1)' }}>
                    ✓ Message envoyé avec succès !
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg text-red-300 border border-red-600/30" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    ✗ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                  </div>
                )}

                {/* Bouton Envoyer */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-xl text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 btn-shimmer"
                  >
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Solliciter un audit'}</span>
                    <ArrowRight size={20} />
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

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
      <section className="flex-grow py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Informations de contact */}
            <div>
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900"
                style={{ lineHeight: '0.9' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Vos enjeux
                <br />
                méritent une <span className="text-gradient">expertise</span>
              </motion.h2>

              <p className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-600 leading-relaxed">
                Discutons de vos défis de structuration et de croissance. Premier audit de cadrage sans engagement avec un consultant senior.
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Mail size={32} className="text-teal-600" />
                </div>
                <a
                  href="mailto:linky4u.contact@gmail.com"
                  className="text-xl md:text-2xl text-gray-900 hover:text-teal-600 transition-colors underline"
                >
                  linky4u.contact@gmail.com
                </a>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Phone size={32} className="text-teal-600" />
                </div>
                <a
                  href="tel:+33615756549"
                  className="text-xl md:text-2xl text-gray-900 hover:text-teal-600 transition-colors"
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
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 font-sans text-lg text-gray-900 bg-white transition-all duration-200"
                  />
                </div>

                {/* Service demandé */}
                <div>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 font-sans text-lg bg-white transition-all duration-200 ${formData.service === '' ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    <option value="" disabled>Type de besoin *</option>
                    <option value="Diagnostic & Stratégie">Diagnostic & Stratégie</option>
                    <option value="Optimisation des Processus">Optimisation des Processus</option>
                    <option value="Accompagnement Long Terme">Accompagnement Long Terme</option>
                    <option value="Autre">Autre demande</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 font-sans text-lg text-gray-900 bg-white transition-all duration-200 resize-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 font-sans text-lg text-gray-900 bg-white transition-all duration-200"
                  />
                </div>

                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg">
                    ✓ Message envoyé avec succès !
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
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

import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

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
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/linky-banner.png)' }}
      >
        <div className="absolute inset-0" />
        <h1 className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold text-white font-dongle">
          Contactez-nous
        </h1>
      </section>

      {/* Contact Section */}
      <section className="flex-grow py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Informations de contact */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-dongle text-gray-900" style={{ lineHeight: '0.8' }}>
                Une question ?
                <br />
                Parlons-en !
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-12 font-meera text-gray-600 leading-relaxed">
                Envie de digitaliser vos processus ? Contactez-nous pour échanger sur vos besoins et découvrir nos solutions no-code.
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Mail size={32} className="text-gray-900" />
                </div>
                <a 
                  href="mailto:linky4u.contact@gmail.com" 
                  className="text-xl md:text-2xl font-lexend text-gray-900 hover:text-teal-600 transition-colors underline"
                >
                  linky4u.contact@gmail.com
                </a>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Phone size={32} className="text-gray-900" />
                </div>
                <a 
                  href="tel:+33615756549" 
                  className="text-xl md:text-2xl font-lexend text-gray-900 hover:text-teal-600 transition-colors"
                >
                  +33 6 15 75 65 49
                </a>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend text-lg"
                  />
                </div>

                {/* Service demandé */}
                <div>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend text-lg bg-white ${formData.service === '' ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    <option value="" disabled>Service demandé *</option>
                    <option value="Création d'outils no-code">Création d'outils no-code</option>
                    <option value="Automatisation">Automatisation</option>
                    <option value="Maintenance & Support">Maintenance & Support</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message *"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend text-lg resize-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend text-lg"
                  />
                </div>

                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-lexend">
                    ✓ Message envoyé avec succès !
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-lexend">
                    ✗ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                  </div>
                )}

                {/* Bouton Envoyer */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-900 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-lexend text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer'}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

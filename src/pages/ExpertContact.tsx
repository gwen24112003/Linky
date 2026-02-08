import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ArrowRight, UserCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SEO } from '../components/SEO';

export const ExpertContact: React.FC = () => {
    const [formData, setFormData] = useState({
        objet: '',
        expertise: '',
        message: '',
        email: '',
        nom: '',
        prenom: '',
        linkedin: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            emailjs.init('7nk-E4GjPBoHa_-Py');

            const serviceId = 'service_d1de6lx';
            const templateId = 'template_n3wiuwt'; // On utilise le même template pour l'instant, ou on en crée un nouveau si besoin

            const templateParams = {
                from_email: formData.email,
                to_name: 'Linky Recruitment',
                objet: `[Candidature Expert] ${formData.objet}`,
                service: `Expertise: ${formData.expertise}`, // Mapping 'service' field to 'expertise'
                message: `
          Nom: ${formData.nom}
          Prénom: ${formData.prenom}
          LinkedIn: ${formData.linkedin}
          
          Message:
          ${formData.message}
        `,
            };

            const response = await emailjs.send(serviceId, templateId, templateParams);

            console.log('Candidature envoyée avec succès:', response);
            setSubmitStatus('success');
            setFormData({ objet: '', expertise: '', message: '', email: '', nom: '', prenom: '', linkedin: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error: any) {
            console.error('Erreur:', error);
            setSubmitStatus('error');
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
                title="Rejoignez le réseau Linky - Candidature Expert"
                description="Vous êtes consultant ou expert en organisation ? Rejoignez notre réseau de partenaires qualifiés."
                url="https://linky4u.com/expert-contact"
            />
            <Header />

            {/* Hero Section */}
            <section
                className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/linky-banner.png)' }}
            >
                <div className="absolute inset-0" />
                <h1 className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold text-white font-dongle">
                    Rejoignez l'Excellence
                </h1>
            </section>

            {/* Contact Section */}
            <section className="flex-grow py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="text-center mb-10">
                            <UserCheck size={48} className="mx-auto text-teal-600 mb-4" />
                            <h2 className="text-3xl md:text-4xl font-bold font-dongle text-gray-900 leading-tight">
                                Candidature Réseau Experts
                            </h2>
                            <p className="text-lg font-meera text-gray-600 mt-2">
                                Partagez votre expertise et grandissons ensemble.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Nom & Prénom */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="nom"
                                    placeholder="Nom *"
                                    required
                                    value={formData.nom}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend"
                                />
                                <input
                                    type="text"
                                    name="prenom"
                                    placeholder="Prénom *"
                                    required
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend"
                                />
                            </div>

                            {/* Email & LinkedIn */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email professionnel *"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend"
                                />
                                <input
                                    type="url"
                                    name="linkedin"
                                    placeholder="Lien LinkedIn *"
                                    required
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend"
                                />
                            </div>

                            {/* Objet */}
                            <input
                                type="text"
                                name="objet"
                                placeholder="Objet de la candidature *"
                                required
                                value={formData.objet}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend"
                            />

                            {/* Expertise */}
                            <div className="space-y-4">
                                <label className="block text-lg font-bold text-gray-800 font-lexend">Votre domaine d'expertise principal *</label>
                                <select
                                    name="expertise"
                                    required
                                    value={formData.expertise}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend bg-white text-lg"
                                >
                                    <option value="" disabled>Sélectionnez une expertise...</option>
                                    <option value="Consulting en Organisation">Consulting en Organisation</option>
                                    <option value="Automatisation & No-Code">Automatisation & No-Code</option>
                                    <option value="Data & Analytics">Data & Analytics</option>
                                    <option value="Product Management">Product Management</option>
                                    <option value="Développement Spécifique">Développement Spécifique</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="space-y-4">
                                <label className="block text-lg font-bold text-gray-800 font-lexend">Pourquoi rejoindre le réseau Linky ? *</label>
                                <textarea
                                    name="message"
                                    placeholder="Décrivez votre parcours, vos motivations et comment vous souhaitez collaborer..."
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 font-lexend resize-none text-lg"
                                />
                            </div>

                            {/* Feedback messages */}
                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-lexend">
                                    ✓ Candidature envoyée ! Nous vous recontacterons sous 48h.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-lexend">
                                    ✗ Erreur lors de l'envoi. Contactez-nous sur Linkedin si le problème persiste.
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-900 hover:from-teal-700 hover:to-blue-950 text-white px-10 py-4 rounded-full font-lexend text-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{isSubmitting ? 'Envoi...' : 'Envoyer ma candidature'}</span>
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

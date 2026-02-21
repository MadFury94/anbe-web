"use client";

import React, { useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Replace with your EmailJS credentials
            const result = await emailjs.sendForm(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                formRef.current!,
                'YOUR_PUBLIC_KEY'
            );

            console.log('Email sent successfully:', result.text);
            setSubmitStatus('success');
            formRef.current?.reset();
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 bg-gradient-to-br from-dark-navy via-primary-blue to-dark-navy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
                    }}></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Get In Touch</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Contact <span className="text-primary-orange">ANBE</span></h1>
                        <div className="w-24 h-1 bg-white mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg font-medium">
                            Ready to discuss your project? Our team is here to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Contact Info */}
                        <motion.div
                            className="lg:w-1/3"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-10 text-dark-navy uppercase">Contact <span className="text-primary-orange">Details</span></h2>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-grey rounded-xl flex items-center justify-center text-primary-orange shadow-sm shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-navy uppercase text-xs tracking-widest mb-2">Email Address</h4>
                                        <p className="text-gray-500 font-medium">info@anbenigeria.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-grey rounded-xl flex items-center justify-center text-primary-orange shadow-sm shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-navy uppercase text-xs tracking-widest mb-2">Phone Number</h4>
                                        <p className="text-gray-500 font-medium">+234 XXX XXX XXXX</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-grey rounded-xl flex items-center justify-center text-primary-orange shadow-sm shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-navy uppercase text-xs tracking-widest mb-2">Office Location</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            Lagos, Nigeria
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-grey rounded-xl flex items-center justify-center text-primary-orange shadow-sm shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-navy uppercase text-xs tracking-widest mb-2">Business Hours</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            Mon - Fri: 8:00 AM - 5:00 PM<br />
                                            Sat: 9:00 AM - 2:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="lg:w-2/3"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-light-grey p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-3xl font-bold mb-8 text-dark-navy uppercase">Request a <span className="text-primary-orange">Quote</span></h2>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
                                        ✓ Message sent successfully! We'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">
                                        ✗ Failed to send message. Please try again or email us directly.
                                    </div>
                                )}

                                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="user_email"
                                            placeholder="john@example.com"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="user_phone"
                                            placeholder="+234 XXX XXX XXXX"
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Service Required</label>
                                        <select
                                            name="service"
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all outline-none"
                                        >
                                            <option>Engineering Design</option>
                                            <option>Project Management</option>
                                            <option>Installation & Commissioning</option>
                                            <option>Maintenance & Support</option>
                                            <option>Consulting Services</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Project Details</label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            placeholder="Tell us about your project requirements..."
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all outline-none resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-primary-orange text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-dark-navy transition-all shadow-lg flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;

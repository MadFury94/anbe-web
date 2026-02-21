"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Award, Users, Shield, TrendingUp } from 'lucide-react';
import { motion } from "framer-motion";
import Image from 'next/image';

const AboutPage = () => {
    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden bg-gradient-to-br from-dark-navy via-primary-blue to-dark-navy">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
                    }}></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Who We Are</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">About <span className="text-primary-orange">ANBE Nigeria</span></h1>
                        <div className="w-24 h-1 bg-primary-orange mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg">
                            Engineering excellence for the oil and gas sector since 2008.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-8 text-dark-navy uppercase leading-tight">Engineering <span className="text-primary-orange">Excellence</span></h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    ANBE Nigeria Limited is a leading engineering solutions provider specializing in the oil and gas sector. With over 15 years of experience, we deliver comprehensive engineering services that meet international standards.
                                </p>
                                <p>
                                    Our team of highly skilled engineers and technicians brings together expertise in design, project management, installation, and maintenance to deliver turnkey solutions for our clients.
                                </p>
                                <p>
                                    We are committed to safety, quality, and innovation in every project we undertake, ensuring that our clients receive the best possible service and value.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/industrial-1.jpg"
                                    alt="ANBE Engineering Projects"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CEO Section */}
            <section className="py-24 bg-gradient-to-br from-light-grey to-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/ceo.png"
                                    alt="CEO ANBE Nigeria"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="lg:w-2/3"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
                            <h2 className="text-4xl font-bold mb-6 text-dark-navy uppercase leading-tight">Message from Our <span className="text-primary-orange">CEO</span></h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    "At ANBE Nigeria, we are driven by a passion for excellence and a commitment to delivering innovative engineering solutions that power Nigeria's energy sector. Our success is built on the dedication of our talented team and the trust of our valued clients."
                                </p>
                                <p>
                                    "We continue to invest in cutting-edge technology, professional development, and safety protocols to ensure we remain at the forefront of the industry. Together, we are building a stronger, more sustainable future for Nigeria's oil and gas sector."
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="font-bold text-dark-navy text-xl">Chief Executive Officer</div>
                                <div className="text-primary-orange uppercase tracking-wider text-sm font-semibold">ANBE Nigeria Limited</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-light-grey">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            className="bg-white p-12 rounded-3xl shadow-lg border-t-4 border-primary-blue"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Eye size={64} className="mb-8 text-primary-blue" />
                            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight text-dark-navy">Our Vision</h3>
                            <p className="text-lg leading-relaxed text-gray-600">
                                To be the most trusted and innovative engineering solutions provider in the oil and gas sector across West Africa, setting industry standards for excellence and reliability.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-primary-orange p-12 rounded-3xl text-white shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Target size={64} className="mb-8 opacity-90" />
                            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-lg leading-relaxed opacity-95">
                                To deliver world-class engineering solutions that exceed client expectations through innovation, technical expertise, and unwavering commitment to safety and quality.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold mb-16 text-dark-navy uppercase text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: 'Safety First', desc: 'Uncompromising commitment to safety in all operations' },
                            { icon: Award, title: 'Quality Excellence', desc: 'Delivering superior quality in every project' },
                            { icon: Users, title: 'Client Focus', desc: 'Building lasting partnerships through exceptional service' },
                            { icon: TrendingUp, title: 'Innovation', desc: 'Embracing cutting-edge technology and solutions' },
                            { icon: Target, title: 'Integrity', desc: 'Operating with honesty and transparency' },
                            { icon: Eye, title: 'Accountability', desc: 'Taking responsibility for our commitments' }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                className="bg-light-grey p-8 rounded-xl hover:shadow-lg transition-all group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <value.icon className="text-primary-orange mb-4 group-hover:scale-110 transition-transform" size={40} />
                                <h4 className="font-bold text-dark-navy uppercase tracking-wider text-lg mb-2">{value.title}</h4>
                                <p className="text-gray-600 text-sm">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-gradient-to-r from-primary-blue to-dark-navy text-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 uppercase">Why Choose ANBE?</h2>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            We combine technical expertise, industry experience, and commitment to excellence to deliver outstanding results.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '15+', label: 'Years Experience' },
                            { number: '50+', label: 'Projects Completed' },
                            { number: '100+', label: 'Satisfied Clients' },
                            { number: '200+', label: 'Team Members' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="text-5xl font-bold text-primary-orange mb-2">{stat.number}</div>
                                <div className="text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default AboutPage;

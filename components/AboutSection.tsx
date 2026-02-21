"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const AboutSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">About ANBE</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-6 leading-tight">
                            ENGINEERING EXCELLENCE FOR THE <span className="text-primary-orange">OIL & GAS</span> SECTOR
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            ANBE Nigeria Limited is a leading engineering solutions provider dedicated to delivering world-class services to Nigeria's oil and gas industry. With over 15 years of experience, we combine technical expertise with innovative approaches to meet the evolving needs of the energy sector.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Our commitment to safety, quality, and excellence has made us a trusted partner for major operators and service companies across Nigeria. We pride ourselves on delivering projects on time, within budget, and to the highest international standards.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-primary-orange/10 rounded-lg flex items-center justify-center shrink-0">
                                    <Target className="text-primary-orange" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-navy mb-1">Our Mission</h4>
                                    <p className="text-sm text-gray-600">Delivering innovative engineering solutions</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-secondary-teal/10 rounded-lg flex items-center justify-center shrink-0">
                                    <Award className="text-secondary-teal" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-navy mb-1">Our Vision</h4>
                                    <p className="text-sm text-gray-600">Leading engineering excellence in Africa</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/about">
                            <button className="bg-primary-blue text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-primary-orange transition-all shadow-md">
                                Learn More About Us
                            </button>
                        </Link>
                    </motion.div>

                    {/* Right - Stats & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="bg-gradient-to-br from-primary-blue to-dark-navy p-8 rounded-2xl text-white flex flex-col justify-center">
                            <Users size={40} className="mb-4 opacity-80" />
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <p className="text-sm opacity-90">Expert Engineers</p>
                        </div>
                        <div className="bg-gradient-to-br from-primary-orange to-accent-gold p-8 rounded-2xl text-white flex flex-col justify-center">
                            <TrendingUp size={40} className="mb-4 opacity-80" />
                            <div className="text-4xl font-bold mb-2">200+</div>
                            <p className="text-sm opacity-90">Projects Delivered</p>
                        </div>
                        <div className="bg-gradient-to-br from-secondary-teal to-primary-blue p-8 rounded-2xl text-white flex flex-col justify-center">
                            <Award size={40} className="mb-4 opacity-80" />
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <p className="text-sm opacity-90">Years Experience</p>
                        </div>
                        <div className="bg-light-grey p-8 rounded-2xl border-2 border-primary-orange/20 flex flex-col justify-center">
                            <div className="text-primary-orange text-4xl font-bold mb-2">98%</div>
                            <p className="text-sm text-dark-navy font-semibold">Client Satisfaction Rate</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-1.jpg"
                    alt="ANBE Nigeria Engineering"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/95 via-primary-blue/90 to-dark-navy/95"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Engineering Excellence
                        </motion.span>

                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            POWERING THE
                            <span className="text-primary-orange block mt-2">OIL & GAS</span>
                            SECTOR
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Delivering world-class engineering solutions and technical expertise to Nigeria's energy industry.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link href="/services">
                                <button className="bg-primary-orange text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-accent-gold transition-all shadow-lg flex items-center gap-2 group">
                                    Our Services
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-white hover:text-dark-navy transition-all">
                                    Contact Us
                                </button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div>
                                <div className="text-3xl font-bold text-primary-orange mb-1">15+</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-orange mb-1">200+</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Projects Completed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-orange mb-1">98%</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Client Satisfaction</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Feature Cards */}
                    <motion.div
                        className="hidden lg:grid grid-cols-2 gap-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                            whileHover={{ y: -5 }}
                        >
                            <Shield className="text-primary-orange mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Safety First</h3>
                            <p className="text-gray-300 text-sm">Uncompromising commitment to safety standards and protocols.</p>
                        </motion.div>

                        <motion.div
                            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all mt-12"
                            whileHover={{ y: -5 }}
                        >
                            <Award className="text-primary-orange mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Certified Excellence</h3>
                            <p className="text-gray-300 text-sm">ISO certified and industry-recognized quality standards.</p>
                        </motion.div>

                        <motion.div
                            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all -mt-6"
                            whileHover={{ y: -5 }}
                        >
                            <Users className="text-primary-orange mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Expert Team</h3>
                            <p className="text-gray-300 text-sm">Highly skilled engineers and technical professionals.</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-primary-orange to-accent-gold p-8 rounded-2xl shadow-xl"
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <h3 className="text-lg font-bold text-white mb-2">Support</h3>
                            <p className="text-white/90 text-sm">Round-the-clock technical support and emergency response.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

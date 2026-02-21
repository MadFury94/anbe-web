"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ClipboardCheck, HardHat, Settings, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const ServicesSection = () => {
    const services = [
        {
            icon: Wrench,
            title: "Engineering Design",
            description: "Comprehensive engineering design services for oil & gas facilities, pipelines, and infrastructure.",
            color: "primary-blue"
        },
        {
            icon: ClipboardCheck,
            title: "Project Management",
            description: "End-to-end project management ensuring timely delivery and quality control.",
            color: "primary-orange"
        },
        {
            icon: HardHat,
            title: "Construction Support",
            description: "On-site construction supervision and technical support for complex projects.",
            color: "secondary-teal"
        },
        {
            icon: Settings,
            title: "Maintenance Services",
            description: "Preventive and corrective maintenance for optimal equipment performance.",
            color: "accent-gold"
        },
        {
            icon: Shield,
            title: "Safety & Compliance",
            description: "HSE audits, risk assessments, and regulatory compliance services.",
            color: "primary-blue"
        },
        {
            icon: Zap,
            title: "Technical Consulting",
            description: "Expert technical consulting and feasibility studies for energy projects.",
            color: "primary-orange"
        }
    ];

    return (
        <section className="py-24 bg-light-grey">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-dark-navy mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        OUR <span className="text-primary-orange">SERVICES</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Comprehensive engineering solutions tailored to meet the unique challenges of the oil and gas industry.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group cursor-pointer border-b-4 border-transparent hover:border-primary-orange"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`w-16 h-16 bg-${service.color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon className={`text-${service.color}`} size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-dark-navy mb-3 group-hover:text-primary-orange transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <Link href="/services" className="text-primary-orange font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                Learn More →
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/services">
                        <button className="bg-primary-orange text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-dark-navy transition-all shadow-md">
                            View All Services
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;

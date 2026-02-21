"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import { Wrench, Cog, Zap, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";

const ServicesPage = () => {
    const services = [
        {
            icon: Wrench,
            title: "Engineering Design",
            description: "Comprehensive engineering design services for oil and gas facilities, pipelines, and processing plants.",
            features: ["Process Design", "Mechanical Design", "Structural Engineering", "Piping Design"]
        },
        {
            icon: Cog,
            title: "Project Management",
            description: "End-to-end project management ensuring timely delivery and cost-effective solutions.",
            features: ["Planning & Scheduling", "Cost Control", "Quality Assurance", "Risk Management"]
        },
        {
            icon: Zap,
            title: "Installation & Commissioning",
            description: "Professional installation and commissioning services for oil and gas equipment and systems.",
            features: ["Equipment Installation", "System Integration", "Performance Testing", "Startup Support"]
        },
        {
            icon: Shield,
            title: "Maintenance & Support",
            description: "Comprehensive maintenance programs to ensure optimal performance and longevity of assets.",
            features: ["Preventive Maintenance", "Emergency Response", "Technical Support", "Spare Parts Supply"]
        },
        {
            icon: TrendingUp,
            title: "Consulting Services",
            description: "Expert consulting for optimization, compliance, and strategic planning in the oil and gas sector.",
            features: ["Technical Audits", "Feasibility Studies", "Regulatory Compliance", "Process Optimization"]
        },
        {
            icon: Users,
            title: "Training & Development",
            description: "Professional training programs to enhance technical capabilities and safety awareness.",
            features: ["Technical Training", "Safety Programs", "Certification Courses", "Skill Development"]
        }
    ];

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

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Services</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Engineering <span className="text-primary-orange">Excellence</span></h1>
                        <div className="w-24 h-1 bg-primary-orange mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg">
                            Comprehensive engineering solutions tailored for the oil and gas industry.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-light-grey p-8 rounded-2xl border-t-4 border-primary-orange hover:shadow-xl transition-all group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-primary-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-orange transition-colors">
                                    <service.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-dark-navy uppercase">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <CheckCircle size={16} className="text-primary-orange shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Showcase */}
            <section className="py-24 bg-light-grey">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-dark-navy uppercase mb-4">Our Work in Action</h2>
                        <p className="text-gray-600 text-lg">See our engineering services delivered across various projects</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { img: "/industrial-10.jpg", title: "Pipeline Engineering" },
                            { img: "/industrial-11.jpg", title: "Offshore Operations" },
                            { img: "/industrial-12.jpg", title: "Process Engineering" },
                            { img: "/industrial-1.jpg", title: "Installation Services" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="relative aspect-[16/10] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl font-bold text-white uppercase">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary-blue to-dark-navy text-white">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 uppercase">Ready to Start Your Project?</h2>
                        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                            Contact us today to discuss how we can help you achieve your engineering goals.
                        </p>
                        <a href="/contact">
                            <button className="bg-primary-orange text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent-gold transition-all shadow-lg">
                                Get a Quote
                            </button>
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ServicesPage;

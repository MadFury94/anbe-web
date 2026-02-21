"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import { Building2, Droplet, Zap, Factory } from 'lucide-react';
import { motion } from "framer-motion";

const ProjectsPage = () => {
    const projects = [
        {
            icon: Droplet,
            title: "Offshore Platform Installation",
            category: "Oil & Gas Infrastructure",
            description: "Complete installation and commissioning of offshore production platform including subsea systems and topside facilities.",
            year: "2024",
            status: "Completed"
        },
        {
            icon: Factory,
            title: "Gas Processing Plant",
            category: "Process Engineering",
            description: "Design and construction of natural gas processing facility with capacity of 100 MMSCFD.",
            year: "2023",
            status: "Completed"
        },
        {
            icon: Building2,
            title: "Pipeline Infrastructure",
            category: "Pipeline Engineering",
            description: "Engineering and installation of 50km crude oil pipeline with associated pump stations.",
            year: "2024",
            status: "Ongoing"
        },
        {
            icon: Zap,
            title: "Power Generation Facility",
            category: "Energy Solutions",
            description: "Installation of gas-fired power generation plant for oil field operations.",
            year: "2023",
            status: "Completed"
        },
        {
            icon: Droplet,
            title: "Water Treatment System",
            category: "Environmental Engineering",
            description: "Design and implementation of produced water treatment facility for offshore operations.",
            year: "2024",
            status: "Ongoing"
        },
        {
            icon: Factory,
            title: "Refinery Upgrade",
            category: "Process Optimization",
            description: "Modernization and capacity expansion of existing refinery processing units.",
            year: "2023",
            status: "Completed"
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
                        <span className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Work</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Featured <span className="text-primary-orange">Projects</span></h1>
                        <div className="w-24 h-1 bg-primary-orange mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg">
                            Delivering excellence across diverse engineering projects in the oil and gas sector.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-gradient-to-br from-primary-blue to-dark-navy p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/20 rounded-full -mr-16 -mt-16"></div>
                                    <project.icon className="text-white relative z-10" size={48} />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-primary-orange uppercase tracking-wider">{project.category}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-dark-navy">{project.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 font-semibold">Year: {project.year}</span>
                                        <button className="text-primary-orange text-xs font-bold uppercase tracking-wider hover:text-dark-navy transition-colors">
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-light-grey">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "50+", label: "Projects Completed" },
                            { number: "15+", label: "Years Experience" },
                            { number: "100+", label: "Satisfied Clients" },
                            { number: "200+", label: "Team Members" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-5xl font-bold text-primary-blue mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 uppercase tracking-wider font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-dark-navy uppercase mb-4">Project Gallery</h2>
                        <p className="text-gray-600 text-lg">Visual showcase of our engineering excellence</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            "/industrial-1.jpg",
                            "/industrial-2.jpg",
                            "/industrial-3.jpg",
                            "/industrial-4.jpg",
                            "/industrial-5.jpg",
                            "/industrial-6.jpg",
                            "/industrial-7.jpg",
                            "/industrial-8.jpg",
                            "/industrial-9.jpg",
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <Image
                                    src={img}
                                    alt={`Project ${i + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ProjectsPage;

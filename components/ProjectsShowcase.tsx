"use client";

import { motion } from 'framer-motion';
import { Building2, Droplet, Factory, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectsShowcase = () => {
    const projects = [
        {
            title: "Offshore Platform Installation",
            category: "Oil & Gas Infrastructure",
            image: "/group2.jpg",
            icon: Droplet
        },
        {
            title: "Gas Processing Plant",
            category: "Process Engineering",
            image: "/group.jpg",
            icon: Factory
        },
        {
            title: "Pipeline Infrastructure",
            category: "Pipeline Engineering",
            image: "/single.jpg",
            icon: Building2
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        className="text-primary-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Our Work
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-dark-navy mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        FEATURED <span className="text-primary-orange">PROJECTS</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Delivering excellence across diverse engineering projects in Nigeria's energy sector.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/50 to-transparent opacity-80"></div>
                                <div className="absolute top-4 right-4 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                                    <project.icon className="text-white" size={24} />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="text-xs uppercase tracking-wider text-primary-orange mb-2 font-bold">
                                        {project.category}
                                    </div>
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                </div>
                            </div>
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
                    <Link href="/projects">
                        <button className="bg-transparent border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-primary-blue hover:text-white transition-all flex items-center gap-2 mx-auto group">
                            View All Projects
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;

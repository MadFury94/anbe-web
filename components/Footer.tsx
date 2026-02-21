"use client";

import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-dark-navy text-white font-poppins">
            <div className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary-orange rounded flex items-center justify-center text-white font-bold text-2xl">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl leading-none tracking-tight">ANBE NIGERIA</span>
                                <span className="text-[10px] text-primary-orange font-bold tracking-[0.2em] uppercase">Limited</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Engineering Excellence for the oil and gas sector. Delivering world-class solutions across Nigeria.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary-orange hover:border-primary-orange transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Services', 'Projects', 'Careers', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-primary-orange transition-colors text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Our Services</h3>
                        <ul className="space-y-3">
                            {['Engineering Design', 'Project Management', 'Technical Consulting', 'Maintenance Services', 'Safety Audits'].map((service) => (
                                <li key={service}>
                                    <Link href="/services" className="text-gray-400 hover:text-primary-orange transition-colors text-sm">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-orange mt-1 shrink-0" />
                                <span className="text-gray-400 text-sm">Lagos, Nigeria</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-primary-orange mt-1 shrink-0" />
                                <span className="text-gray-400 text-sm">+234 XXX XXX XXXX</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-primary-orange mt-1 shrink-0" />
                                <span className="text-gray-400 text-sm">info@anbenigeria.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ANBE Nigeria Limited. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-primary-orange transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-primary-orange transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

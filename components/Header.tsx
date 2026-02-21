"use client";

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="w-full font-poppins sticky top-0 z-50 shadow-sm">
            {/* Top Bar */}
            <div className="bg-dark-navy text-white py-2">
                <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center text-xs md:text-sm">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <Mail size={14} className="text-primary-orange" />
                            <span>info@anbenigeria.com</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                            <Phone size={14} className="text-primary-orange" />
                            <span>+234 XXX XXX XXXX</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1">
                        <MapPin size={14} className="text-primary-orange" />
                        <span>Lagos, Nigeria</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/anbe-logo.png"
                            alt="ANBE Nigeria Limited"
                            width={180}
                            height={60}
                            className="h-12 w-auto"
                        />
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-dark-navy uppercase h-full">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`transition-all duration-300 py-4 h-full flex items-center border-b-2 ${isActive
                                        ? 'text-primary-orange border-primary-orange'
                                        : 'text-dark-navy border-transparent hover:text-primary-orange'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center gap-2 ml-4">
                            <Link href="/contact">
                                <button className="bg-primary-orange text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-dark-navy transition-all shadow-md">
                                    GET A QUOTE
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-dark-navy mb-1 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-dark-navy mb-1 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-dark-navy transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block py-3 text-xs uppercase font-semibold tracking-widest transition-colors ${isActive
                                            ? 'text-primary-orange'
                                            : 'text-dark-navy hover:text-primary-orange'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="pt-3 border-t border-gray-200">
                                <Link href="/contact">
                                    <button className="w-full bg-primary-orange text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-dark-navy transition-all">
                                        Get a Quote
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;

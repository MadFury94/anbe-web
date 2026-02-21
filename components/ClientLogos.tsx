"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
    { name: 'Heirs Energies', logo: '/client-heirs.png' },
    { name: 'Oando', logo: '/client-oando.png' },
    { name: 'Total', logo: '/client-total.png' },
];

const ClientLogos = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-dark-navy uppercase mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-gray-600 text-lg">Partnering with Nigeria's top energy companies</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {clients.map((client, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center justify-center p-8 bg-light-grey rounded-xl hover:shadow-lg transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="relative w-full h-24 grayscale group-hover:grayscale-0 transition-all duration-300">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;

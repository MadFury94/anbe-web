import React from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { heroSlides } from '@/src/data/content';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
    const swiperRef = React.useRef<SwiperRef>(null);

    return (
        <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
            <style>{`
                @keyframes blinkArrow { 0% { transform: translateX(-10px); opacity: 0.8; } 50% { transform: translateX(10px); opacity: 1; } 100% { transform: translateX(-10px); opacity: 0.8; } }
                .arrow-blink { animation: blinkArrow 2s ease-in-out infinite; }
            `}</style>
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade" speed={1000}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true} navigation={false} pagination={false}
                className="h-full w-full"
            >
                {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative h-full w-full">
                        {({ isActive }: { isActive: boolean }) => (
                            <>
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <motion.div key={isActive ? `bg-${slide.id}` : `bg-i-${slide.id}`} initial={{ scale: 1.1 }} animate={isActive ? { scale: 1 } : { scale: 1.1 }} transition={{ duration: 7, ease: "easeOut" }} className="h-full w-full">
                                        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/90 via-primary-blue/80 to-dark-navy/90" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="relative z-10 flex h-full items-center">
                                    <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center">
                                        <div className="max-w-3xl w-full">
                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.p key={`sub-${slide.id}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, delay: 0.2 }}
                                                        className="text-xs md:text-sm font-semibold tracking-[3px] uppercase mb-4 text-primary-orange">
                                                        {slide.subtitle}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                            <div className="overflow-hidden mb-6">
                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.h1 key={`title-${slide.id}`} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                                                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase whitespace-pre-line text-white">
                                                            {slide.title}
                                                        </motion.h1>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.p key={`desc-${slide.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, delay: 0.8 }}
                                                        className="text-base md:text-lg leading-relaxed mb-10 text-white/90 max-w-2xl">
                                                        {slide.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.div key={`btn-${slide.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, delay: 1.2 }}>
                                                        <Link to={slide.buttonLink} className="inline-block bg-primary-orange border-2 border-primary-orange text-white px-10 py-4 rounded-full text-xs md:text-sm font-bold hover:bg-transparent hover:border-white transition-all duration-300 uppercase tracking-[2px] shadow-lg">
                                                            {slide.buttonText}
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {isActive && (
                                    <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.6, delay: 1.4 }}
                                        onClick={() => swiperRef.current?.swiper?.slideNext()}
                                        className="arrow-blink absolute bottom-16 right-12 z-20 text-white hover:text-primary-orange transition-colors" aria-label="Next slide">
                                        <ArrowRight size={48} strokeWidth={1} />
                                    </motion.button>
                                )}

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                                    {heroSlides.map((_, idx) => (
                                        <button key={idx} onClick={() => swiperRef.current?.swiper?.slideTo(idx)}
                                            className={`transition-all duration-300 rounded-full ${slide.id === heroSlides[idx].id ? 'bg-primary-orange w-3 h-3' : 'bg-white/50 w-2 h-2 hover:bg-white/70'}`}
                                            aria-label={`Go to slide ${idx + 1}`} />
                                    ))}
                                </div>
                            </>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;

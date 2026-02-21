"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Shield, Award, Wrench } from "lucide-react";

interface GalleryCard {
    subtitle: string;
    name: string;
    description: string;
    bgColor: string;
    icon: React.ElementType;
}

interface SlideData {
    images: string[];
    topCard: GalleryCard;
    bottomCard: GalleryCard;
}

const slides: SlideData[] = [
    {
        images: [
            "/industrial-1.jpg",
            "/industrial-2.jpg",
            "/industrial-3.jpg",
            "/industrial-4.jpg",
            "/industrial-5.jpg",
            "/industrial-6.jpg",
            "/industrial-7.jpg",
            "/industrial-8.jpg",
            "/industrial-9.jpg",
        ],
        topCard: {
            subtitle: "EXPERTISE",
            name: "Engineering Excellence",
            description: "Delivering world-class engineering solutions with precision and innovation for the oil and gas sector.",
            bgColor: "bg-primary-blue/90",
            icon: Award,
        },
        bottomCard: {
            subtitle: "COMMITMENT",
            name: "Safety First",
            description: "Uncompromising dedication to safety standards and protocols in every project we undertake.",
            bgColor: "bg-primary-orange/90",
            icon: Shield,
        },
    },
    {
        images: [
            "/industrial-10.jpg",
            "/industrial-11.jpg",
            "/industrial-12.jpg",
            "/industrial-1.jpg",
            "/industrial-2.jpg",
            "/industrial-3.jpg",
            "/industrial-4.jpg",
            "/industrial-5.jpg",
            "/industrial-6.jpg",
        ],
        topCard: {
            subtitle: "SERVICES",
            name: "Comprehensive Solutions",
            description: "From design to installation and maintenance, we provide end-to-end engineering services.",
            bgColor: "bg-secondary-teal/90",
            icon: Wrench,
        },
        bottomCard: {
            subtitle: "QUALITY",
            name: "ISO Certified",
            description: "Meeting international quality standards with certified processes and experienced professionals.",
            bgColor: "bg-dark-navy/90",
            icon: Award,
        },
    },
];

const InfoTile = ({ card }: { card: GalleryCard }) => {
    const Icon = card.icon;
    return (
        <div className={`${card.bgColor} text-white p-6 md:p-8 flex flex-col justify-center h-full relative overflow-hidden backdrop-blur-sm`}>
            <Icon className="mb-4 opacity-90" size={40} />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase opacity-90 mb-2 block">
                {card.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight uppercase">{card.name}</h3>
            <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
        </div>
    );
};

const ImgTile = ({ src, alt }: { src: string; alt: string }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    return (
        <div className="relative w-full h-full overflow-hidden group">
            <Image
                src={imgSrc}
                alt={alt}
                fill
                onError={() => setImgSrc('/file.svg')}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
            />
        </div>
    );
};

const DRAG_THRESHOLD = 50;

const IndustrialGallery = () => {
    const [current, setCurrent] = useState(0);
    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const [dragDelta, setDragDelta] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const containerWidth = useRef(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToIndex = (index: number) => {
        const clamped = (index + slides.length) % slides.length;
        setCurrent(clamped);
        setIsTransitioning(true);
    };

    useEffect(() => {
        const el = containerRef.current;
        const measure = () => {
            if (el) containerWidth.current = el.clientWidth;
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragStartX.current = e.clientX;
        isDragging.current = true;
        setIsTransitioning(false);
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const delta = e.clientX - dragStartX.current;
        setDragDelta(delta);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        (e.target as Element).releasePointerCapture?.(e.pointerId);
        const delta = e.clientX - dragStartX.current;
        if (delta < -DRAG_THRESHOLD) goToIndex(current + 1);
        else if (delta > DRAG_THRESHOLD) goToIndex(current - 1);
        setIsTransitioning(true);
        setDragDelta(0);
    };

    const trackWidthStyle: React.CSSProperties = { width: `${slides.length * 100}%` };
    const childWidthPercent = 100 / slides.length;
    const translate = containerWidth.current ? -current * containerWidth.current + dragDelta : 0;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const transitionDuration = isMobile ? '1200ms' : '600ms';
    const trackTransform = {
        transform: `translateX(${translate}px)`,
        transition: isTransitioning ? `transform ${transitionDuration} cubic-bezier(.22,.9,.3,1)` : "none"
    } as React.CSSProperties;

    return (
        <section
            className="w-full overflow-hidden bg-light-grey cursor-grab active:cursor-grabbing select-none py-16"
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={() => { isDragging.current = false; setDragDelta(0); }}
        >
            <div className="max-w-[1200px] mx-auto px-6 mb-12">
                <h2 className="text-4xl font-bold text-dark-navy uppercase mb-4">Our Work in Action</h2>
                <p className="text-gray-600 text-lg">Explore our projects and engineering excellence</p>
            </div>

            <div className="relative w-full">
                <div className="relative" style={{ overflow: 'hidden' }}>
                    <div style={{ ...trackWidthStyle, display: 'flex', willChange: 'transform', ...trackTransform }} onTransitionEnd={() => setIsTransitioning(false)}>
                        {slides.map((s, idx) => (
                            <div key={idx} style={{ width: `${childWidthPercent}%`, flexShrink: 0 }}>
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[0]} alt={`Project ${idx}-1`} />
                                    </div>
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[1]} alt={`Project ${idx}-2`} />
                                    </div>
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[2]} alt={`Project ${idx}-3`} />
                                    </div>
                                    <div className="h-full md:col-span-2 flex flex-col md:flex-row col-span-1" style={{ gap: 0 }}>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                            <ImgTile src={s.images[3]} alt={`Project ${idx}-4`} />
                                        </div>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                            <InfoTile card={s.topCard} />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                    <div className="h-full md:col-span-2 flex flex-col-reverse md:flex-row col-span-1" style={{ gap: 0 }}>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                            <InfoTile card={s.bottomCard} />
                                        </div>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                            <ImgTile src={s.images[5]} alt={`Project ${idx}-6`} />
                                        </div>
                                    </div>
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[6]} alt={`Project ${idx}-7`} />
                                    </div>
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[7]} alt={`Project ${idx}-8`} />
                                    </div>
                                    <div className="hidden md:block h-full">
                                        <ImgTile src={s.images[8]} alt={`Project ${idx}-9`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToIndex(i)}
                        className={`transition-all duration-300 rounded-full ${i === current ? 'bg-primary-orange w-3 h-3' : 'bg-gray-400 w-2 h-2 hover:bg-gray-600'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default IndustrialGallery;

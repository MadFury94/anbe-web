import React, { useState, useRef, useEffect } from "react";
import { Shield, Award, Wrench } from "lucide-react";
import { gallerySlides } from "@/src/data/content";

// Map bgColor strings to icon components (icons stay in component, not content)
const iconMap: Record<string, React.ElementType> = {
    "bg-primary-blue/90": Award,
    "bg-primary-orange/90": Shield,
    "bg-secondary-teal/90": Wrench,
    "bg-dark-navy/90": Award,
};

const InfoTile = ({ card }: { card: typeof gallerySlides[0]["topCard"] }) => {
    const Icon = iconMap[card.bgColor] ?? Award;
    return (
        <div className={`${card.bgColor} text-white p-6 md:p-8 flex flex-col justify-center h-full relative overflow-hidden backdrop-blur-sm`}>
            <Icon className="mb-4 opacity-90" size={40} />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase opacity-90 mb-2 block">{card.subtitle}</span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight uppercase">{card.name}</h3>
            <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
        </div>
    );
};

const ImgTile = ({ src, alt }: { src: string; alt: string }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    return (
        <div className="relative w-full h-full overflow-hidden group">
            <img src={imgSrc} alt={alt} onError={() => setImgSrc('/file.svg')} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
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

    const goToIndex = (index: number) => { setCurrent((index + gallerySlides.length) % gallerySlides.length); setIsTransitioning(true); };

    useEffect(() => {
        const el = containerRef.current;
        const measure = () => { if (el) containerWidth.current = el.clientWidth; };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => { dragStartX.current = e.clientX; isDragging.current = true; setIsTransitioning(false); (e.target as Element).setPointerCapture(e.pointerId); };
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (!isDragging.current) return; setDragDelta(e.clientX - dragStartX.current); };
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        (e.target as Element).releasePointerCapture?.(e.pointerId);
        const delta = e.clientX - dragStartX.current;
        if (delta < -DRAG_THRESHOLD) goToIndex(current + 1);
        else if (delta > DRAG_THRESHOLD) goToIndex(current - 1);
        setIsTransitioning(true); setDragDelta(0);
    };

    const translate = containerWidth.current ? -current * containerWidth.current + dragDelta : 0;
    const trackTransform = { transform: `translateX(${translate}px)`, transition: isTransitioning ? `transform 600ms cubic-bezier(.22,.9,.3,1)` : "none" } as React.CSSProperties;

    return (
        <section className="w-full overflow-hidden bg-light-grey cursor-grab active:cursor-grabbing select-none py-16"
            ref={containerRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp} onPointerLeave={() => { isDragging.current = false; setDragDelta(0); }}>
            <div className="max-w-[1200px] mx-auto px-6 mb-12">
                <h2 className="text-4xl font-bold text-dark-navy uppercase mb-4">Our Work in Action</h2>
                <p className="text-gray-600 text-lg">Explore our projects and engineering excellence</p>
            </div>
            <div className="relative w-full">
                <div style={{ overflow: "hidden" }}>
                    <div style={{ width: `${gallerySlides.length * 100}%`, display: "flex", willChange: "transform", ...trackTransform }} onTransitionEnd={() => setIsTransitioning(false)}>
                        {gallerySlides.map((s, idx) => (
                            <div key={idx} style={{ width: `${100 / gallerySlides.length}%`, flexShrink: 0 }}>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                    {[0, 1, 2].map(n => <div key={n} className="hidden md:block h-full"><ImgTile src={s.images[n]} alt={`Project ${idx}-${n}`} /></div>)}
                                    <div className="h-full md:col-span-2 flex flex-col md:flex-row col-span-1" style={{ gap: 0 }}>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full"><ImgTile src={s.images[3]} alt={`Project ${idx}-3`} /></div>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full"><InfoTile card={s.topCard} /></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                    <div className="h-full md:col-span-2 flex flex-col-reverse md:flex-row col-span-1" style={{ gap: 0 }}>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full"><InfoTile card={s.bottomCard} /></div>
                                        <div className="w-full h-1/2 md:w-1/2 md:h-full"><ImgTile src={s.images[5]} alt={`Project ${idx}-5`} /></div>
                                    </div>
                                    {[6, 7, 8].map(n => <div key={n} className="hidden md:block h-full"><ImgTile src={s.images[n]} alt={`Project ${idx}-${n}`} /></div>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
                {gallerySlides.map((_, i) => (
                    <button key={i} onClick={() => goToIndex(i)}
                        className={`transition-all duration-300 rounded-full ${i === current ? 'bg-primary-orange w-3 h-3' : 'bg-gray-400 w-2 h-2 hover:bg-gray-600'}`}
                        aria-label={`Go to slide ${i + 1}`} />
                ))}
            </div>
        </section>
    );
};

export default IndustrialGallery;

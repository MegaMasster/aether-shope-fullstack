import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { useCallback } from "react";

import { getProductsOptions } from "@/entities/product";

export const PromoCarousel = () => {
    const { data, isLoading } = useQuery({ ...getProductsOptions() });
    const promoItems = data?.products || [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (isLoading) return (
        <div className="relative w-[65%] h-[400px] mt-10 bg-zinc-300/60 rounded-3xl overflow-hidden border border-zinc-200/50">
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1)'
            }} />
            <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
        </div>
    );

    return (
        <section className="relative w-[65%] mt-10 group">
            <div className="overflow-hidden rounded-3xl border border-white/20 shadow-xl" ref={emblaRef}>
                <div className="flex">
                    {promoItems.map((product, index) => (
                        <div key={product.id || index} className="flex-[0_0_100%] min-w-0 h-[400px] relative bg-gradient-to-br from-white/30 via-zinc-700/15 to-black/5 ">
                            <div className="flex h-full items-center justify-between px-16">
                                <div className="max-w-[50%]">
                                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">{product.title}</h2>
                                    <p className="text-zinc-600 mb-6 line-clamp-2">{product.description}</p>
                                    <button className="px-8 py-3 bg-zinc-900 text-white rounded-full hover:bg-black transition-colors">
                                        Buy now
                                    </button>
                                </div>
                                <img 
                                    src={product.thumbnail} 
                                    alt={product.title}
                                    className="h-64 object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 
                backdrop-blur-md border border-zinc-200 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:cursor-pointer"
            >
                <ChevronLeft size={20} className="text-zinc-700" />
            </button>

            <button 
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border
                 border-zinc-200 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:cursor-pointer"
            >
                <ChevronRight size={20} className="text-zinc-700" />
            </button>
        </section>
    );
}
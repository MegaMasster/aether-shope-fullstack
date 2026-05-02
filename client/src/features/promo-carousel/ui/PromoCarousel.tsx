import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { useCallback } from "react";

import { getProductsOptions } from "@/entities/product";
import { ErrorPromoSlide } from "@/shared/ui";
import { PromoSlides } from "@/shared/ui/Promo/PromoSlides";

export const PromoCarousel = () => {
    const { data, isLoading, isError } = useQuery({ ...getProductsOptions() });
    const promoItems = data?.products || [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (isLoading) return (
        <div className="relative w-[65%] h-[400px] mt-10 bg-zinc-400/20 rounded-3xl overflow-hidden border border-zinc-200/30">
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
            {!isError ? (
                <>
                    <div className="overflow-hidden rounded-3xl border border-white/20 shadow-xl" ref={emblaRef}>
                        <div className="flex">
                            {promoItems.map((product, index) => (
                                <PromoSlides key={product.id || index} product={product} />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <ErrorPromoSlide />
                </>
            )}

            {!isError && (
                <>
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
                </>
            )}
        </section>
    )
}
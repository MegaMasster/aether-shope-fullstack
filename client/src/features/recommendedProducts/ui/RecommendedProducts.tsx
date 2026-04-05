import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"
import { useEffect } from "react";
import { Star } from 'lucide-react';

import { getRecommendedProductsInfiniteOptions } from "@/entities/product";

import { type Product } from "@/entities/product/model/types";

export const RecommendProducts = () => {

    const {ref , inView} = useInView({
        rootMargin: '70px',
    })

    const { 
        data , 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage,
        isPending,  
    } = useInfiniteQuery({
        ...getRecommendedProductsInfiniteOptions()
    })

    useEffect(() => {
         if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    } , [inView, hasNextPage, isFetchingNextPage, fetchNextPage])


    if (isPending) {
        return (
            <section className="w-[65%] mt-15 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(15)].map((_, i) => (
                        <div 
                            key={i}
                            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 h-64
                            overflow-hidden isolate"
                        >
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/10 via-transparent to-black/10 animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                            </div>
                            
                            <div className="space-y-3 relative">
                                <div className="w-full h-32 rounded-xl bg-gradient-to-r from-zinc-400/20 to-zinc-600/20 animate-pulse" />
                                <div className="h-4 bg-zinc-400/20 rounded-full w-3/4 animate-pulse" />
                                <div className="h-4 bg-zinc-400/20 rounded-full w-1/2 animate-pulse" />
                                <div className="h-3 bg-zinc-400/10 rounded-full w-1/4 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-[65%] mt-15 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data?.pages.flatMap(page => page.products).map((product: Product) => (
                    <article 
                        key={product.id} 
                        className="group relative flex flex-col
                        bg-gradient-to-br from-white/30 via-zinc-400/15 to-black/5 
                        backdrop-blur-2xl 
                        border border-white/20 rounded-2xl
                        text-zinc-600
                        shadow-[0_15px_40px_-12px_rgba(71,85,105,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                        transition-all duration-500
                        hover:bg-white/40 hover:border-white/40 hover:shadow-[0_20px_50px_-10px_rgba(71,85,105,0.3)]
                        p-4 pb-6 overflow-hidden hover:cursor-pointer"
                    >
                        <div className="relative w-full h-32 mb-3 rounded-xl overflow-hidden
                            bg-gradient-to-br from-white/20 via-zinc-400/10 to-black/5"
                        >
                            <img 
                                src={product.thumbnail} 
                                alt={product.title}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                        </div>

                        <div className="flex flex-col gap-1 px-1">
                            <h3 className="font-light text-sm tracking-[0.1em] text-zinc-500/90 line-clamp-1">
                                {product.title}
                            </h3>
                            
                            <p className="text-base font-light tracking-[0.15em] text-zinc-600">
                                {product.price} $
                            </p>

                            {product.brand && (
                                <span className="text-xs font-light text-zinc-400/60 tracking-[0.1em]">
                                    {product.brand}
                                </span>
                            )}

                            <p className="flex items-center gap-1 text-sm text-gray-600">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating}</span>
                                <span className="text-gray-400">•</span>
                                <span>{product.reviews.length} reviews</span>
                            </p>
                        </div>

                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                            transition-opacity duration-500 pointer-events-none
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" 
                        />
                    </article>
                ))}
            </div>

            <div ref={ref} className="w-full flex justify-center py-6">
                {isFetchingNextPage && (
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite] [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite] [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite]" />
                    </div>
                )}
            </div>

        </section>
    )
}
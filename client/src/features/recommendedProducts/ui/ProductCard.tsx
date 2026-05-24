import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { Star, Truck, RotateCcw, ShoppingCart, ChevronRight, Package, Ruler } from 'lucide-react';

import { type ProductResponse } from "@/entities/product/model/types"; 
import { fetchProductOptions } from "@/entities/product/api/products/fetch-product";
import { ProductCardLoading } from "@/shared/ui";
import { ProductCardError } from "@/shared/ui";
import { ProductCardNotFound } from "@/shared/ui";
import { ApiError } from "@/shared/api";

export const ProductCard = () => {

    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient();

    const { data: product, isPending, isError, error } = useQuery({
        ...fetchProductOptions(id!), 
        placeholderData: () => {
                return queryClient
                    .getQueryData<{ pages: ProductResponse[] }>(['products', 'recommended', 'infinite'])
                    ?.pages?.flatMap(page => page.products)
                    .find(p => p.id === Number(id));
            },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    if (isPending && !product) {
        return <ProductCardLoading />
    }

    if (isError || !product)  {

        const apiError = error as ApiError

        if (apiError.status == 404) {
            return (
                <ProductCardNotFound productId={id}/>
            );
        }

        return <ProductCardError />;
    }

    return (
        <section className="w-[80%] mx-auto py-12 text-zinc-900">

            <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 mb-10 uppercase tracking-[0.15em]">
                <span className="hover:text-black cursor-pointer">Shop</span> 
                <ChevronRight size={12} className="text-zinc-400" />
                <span className="hover:text-black cursor-pointer">{product.category}</span> 
                <ChevronRight size={12} className="text-zinc-400" />
                <span className="text-zinc-400/60">{product.brand}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                <div className="space-y-6">
                    <div 
                        className="aspect-square rounded-[2.5rem] overflow-hidden bg-white/40 border border-white/60 
                        shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md flex items-center justify-center p-12"
                    >
                        <img 
                            src={product.images[0] || product.thumbnail} 
                            alt={product.title}
                            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                        />

                    </div>

                    <div className="flex gap-4">
                        {product.images.slice(0, 4).map((img, i) => (
                            <div 
                            key={i} 
                                className="w-24 h-24 rounded-2xl border border-white/80 overflow-hidden bg-white/20 cursor-pointer 
                                hover:border-zinc-400 transition-all shadow-sm"
                            >
                                <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex flex-col">
                    <div className="mb-8">
                        <span className="text-xs font-black uppercase tracking-tighter text-zinc-400">{product.brand}</span>
                        <h1 className="text-5xl font-black mt-2 text-zinc-900 leading-tight">
                            {product.title}
                        </h1>
                        
                        <div className="flex items-center gap-6 mt-6">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/50 rounded-full border border-white shadow-sm">
                                <Star size={16} className="text-orange-500" fill="currentColor" />
                                <span className="text-sm font-bold">{product.rating}</span>
                            </div>
                            <span className="text-zinc-500 text-sm font-medium border-b border-zinc-300">
                                {product.reviews.length} Customer Reviews
                            </span>
                            <span 
                                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider 
                                ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700'}`}
                            >
                                {product.availabilityStatus}
                            </span>
                        </div>
                    </div>


                    <div className="p-8 rounded-[2rem] bg-zinc-900 shadow-[0_20px_40px_rgba(0,0,0,0.2)] text-white">
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-black">${product.price}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-zinc-500 line-through text-xl font-medium">
                                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                                </span>
                            )}
                        </div>
                        
                        <button 
                            className="w-full mt-8 py-5 bg-white text-zinc-900 rounded-2xl font-black text-lg flex items-center 
                            justify-center gap-3 hover:bg-zinc-200 hover:cursor-pointer transition-all active:scale-[0.98] shadow-lg"
                        >
                            <ShoppingCart size={22} strokeWidth={2.5} />
                            ADD TO CART
                        </button>
                    </div>


                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="flex items-start gap-4 p-5 rounded-[1.5rem] border border-white/60 bg-white/30 backdrop-blur-sm">
                            <Truck size={24} className="text-zinc-500" />
                            <div>
                                <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Shipping</p>
                                <p className="text-[13px] font-semibold leading-tight text-zinc-700">{product.shippingInformation}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-[1.5rem] border border-white/60 bg-white/30 backdrop-blur-sm">
                            <RotateCcw size={24} className="text-zinc-500" />
                            <div>
                                <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Returns</p>
                                <p className="text-[13px] font-semibold leading-tight text-zinc-700">{product.returnPolicy}</p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-12 pt-10 border-t border-zinc-300">
                        <h3 className="text-xl font-black mb-4">Product Overview</h3>
                        <p className="text-zinc-600 leading-relaxed text-base">
                            {product.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-zinc-200 rounded-lg"><Package size={16}/></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-zinc-400">SKU</p>
                                    <p className="text-sm font-bold text-zinc-800 uppercase">{product.sku}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-zinc-200 rounded-lg"><Ruler size={16}/></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-zinc-400">Dimensions</p>
                                    <p className="text-sm font-bold text-zinc-800">{product.dimensions.width}x{product.dimensions.height} cm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
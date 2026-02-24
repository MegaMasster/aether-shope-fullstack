import { Clock } from "lucide-react";
import { type Product } from "@/entities/product"
import { Search } from "lucide-react";
import { div } from "framer-motion/client";

interface Props {
    products: Product[];
    isVisible: boolean; 
    isLoading: boolean;
}

export const SearchSuggestions = ({products , isVisible , isLoading} : Props) => {

    if (!isVisible) return null;

    return (
        <>
            {products.length > 0 ? (
                <div className="absolute top-full left-0 right-0 mt-3 p-2
                    bg-gradient-to-br from-white/40 via-zinc-200/20 to-white/30 
                    backdrop-blur-3xl border border-white/30 rounded-[32px]
                    shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]
                    overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300"
                >

                    <div className="flex flex-col gap-1">
                        {products.slice(0, 6).map((product) => (
                            <div
                                key={product.id}
                                className="group flex items-center justify-between px-6 py-3 
                                hover:bg-white/50 rounded-[22px] transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="text-zinc-700 font-light tracking-wide text-sm group-hover:text-zinc-900 transition-colors">
                                        {product.title}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-light leading-none mt-1 opacity-70">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <Search size={14} className="text-zinc-400" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                <div className="absolute top-full left-0 right-0 mt-3 h-[120px] p-2
                    bg-gradient-to-br from-white/40 via-zinc-200/20 to-white/30 
                    backdrop-blur-3xl border border-white/30 rounded-[32px]
                    shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]
                    overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-60">
                        
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-zinc-400 border-solid rounded-full animate-spin"></div>
                                    <div className="absolute w-1 h-1 bg-zinc-400 rounded-full"></div>
                                </div>
                                <span className="text-zinc-500 font-light text-[10px] uppercase tracking-[0.2em] animate-pulse">
                                    Searching...
                                </span>
                            </div>
                        ) : (
                            <>
                                <Clock size={18} strokeWidth={1.2} className="text-zinc-400" />
                                <p className="text-zinc-500 font-light text-[11px] uppercase tracking-[0.25em]">
                                    History is empty
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
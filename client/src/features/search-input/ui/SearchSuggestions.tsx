import { Clock } from "lucide-react";
import { type Product } from "@/entities/product"
import { Search , SearchX } from "lucide-react";

interface Props {
    products: Product[];
    isVisible: boolean; 
    isPending: boolean;
    isFetching: boolean;
    safeDeboucedQuery: string;
    history: string[]
}

export const SearchSuggestions = ({products , isVisible , isPending , isFetching , safeDeboucedQuery , history} : Props) => {

    if (!isVisible) return null;

    return (
        <>
            {products.length > 0 && safeDeboucedQuery.length > 0 ? (
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
                                className={`group flex items-center justify-between px-6 py-3 
                                hover:bg-white/50 rounded-[20px] transition-all duration-300 cursor-pointer
                                ${isFetching 
                                    ? 'animate-pulse bg-white/5 pointer-events-none' 
                                    : 'opacity-100'
                                }`}
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
                        
                        {isPending ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-zinc-400 border-solid rounded-full animate-spin"></div>
                                    <div className="absolute w-1 h-1 bg-zinc-400 rounded-full"></div>
                                </div>
                                <span className="text-zinc-500 font-light text-[10px] uppercase tracking-[0.2em] animate-pulse">
                                    Searching...
                                </span>
                            </div>
                        ) : safeDeboucedQuery.length >= 2 && !isFetching ? (  
                            <>
                                <SearchX size={18} strokeWidth={1.2} className="text-zinc-400" />
                                <p className="text-zinc-500 font-light text-[11px] uppercase tracking-[0.25em]">
                                    No results found
                                </p>
                            </>
                        ) : (

                            history.length > 0 ? (
                                <div className="w-full px-5">
                                    <div className="flex items-center justify-between mb-2 px-2">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em] font-medium opacity-70">
                                            Recent Searches
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-2">
                                        {history.slice(0, 6).map((item) => (
                                            <div 
                                                key={item} 
                                                className="group relative flex items-center gap-3 px-3 py-2
                                                    bg-white/60 border border-white/80 rounded-2xl
                                                    shadow-[0_4px_12px_-1px_rgba(0,0,0,0.03)]
                                                    hover:bg-white hover:border-zinc-200 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)]
                                                    hover:-translate-y-0.5
                                                    transition-all duration-400 cursor-pointer overflow-hidden"
                                            >

                                                <Clock size={10} className="text-zinc-400 shrink-0 group-hover:text-zinc-600 transition-colors" />
                                                
                                                <span className="text-zinc-600 text-[11px] font-normal tracking-tight 
                                                    truncate group-hover:text-zinc-900 transition-colors">
                                                    {item}
                                                </span>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Clock size={18} strokeWidth={1.2} className="text-zinc-400" />
                                    <p className="text-zinc-500 font-light text-[11px] uppercase tracking-[0.25em]">
                                        History is empty
                                    </p>
                                </>
                            )
                        )}
                    </div>

                </div>
            )}
        </>
    )
}
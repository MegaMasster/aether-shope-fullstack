import { X, LayoutGrid } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; 

import { useCatalogStore } from "@/features/catalog/model/useCatalogStore";
import { STATIC_CATEGORIES } from '../model/categories';
import { productsByCategoryOptions } from '@/entities/product/api/products/useCategoryQuery';

export const CatalogPopup = () => {
    const closeCatalog = useCatalogStore(state => state.closeCatalog);
    const isCatalogPopupOpen = useCatalogStore(state => state.isCatalogPopupOpen);
    const setActiveCategory = useCatalogStore(state => state.setActiveCategory);
    const activeCategory = useCatalogStore(state => state.activeCategory);

    const navigate = useNavigate(); 

    const { data } = useQuery({
        ...productsByCategoryOptions(activeCategory)
    });

    if (!isCatalogPopupOpen) return null;

    const handleCategoryClick = (slug: string) => {
        if (slug === activeCategory) {
            const url = slug ? `/category/${slug}` : '/';
            navigate(url);
            closeCatalog();
            return;
        }

        setActiveCategory(slug); 
        
        const targetUrl = slug ? `/category/${slug}` : '/';
        navigate(targetUrl);
        
        closeCatalog(); 
    };

    return (
        <AnimatePresence>
            {isCatalogPopupOpen && (
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-6
                    bg-zinc-950/10 backdrop-blur-md cursor-pointer"
                    onClick={closeCatalog}
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
                        className="relative w-full max-w-[1000px] p-12 bg-white/70 
                        border border-zinc-200/40 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.04)]
                        flex flex-col cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={closeCatalog}
                            className="absolute top-10 right-10 p-2 text-zinc-400
                            hover:text-zinc-950 hover:rotate-90 transition-all duration-300 ease-in-out cursor-pointer"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-10 flex items-center gap-2">
                            <LayoutGrid size={12} strokeWidth={2} />
                            Catalog
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            
                            <button
                                onClick={() => handleCategoryClick('')}
                                className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-200 text-left text-sm font-semibold tracking-wide
                                    ${activeCategory === '' 
                                        ? 'bg-zinc-900 border-zinc-900 text-white cursor-default' 
                                        : 'bg-transparent border-zinc-200/60 text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 cursor-pointer'}`}
                            >
                                <span>All Products</span>
                                <span className={`text-[10px] font-bold tracking-widest ${activeCategory === '' ? 'text-zinc-400' : 'text-zinc-300'}`}>
                                    →
                                </span>
                            </button>

                            {STATIC_CATEGORIES.map((cat) => {
                                const isSelected = activeCategory === cat.slug;
                                return (
                                    <button
                                        key={cat.slug}
                                        onClick={() => handleCategoryClick(cat.slug)}
                                        className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-200 text-left text-sm font-semibold tracking-wide
                                            ${isSelected 
                                                ? 'bg-zinc-900 border-zinc-900 text-white cursor-default' 
                                                : 'bg-transparent border-zinc-200/60 text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 cursor-pointer'}`}
                                    >
                                        <span className="truncate">{cat.name}</span>
                                        <span className={`text-[10px] font-bold tracking-widest ${isSelected ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                            →
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};
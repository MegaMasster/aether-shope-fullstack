import { X } from 'lucide-react'; 

import { useCatalogStore } from "@/features/catalog/model/useCatalogStore";

export const CatalogPopup = () => {

    const closeCatalog = useCatalogStore(state => state.closeCatalog)
    const isCatalogPopupOpen = useCatalogStore(state => state.isCatalogPopupOpen)

    if (!isCatalogPopupOpen) return null;

    return (
        <section 
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4
            bg-white/10 backdrop-blur-[14px] transition-all duration-500"
            onClick={closeCatalog}
        >
            <div 
                className="relative w-full max-w-[1200px] min-h-[500px] p-10
                bg-gradient-to-br from-white/40 via-zinc-200/20 to-black/5
                border border-white/30 rounded-[40px] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={closeCatalog}
                    className="absolute top-8 right-8 p-2 rounded-full
                    bg-white/10 border border-white/20 text-zinc-500
                    hover:bg-white/40 hover:text-zinc-950 hover:rotate-90
                    transition-all duration-500 ease-in-out active:scale-90 hover:cursor-pointer"
                >
                    <X size={24} strokeWidth={1.2} />
                </button>

                <h2 className="text-2xl font-light tracking-[0.4em] uppercase text-zinc-800 mb-12">
                    Catalog
                </h2>
            </div>
        </section>
    )
}
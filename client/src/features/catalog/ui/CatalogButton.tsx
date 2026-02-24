import { LayoutGrid } from 'lucide-react';

import { useCatalogStore } from '@/features/catalog/model/useCatalogStore';

export const CatalogButton = () => {

    const openCatalog = useCatalogStore(state => state.openCatalog)

    return (
        <button className="group relative p-3
            bg-gradient-to-br from-white/30 via-zinc-400/15 to-black/5 
            backdrop-blur-xl 
            border border-white/20 rounded-2xl 
             text-zinc-500
            shadow-[0_8px_20px_-6px_rgba(71,85,105,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]
            transition-all duration-500 ease-out
             hover:text-zinc-900 hover:border-white/40 
            hover:shadow-[0_15px_30px_-8px_rgba(71,85,105,0.3)]
            hover:-translate-y-0.5
            active:scale-95 active:translate-y-0 hover:cursor-pointer"
            onClick={openCatalog}
        >
            <LayoutGrid size={20} strokeWidth={1.2} className="transition-transform duration-400 group-hover:rotate-90" />
        </button>
    )
}
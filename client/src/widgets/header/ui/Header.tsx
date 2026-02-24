import { SearchInput } from "@/features/search-input";
import { CatalogButton } from "@/features/catalog";
import { CatalogPopup } from "@/features/catalog";
import { CartButton } from "@/features/cart";

export const Header = () => {
    return (
        <header className="flex items-center justify-around w-[80%] py-3">

            <div className="flex items-center justify-start w-[400px] px-10 py-4
                bg-gradient-to-br from-white/30 via-zinc-400/25 to-black/5 
                backdrop-blur-2xl border border-white/20 rounded-3xl 
                shadow-[0_20px_50px_-12px_rgba(71,85,105,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]"
            >
                <h1 className="text-3xl tracking-[0.35em] uppercase text-zinc-800">
                    AETHER
                </h1>
            </div>

            <SearchInput />

            <nav className="flex justify-center gap-5 w-[400px] px-10 py-3
                bg-gradient-to-br from-white/30 via-zinc-400/25 to-black/5 
                backdrop-blur-2xl border border-white/20 rounded-3xl 
                shadow-[0_20px_50px_-12px_rgba(71,85,105,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                <CatalogButton />
                <CartButton />
            </nav>
            
            <CatalogPopup />

        </header>
    )
}
interface ProductCardNotFoundProps {
    productId: string | undefined;
}

export const ProductCardNotFound = ({productId}: ProductCardNotFoundProps) => {
    return (
        <section className="flex w-full justify-center items-center py-20 animate-in fade-in duration-500">
            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-12 text-center max-w-md">
                <div className="bg-zinc-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <span className="text-4xl opacity-40">🔍</span>
                </div>
                        
                <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Item Not Found</h2>
                <p className="text-zinc-400 mt-3 leading-relaxed">
                    The product with ID <span className="text-zinc-500 font-mono">#{productId}</span> is not available in DummyJson current catalog.
                </p>
            </div>
        </section>
    )
}
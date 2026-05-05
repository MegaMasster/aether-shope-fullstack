

export const ProductCardError = () => {
    return (
        <section className="flex w-full justify-center items-center py-20 animate-in fade-in duration-500">
            <div className="relative bg-red-500/5 backdrop-blur-2xl border border-red-500/20 rounded-3xl p-12 text-center max-w-md shadow-2xl">
                <div className="absolute -z-10 inset-0 bg-red-500/5 blur-3xl rounded-full" />
                    
                <div className="bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-inner">
                    <span className="text-4xl">⚠️</span>
                </div>
                    
                <h2 className="text-2xl font-bold text-red-200 tracking-tight">[ERROR] This server is crap</h2>
                <p className="text-red-400/60 mt-3 leading-relaxed">
                     We encountered a technical issue while retrieving the data. Please try again later.
                </p>
            </div>
        </section>
    );
}
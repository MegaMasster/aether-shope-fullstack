
export const ProductCardLoading = () => {
    return (
        <section className="w-[65%] mt-15 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> 
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 h-[500px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    <div className="w-full h-full bg-zinc-400/20 rounded-2xl animate-pulse" />
                </div>
                <div className="space-y-6">
                    <div className="h-10 bg-zinc-400/10 rounded-full w-3/4 animate-pulse" />
                    <div className="h-6 bg-zinc-400/10 rounded-full w-1/2 animate-pulse" />
                    <div className="h-32 bg-zinc-400/10 rounded-2xl w-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}
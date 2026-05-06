
export const ProductCardLoading = () => {
    return (
        <section className="w-[90%] max-w-[1400px] mx-auto py-12">
            <div className="flex gap-2 mb-10">
                <div className="h-3 w-12 bg-zinc-300 rounded-full animate-pulse" />
                <div className="h-3 w-3 bg-zinc-300 rounded-full animate-pulse" />
                <div className="h-3 w-20 bg-zinc-300 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                    <div className="aspect-square rounded-[2.5rem] bg-zinc-300/40 animate-pulse border border-white/20" />
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-24 h-24 rounded-2xl bg-zinc-300/40 animate-pulse" />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="mb-8">
                        <div className="h-3 w-16 bg-zinc-300/60 rounded-full animate-pulse mb-3" />
                        <div className="h-12 w-full bg-zinc-300/60 rounded-2xl animate-pulse mb-3" />
                        <div className="h-12 w-2/3 bg-zinc-300/60 rounded-2xl animate-pulse" />
                        
                        <div className="flex gap-4 mt-6">
                            <div className="h-8 w-16 bg-zinc-300/40 rounded-full animate-pulse" />
                            <div className="h-8 w-32 bg-zinc-300/40 rounded-full animate-pulse" />
                        </div>
                    </div>

                    <div className="h-[200px] w-full rounded-[2rem] bg-zinc-300/60 animate-pulse" />

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="h-24 rounded-[1.5rem] bg-zinc-300/30 animate-pulse" />
                        <div className="h-24 rounded-[1.5rem] bg-zinc-300/30 animate-pulse" />
                    </div>

                    <div className="mt-12 pt-10 border-t border-zinc-300 space-y-4">
                        <div className="h-6 w-1/3 bg-zinc-300/60 rounded-full animate-pulse" />
                        <div className="h-4 w-full bg-zinc-300/40 rounded-full animate-pulse" />
                        <div className="h-4 w-full bg-zinc-300/40 rounded-full animate-pulse" />
                        <div className="h-4 w-3/4 bg-zinc-300/40 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
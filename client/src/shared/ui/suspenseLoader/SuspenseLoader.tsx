export const SuspenseLoader = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="relative">
                <div className="w-8 h-8 border border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
                    
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 text-[8px] tracking-[0.3em] uppercase">
                    loading...
                </p>
            </div>
        </div>
    )
}
import PromoError from "@/shared/assets/icons/PromoError.jpg"

export const ErrorPromoSlide = () => {
    return (
        <div className="group overflow-hidden rounded-3xl border border-amber-500/30 shadow-xl transition-all duration-500 hover:border-amber-500/60">
            <div className="flex relative">
                <div className="flex-[0_0_100%] min-w-0 h-[400px] relative bg-gradient-to-br from-amber-50/10 via-gray-800/5 to-amber-50/10">
                    <div className="flex h-full items-center justify-between px-16">
                        <div className="max-w-[50%] space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                <span className="text-amber-400 text-sm font-mono tracking-wider">
                                [ERROR] This server is crap
                            </span>
                            </div>
                            
                            <h2 className="text-5xl font-bold">
                                <span className="text-amber-400">Oopsie</span>
                                <span className="text-gray-400">...</span>
                            </h2>
                            
                            <p className="text-xl text-gray-300 italic">
                                Our hamster died on the wheel 
                            </p>
                            
                            <div className="flex gap-4 pt-4">
                                <div className="px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
                                    <span className="text-red-400 font-mono text-sm">
                                        Status: 500
                                    </span>
                                </div>
                                <div className="px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-500/30">
                                    <span className="text-amber-400 font-mono text-sm">
                                        Mood: crying_inside
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 font-mono mt-4">
                                blame: <span className="text-red-400">@gleb987</span> • try: <span className="text-amber-400">ctrl + F5</span>
                            </p>
                        </div>
                        
                        <div className="relative">
                            <img 
                                src={PromoError} 
                                className="h-64 object-contain drop-shadow-2xl transform group-hover:rotate-3 transition-transform duration-500"
                                alt="Error meme"
                            />
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/20 rounded-full filter blur-xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
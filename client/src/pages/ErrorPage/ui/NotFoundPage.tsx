import { AlertCircle, Home } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <main className="min-h-[80vh] w-full flex items-center justify-center p-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-16 text-center max-w-lg shadow-2xl">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 mb-8">
                        <AlertCircle className="w-10 h-10 text-red-400/80" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight mb-4">
                        Something went wrong
                    </h1>
                    
                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                        An unexpected error occurred. Don't worry, our team has been notified. 
                        Please try refreshing the page.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="flex items-center gap-2 px-8 py-3 hover:cursor-pointer bg-white text-zinc-900 font-medium rounded-xl hover:bg-zinc-200 transition-colors active:scale-95"
                        >
                            <Home size={18} />
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
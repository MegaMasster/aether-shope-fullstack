import { type Product } from "@/entities/product/model/types";

interface PromoSlidesProps {
    product: Product;
}

export const PromoSlides = ({ product }: PromoSlidesProps) => {
    return (
        <div className="flex-[0_0_100%] min-w-0 h-[400px] relative bg-gradient-to-br from-white/30 via-zinc-700/15 to-black/5">
            <div className="flex h-full items-center justify-between px-16">
                <div className="max-w-[50%]">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">
                        {product.title}
                    </h2>
                    <p className="text-zinc-600 mb-6 line-clamp-2">
                        {product.description}
                    </p>
                    <button className="px-8 py-3 bg-zinc-900 text-white rounded-full hover:bg-black transition-colors hover:cursor-pointer">
                        Buy now
                    </button>
                </div>
                <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="h-64 object-contain drop-shadow-2xl"
                />
            </div>
        </div>
    );
};
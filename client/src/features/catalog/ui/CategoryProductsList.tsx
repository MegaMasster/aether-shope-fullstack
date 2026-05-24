import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Heart, Star } from 'lucide-react';

import { productsByCategoryOptions } from '@/entities/product/api/products/useCategoryQuery';
import type { Product } from '@/entities/product/model/types'; 
import { STATIC_CATEGORIES } from '../model/categories';

export const CategoryProductList = () => {

    const { id = '' } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        ...productsByCategoryOptions(id)
    });

    const currentCategory = STATIC_CATEGORIES.find(cat => cat.slug === id);

    const categoryName = currentCategory ? currentCategory.name : 'All Products';

    if (isLoading) {
        return (
            <section className="w-[65%] mt-15 p-5 flex justify-center py-20">
                <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite] [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite] [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/60 animate-[bounce_1s_infinite]" />
                </div>
            </section>
        );
    }

    return (
        <section className="w-[65%] mt-15 p-5 mx-auto">
            
            {/* 3. Хлебные крошки в твоем фирменном стиле */}
            <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 mb-10 uppercase tracking-[0.15em]">
                {/* Ссылка "Shop" ведет на главную или общий каталог */}
                <Link to="/catalog" className="hover:text-black cursor-pointer transition-colors">
                    Shop
                </Link> 
                <ChevronRight size={12} className="text-zinc-400" />
                {/* Отображаем динамическое имя категории из URL */}
                <span className="text-zinc-400/60 font-medium">
                    {categoryName}
                </span> 
            </nav>

            {isError ? (
                <div className="flex justify-center w-full py-10">
                    <h3 className="text-red-500 font-light tracking-wider">
                        Products not loaded (because the API is crap)
                    </h3>
                </div>
            ) : (
                <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data?.products.map((product: Product) => (
                        <Link 
                            key={product.id} 
                            className="group relative flex flex-col
                            bg-gradient-to-br from-white/30 via-zinc-400/15 to-black/5 
                            backdrop-blur-2xl border border-white/20 rounded-2xl text-zinc-600
                            shadow-[0_15px_40px_-12px_rgba(71,85,105,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                            transition-all duration-500 p-4 pb-6 overflow-hidden hover:cursor-pointer
                            hover:bg-white/40 hover:border-white/40 hover:shadow-[0_20px_50px_-10px_rgba(71,85,105,0.3)]"
                            to={`/product/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* Кнопка "Избранное" */}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    e.stopPropagation();
                                }}
                                className="absolute top-3 right-3 z-20 p-2 rounded-full 
                                bg-white/10 backdrop-blur-md border border-white/20 
                                text-zinc-400 opacity-0 group-hover:opacity-100 
                                transition-all hover:cursor-pointer duration-300 hover:bg-white/30 hover:text-red-500 hover:scale-110 active:scale-90"
                            >
                                <Heart size={16} strokeWidth={2} />
                            </button>

                            {/* Изображение товара */}
                            <div className="relative w-full h-32 mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-white/20 via-zinc-400/10 to-black/5">
                                <img 
                                    src={product.thumbnail} 
                                    alt={product.title}
                                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                            </div>

                            {/* Контент карточки */}
                            <div className="flex flex-col gap-1 px-1 flex-grow justify-between">
                                <div>
                                    <h3 className="font-light text-sm tracking-[0.1em] text-zinc-500/90 line-clamp-1">
                                        {product.title}
                                    </h3>
                                    {product.brand && (
                                        <p className="text-xs font-light text-zinc-400/60 tracking-[0.1em] mt-0.5">
                                            {product.brand}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="mt-2 space-y-1.5">
                                    <p className="text-base font-medium tracking-[0.15em] text-zinc-800">
                                        {product.price} $
                                    </p>
                                    <p className="flex items-center gap-1 text-xs text-zinc-500 font-light tracking-wide">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        <span>{product.rating}</span>
                                        <span className="text-zinc-300">•</span>
                                        <span>{product.reviews?.length || 0} reviews</span>
                                    </p>
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
                        </Link>
                    ))}
                </article>
            )}
        </section>
    );
};
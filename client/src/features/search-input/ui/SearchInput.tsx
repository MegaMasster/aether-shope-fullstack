import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState} from 'react';
import React from 'react';

import { searchProductsOptions } from '@/entities/product';
import { SearchSuggestions } from './SearchSuggestions';

interface SearchInput {
    searchQuery: string;
}

export const SearchInput = () => {

    const [isFocused, setIsFocused] = useState(false);

    const { register , watch } = useForm<SearchInput>({
        
    });

//     const renderContent = () => {
//     if (isLoading) return <Loader />; // 1. Загрузка
//     if (products.length > 0) return <ProductList />; // 2. Результаты
//     if (searchQuery) return <EmptyResults />; // 3. Ничего не найдено
//     return <History />; // 4. По умолчанию — история
// };

// return (
//     <div className="container">
//         {renderContent()}
//     </div>
// );

    const query = watch("searchQuery")

    const [ deboucedQuery ] = useDebounce(query , 400);
    const safeDeboucedQuery = deboucedQuery || "";

    const isSearchEnabled = safeDeboucedQuery.trim().length >= 2;

    const {data , isPending , isFetching} = useQuery({
        ...searchProductsOptions(safeDeboucedQuery) , 
        enabled: safeDeboucedQuery.trim().length >= 2
    })

    const handleFormSubmit = (e: React.FormEvent) => e.preventDefault();

    return (
        <form onSubmit={handleFormSubmit} className="relative flex p-3">
            <div className="relative flex items-center group">
                <input 
                    {...register("searchQuery")}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 0)} 
                    type="text" 
                    placeholder="Search..."
                    className="w-[600px] pl-8 pr-16 py-2.5 
                    bg-gradient-to-br from-white/30 via-zinc-400/15 to-black/5 
                    backdrop-blur-2xl 
                    border border-white/20 rounded-3xl 
                     text-zinc-600 placeholder-zinc-400/50 font-light tracking-[0.15em] outline-none
                    shadow-[0_15px_40px_-12px_rgba(71,85,105,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                    transition-all duration-500
                     hover:bg-white/40
                    focus:w-[650px] focus:border-white/40 focus:shadow-[0_20px_50px_-10px_rgba(71,85,105,0.3)]"
                />
            </div>

            <SearchSuggestions
                products = {data?.products || []}
                isVisible = {isFocused}
                isPending = {isPending && isSearchEnabled}
                isFetching={isFetching}
            />

        </form>
    )
}
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import React from 'react';

import { searchProductsOptions } from '@/entities/product';
import { SearchSuggestions } from './SearchSuggestions';
import { useSearchHistoryStore , useSearchInputStore } from '@/features/search-input/index';

interface SearchInput {
    searchQuery: string;
}

export const SearchInput = () => {

    const addToHistory = useSearchHistoryStore(state => state.addToHistory)
    const history = useSearchHistoryStore(state => state.history)

    const inputQuery = useSearchInputStore(state => state.inputQuery)

    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLFormElement>(null);

    const { register , watch, setValue  } = useForm<SearchInput>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (inputQuery) {
            setValue("searchQuery", inputQuery);
        }
    }, [inputQuery, setValue]);

    const query = watch("searchQuery")

    const [ deboucedQuery ] = useDebounce(query , 400);
    const safeDeboucedQuery = deboucedQuery || "";

    const isSearchEnabled = safeDeboucedQuery.trim().length >= 2;

    const {data , isPending , isFetching } = useQuery({
        ...searchProductsOptions(safeDeboucedQuery) , 
        enabled: safeDeboucedQuery.trim().length >= 2
    })

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim().length >= 2) {
            addToHistory(query)
        }
    }

    return (
        <form 
            ref={containerRef}
            onSubmit={handleFormSubmit} 
            className="relative flex p-3"
        >
            <div className="relative flex items-center group">
                <input 
                    {...register("searchQuery")}
                    onFocus={() => setIsFocused(true)}
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
                safeDeboucedQuery={safeDeboucedQuery}
                history={history}
            />

        </form>
    )
}
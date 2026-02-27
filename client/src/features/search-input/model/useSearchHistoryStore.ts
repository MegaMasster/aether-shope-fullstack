import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface SearchHistoryStates {
    history: string[]
}

interface SearchHistoryActions {
    addToHistory: (query: string) => void , 
    clearHistory: () => void
}

type SearchHistoryStore = SearchHistoryStates & SearchHistoryActions

export const useSearchHistoryStore = create<SearchHistoryStore>()(
    persist(
        (set) => ({
            history: [] , 

            addToHistory: (query) => set((state) => {
                const protectedQuery = query.trim();
                if (!protectedQuery || state.history.includes(protectedQuery)) return state;

                const newHistory = [protectedQuery, ...state.history].slice(0, 6);
                return { history: newHistory };
            }) , 

            clearHistory: () => set({history: []})
        }) , {
            name: "serach-history"
        }
    )
)
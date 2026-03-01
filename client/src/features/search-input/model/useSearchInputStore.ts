import { create } from "zustand";

interface SearchInputStates {
    inputQuery: string
}

interface SearchInputActions {
    setInputQuery: (query: string) => void
}

type useSearchInput = SearchInputStates & SearchInputActions

export const useSearchInputStore = create<useSearchInput>()(
    (set) => ({
        inputQuery: "" ,

        setInputQuery: (query: string) => set({inputQuery: query})
    })  
)
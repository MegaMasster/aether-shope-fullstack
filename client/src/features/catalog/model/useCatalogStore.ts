import { create } from "zustand"

interface CatalogStates {
    isCatalogPopupOpen: boolean
    activeCategory: string
}

interface CatalogActions {
    openCatalog: () => void
    closeCatalog: () => void
    setActiveCategory: (category: string) => void
}

type CatalogStore = CatalogStates & CatalogActions

export const useCatalogStore = create<CatalogStore>()((set) => ({
    isCatalogPopupOpen: false, 
    activeCategory: '',

    openCatalog: () => set({isCatalogPopupOpen: true}) ,

    closeCatalog: () => set({isCatalogPopupOpen: false}) ,

    setActiveCategory: (category) => set({ activeCategory: category }) ,
}))
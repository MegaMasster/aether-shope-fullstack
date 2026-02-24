import { create } from "zustand"

interface CatalogStates {
    isCatalogPopupOpen: boolean
}

interface CatalogActions {
    openCatalog: () => void
    closeCatalog: () => void
}

type CatalogStore = CatalogStates & CatalogActions

export const useCatalogStore = create<CatalogStore>()((set) => ({
    isCatalogPopupOpen: false, 

    openCatalog: () => set({isCatalogPopupOpen: true}) ,

    closeCatalog: () => set({isCatalogPopupOpen: false})
}))
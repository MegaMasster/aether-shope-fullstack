import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

import type { ProductResponse } from "../../model/types";

const fetchProductsByCategory  = async (signal: AbortSignal , category: string): Promise<ProductResponse> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/category/${category}` , {signal: combinedSignal})

    if(!response.ok) {
        let message = "Server error"
        try {
            const errorData = await response.json()
            message = errorData.message || message
        } catch (error) {

        }
        throw new ApiError(message , response.status)
    }

    const successData = await response.json()

    return successData
}

export const productsByCategoryOptions  = (category: string) => {
    return queryOptions({
        queryKey: ["products" , category],
        queryFn: ({ signal }) => fetchProductsByCategory(signal , category),
        staleTime: 5 * 1000 * 60,
        gcTime: 30 * 1000 * 60
    })
}
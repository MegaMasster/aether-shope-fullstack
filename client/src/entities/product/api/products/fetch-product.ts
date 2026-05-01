import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

import type { Product } from "../../model/types";

const fetchProduct = async (signal: AbortSignal , id: string): Promise<Product> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}` , {signal: combinedSignal})

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

export const fetchProductOptions = (id: string) => {
    return queryOptions({
        queryKey: ["product" , id],
        queryFn: ({ signal }) => fetchProduct(signal , id),
        staleTime: 5 * 1000 * 60,
        gcTime: 30 * 1000 * 60
    })
}
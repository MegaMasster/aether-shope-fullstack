import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

import { type ProductResponse } from "../../model/types";

const getProductCard = async (productId: string | undefined, signal: AbortSignal): Promise<ProductResponse> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}` , {signal: combinedSignal})

    if (!response.ok) {
        let message = "Server error"
        try {
            const errorData = await response.json()
            message = errorData.message || message
        } catch(error) {

        }
        throw new ApiError(message , response.status)
    }

    const successData = await response.json()

    return {
        products: successData.products , 
        total: successData.total , 
        skip: successData.skip , 
        limit: successData.limit
    }
}

export const productCardOptions = (productId: string | undefined) => {
    return queryOptions({
        queryKey: ["products", "detail" , productId],
        queryFn: ({signal}) => getProductCard(productId , signal),
        staleTime: 5 * 1000 * 60,
        enabled: !!productId
    })
}
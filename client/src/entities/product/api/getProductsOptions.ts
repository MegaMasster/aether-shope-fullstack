import { queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

import { type ProductResponse } from "../model/types";

const getProducts = async (signal: AbortSignal): Promise<ProductResponse> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=5` , {signal: combinedSignal})

    if (!response.ok) {
        let message = "Server error"
        try {
            const errorData = await response.json()
            message = errorData.message || message
        } catch (error) {

        }
        throw new ApiError(message , response.status)
    }

    const successData = await response.json()
    console.log("Get data for promo: " , successData)

    return {
        products: successData.products , 
        total: successData.total , 
        skip: successData.skip , 
        limit: successData.limit
    }
}

export const getProductsOptions = () => {
    return queryOptions({
        queryKey: ["products" , "promo"] ,
        queryFn: ({ signal }) => getProducts(signal),
        staleTime: 10 * 1000 * 60,
        gcTime: 30 * 1000 * 60
    })
}
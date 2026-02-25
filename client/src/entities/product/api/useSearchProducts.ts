import { queryOptions , keepPreviousData } from "@tanstack/react-query";

import { BASE_URLS } from "@/shared/api";
import { ApiError } from "@/shared/api";

import { type ProductResponse } from "../model/types";

const searchProducts = async (query: string , signal: AbortSignal): Promise<ProductResponse> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${BASE_URLS.dummy}/products/search?q=${query}` , {signal: combinedSignal})

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

    console.log(successData)

    return {
        products: successData.products , 
        total: successData.total , 
        skip: successData.skip , 
        limit: successData.limit
    }

}

export const searchProductsOptions = (query: string) => {
    return queryOptions({
        queryKey: ["products" , "search" , query] , 
        queryFn: ({ signal }) => searchProducts(query , signal) , 
        staleTime: 1 * 1000 * 60 ,
        gcTime: 15 * 1000 * 60 ,
        placeholderData: keepPreviousData   
    })
}
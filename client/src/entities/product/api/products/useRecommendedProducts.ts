import { infiniteQueryOptions } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";

import { type ProductResponse } from "../../model/types";

const recommendedProductsPage = async ({ 
    pageParam = 0, 
    signal 
}: { 
    pageParam: number; 
    signal: AbortSignal;
}): Promise<ProductResponse> => {

    const combinedSignal = AbortSignal.any([signal , AbortSignal.timeout(8000)])

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=15&skip=${pageParam}` , {signal: combinedSignal})

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
    const shuffled = [...successData.products].sort(() => 0.5 - Math.random());

    return {
        products: shuffled,
        total: successData.total, 
        skip: successData.skip, 
        limit: successData.limit,
    }
}

export const getRecommendedProductsInfiniteOptions  = () => {
    return infiniteQueryOptions({
        queryKey: ['products', 'recommended', 'infinite'] , 
        queryFn: recommendedProductsPage , 
        initialPageParam: 0 ,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const totalFetched = allPages.reduce((sum, page) => sum + page.products.length, 0);
            if (totalFetched < lastPage.total) {
                return lastPageParam + lastPage.limit;
            }
            return undefined; 
        },
        staleTime: 5 * 1000 * 60
    })
}
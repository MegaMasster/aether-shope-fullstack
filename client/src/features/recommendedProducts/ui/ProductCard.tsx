import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

import { type ProductResponse } from "@/entities/product/model/types"; 
import { fetchProductOptions } from "@/entities/product/api/products/fetch-product";
import { ProductCardLoading } from "@/shared/ui";
import { ProductCardError } from "@/shared/ui";
import { ProductCardNotFound } from "@/shared/ui";
import { ApiError } from "@/shared/api";

export const ProductCard = () => {

    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient();

    const { data: product, isLoading, isError, error } = useQuery({
        ...fetchProductOptions(id!), 
        initialData: () => {
            const product = queryClient
                .getQueryData<{ pages: ProductResponse[] }>(['products', 'recommended', 'infinite'])
                ?.pages?.flatMap(page => page.products)
                .find(p => p.id === Number(id));

            return product;
        },
        initialDataUpdatedAt: () => 
            queryClient.getQueryState(['products', 'recommended', 'infinite'])?.dataUpdatedAt,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return <ProductCardLoading />
    }

    if (isError || !product)  {

        const apiError = error as ApiError

        if (apiError.status == 404) {
            return (
                <ProductCardNotFound productId={id}/>
            );
        }

        return <ProductCardError />;
    }

    return (
        <section className="flex w-[80%] mx-auto p-8">
            <div className="grid grid-cols-2 gap-8">
                <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="rounded-2xl shadow-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 mt-4">{product.description}</p>
                    <p className="text-2xl font-bold text-green-600 mt-4">
                        {product.price}$
                    </p>
                </div>
            </div>
        </section>
    );
}
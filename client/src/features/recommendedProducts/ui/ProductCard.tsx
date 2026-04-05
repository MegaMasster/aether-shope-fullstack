import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

import { productCardOptions } from "@/entities/product"

export const ProductCard = () => {

    const { id } = useParams<{ id: string }>()

    const { data } = useQuery( productCardOptions(id) )

    return (
        <section className="flex w-[80%]">
            <h1>asdas</h1>
        </section>
    )
}
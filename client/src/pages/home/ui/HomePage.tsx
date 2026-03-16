import { Header } from "@/widgets/header";
import { PromoCarousel } from "@/features/promo-carousel";
import { RecommendProducts } from "@/features/recommendedProducts";

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <PromoCarousel />
            <RecommendProducts />
        </div>
    )
}
import { Header } from "@/widgets/header";
import { PromoCarousel } from "@/features/promo-carousel";

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <PromoCarousel/>
        </div>
    )
}
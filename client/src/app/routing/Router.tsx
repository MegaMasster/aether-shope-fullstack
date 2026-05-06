import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense , lazy } from "react";

import { ROUTES } from "@/app/routing/routes";
import { SuspenseLoader } from "@/shared/ui";
import { BaseLayout } from "@/app/layout/BaseLayout";

const HomePage = lazy(() => import("@/pages/home"));
const FavoritesProductsPage = lazy(() => import("@/pages/favorites"));
const ProductCardPage = lazy(() => import("@/pages/productCard"));
const NotFoundPage = lazy(() => import("@/pages/ErrorPage"));
const CartProducts = lazy(() => import("@/pages/cart"));

export const AppRouter = () => {
    return (
        <Suspense fallback={<SuspenseLoader/>}>
            <BrowserRouter>
                <Routes>

                    <Route element={ <BaseLayout/> }>

                        <Route path={ROUTES.HOME} element={ <HomePage/> } />
                        <Route path={ROUTES.FAVORITES} element={ <FavoritesProductsPage/> } />
                        <Route path={ROUTES.PRODUCT} element={ <ProductCardPage/> } />
                        <Route path="*" element={ <NotFoundPage/> } />
                        <Route path={ROUTES.CART} element={ <CartProducts /> } />

                    </Route>

                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
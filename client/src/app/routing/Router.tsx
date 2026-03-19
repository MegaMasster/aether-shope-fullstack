import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense , lazy} from "react";

import { ROUTES } from "@/app/routing/routes";
import { SuspenseLoader } from "@/shared/ui";

const HomePage = lazy(() => import("@/pages/home"));
const FavoritesProductsPage = lazy(() => import("@/pages/favorites"));

export const AppRouter = () => {
    return (
        <Suspense fallback={<SuspenseLoader/>}>
            <BrowserRouter>
                <Routes>

                    <Route path={ROUTES.HOME} element={ <HomePage/> } />

                    <Route path={ROUTES.PROFILE} element={ <HomePage/> } />

                    <Route path={ROUTES.FAVORITES} element={ <FavoritesProductsPage/> } />

                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}


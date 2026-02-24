import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense , lazy} from "react";

import { ROUTES } from "@/app/routing/routes"

const HomePage = lazy(() => import("@/pages/home"))

export const AppRouter = () => {
    return (
        <Suspense fallback={<div></div>}>
            <BrowserRouter>
                <Routes>

                    <Route path={ROUTES.HOME} element={ <HomePage/> } />

                    <Route path={ROUTES.PROFILE} element={ <HomePage/> } />

                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}


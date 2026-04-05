import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header"; 

export const BaseLayout = () => {
    return (
        <div className="flex flex-col items-center">

            <Header />

            <main className="w-full">
                <Outlet /> 
            </main>
            
        </div>
    );
};
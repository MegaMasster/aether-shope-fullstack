import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppRouter } from "@/app/routing/Router";
import { queryClient } from "@/app/providers/query-client";

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
import { RootLayout } from "./layout/RootLayout";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SearchPage } from "./page/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritePage } from "./page/FavoritePage";

const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            {
                path: "/",
                Component: SearchPage,
            },
            {
                path: "/favorites",
                Component: FavoritePage,
            },
        ],
    },
]);

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;

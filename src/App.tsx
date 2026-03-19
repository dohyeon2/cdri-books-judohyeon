import { RootLayout } from "./layout/RootLayout";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SearchPage } from "./page/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
                Component: () => <div>favorites placeholder</div>,
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

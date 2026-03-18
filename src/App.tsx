import { RootLayout } from "./layout/RootLayout";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SearchPage } from "./page/SearchPage";

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
    return <RouterProvider router={router} />;
}

export default App;

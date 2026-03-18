import { RootLayout } from "./layout/RootLayout";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            {
                path: "/",
                Component: () => <div>root placeholder</div>,
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import { RoutesGenres } from "./RoutesGenres";
import { RoutesProducts } from "./RoutesProducts";
import { ErrorPage } from "../components/Extras/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      ...RoutesGenres,
      ...RoutesProducts,
    ]
  },
]);

export const RouterProvider_ = () => <RouterProvider router={router} />;
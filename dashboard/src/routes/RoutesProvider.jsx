import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import { RoutesCharts } from "./RoutesCharts";
import { RoutesCategories } from "./RoutesCategories";
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
      ...RoutesCharts,
      ...RoutesCategories,
      ...RoutesProducts,
    ]
  },
]);

export const RouterProvider_ = () => <RouterProvider router={router} />;
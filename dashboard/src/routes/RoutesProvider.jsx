import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import { RoutesCategories } from "./RoutesCategories";
import { RoutesProducts } from "./RoutesProducts";
import { ErrorPage } from "../components/Extras/ErrorPage";
import { RoutesSubcategories } from "./RoutesSubcategories";
import { RoutesUsers } from "./RoutesUsers";
import { RoutesOrders } from "./RoutesOrders";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "*",
        element: <ErrorPage />
      },
      ...RoutesCategories,
      ...RoutesSubcategories,
      ...RoutesProducts,
      ...RoutesUsers,
      ...RoutesOrders
    ]
  },
]);

export const RouterProvider_ = () => <RouterProvider router={router} />;
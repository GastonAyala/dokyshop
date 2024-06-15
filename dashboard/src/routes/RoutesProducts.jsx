import ContentRowProducts from "../components/Products/ContentRowProducts";
import Product from "../pages/Products";
import Users from "../pages/Users";

export const RoutesProducts = [
    {
        path: "/usuarios",
        element: <Users />
    },
    {
        path: "/contentRowProducts",
        element: <ContentRowProducts />
    },
    {
        path: "/productos",
        element: <Product/>
    }
]
import ContentRowProducts from "../components/Products/ContentRowProducts";
import LastProductInDb from "../components/Products/LastProductInDb";
import Product from "../pages/Products";
import Users from "../pages/Users";

export const RoutesProducts = [
    {
        path: "/productos/ultimo",
        element: <LastProductInDb />
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
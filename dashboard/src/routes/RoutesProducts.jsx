import ContentRowProducts from "../components/Products/ContentRowProducts";
import LastMovieInDb from "../components/Products/LastProductInDb";
import Product from "../pages/Products";

export const RoutesProducts = [
    {
        path: "/Products/last",
        element: <LastMovieInDb />
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
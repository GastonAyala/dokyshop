import ContentRowProducts from "../components/Products/ContentRowProducts";
import LastMovieInDb from "../components/Products/LastProductInDb";

export const RoutesProducts = [
    {
        path: "/Products/last",
        element: <LastMovieInDb />
    },
    {
        path: "/contentRowProducts",
        element: <ContentRowProducts />
    }
]
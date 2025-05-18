import ContentRowProducts from "../components/Products/ContentRowProducts";
import LastProductInDb from "../components/Products/LastProductInDb";
import Product from "../pages/Products";

export const RoutesProducts = [
  {
    path: "/dashboard/productos/ultimo",
    element: <LastProductInDb />,
  },
  {
    path: "/dashboard/contentRowProducts",
    element: <ContentRowProducts />,
  },
  {
    path: "/dashboard/productos",
    element: <Product />,
  },
];
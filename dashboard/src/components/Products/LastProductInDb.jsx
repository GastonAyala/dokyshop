import { useEffect, useState } from "react";
import { Spinner } from "../reusable/Spinner";
import { Alert } from "../reusable/Alert";
import { API_HOST } from "../../environment";

export const LastProductInDb = () => {
  const [lastProduct, setLastProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLastProduct = async () => {
      try {
        const endpoint = `${API_HOST}/api/query?q=SELECT * FROM products WHERE createdAt = (SELECT MAX(createdAt) FROM products) LIMIT 1`;
          
        const {
          ok,
          data: [product],
        } = await fetch(endpoint).then((res) => res.json());

        ok && setLastProduct(product);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(
          error.message
        );
      }
    };

    getLastProduct();
  }, [])


  return (
    <div className={`col-lg-6 text-center `}>
      {!loading ?
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Último producto creado
            </h5>
          </div>
          <div className="card-body">
            <h5 className="m-0 font-weight-bold text-gray-800">
              {lastProduct.title}
            </h5>
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: "250px" }}
                src={`${API_HOST}/api/products/${lastProduct.imagePrincipal}`}
                alt="Imagen de producto"
              />
            </div>
            <p>
              {lastProduct.description}
            </p>
            <a className="btn btn-outline-primary" target="_blank" rel="nofollow" href={`${API_HOST}/productos/detalle/${lastProduct.id}`}>
              Ver más
            </a>
          </div>
        </div>
        : <Spinner containerClassName={"m-auto"} />}
      {error && <Alert message={error} />}
    </div>
  );
};

export default LastProductInDb;

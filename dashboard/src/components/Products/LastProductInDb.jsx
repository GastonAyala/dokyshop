import React, { useEffect, useState } from "react";


export const LastProductInDb = () => {
  const [lastProduct, setLastProduct] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError ] = useState("")
  useEffect(()=>{
    const  getLastProduct = async () => {
    try {
      const endpoint =
        "http://localhost:3030/api/query?q=SELECT * FROM products WHERE createdAt = (SELECT MAX(createdAt) FROM products) LIMIT 1";
      const {
        ok,
        data: [product],
      } = await fetch(endpoint).then((res) => res.json());

      ok && setLastProduct(product);

      setTimeout(() => {
        setLoading({
          ...loading,
          lastProduct: false,
        });
      }, 2000);
    } catch (error) {
      setError(
        error.message
      );
    }
  };

  getLastProduct();
  console.log(lastProduct)
  }, [])
  

  return (
    <div className={`col-lg-6 `}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            {lastProduct.title}
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: 35 + "rem"}}
              src={`http://localhost:3030/api/products/${lastProduct.imagePrincipal}`}
              alt=" Star Wars - Mandalorian "
            />
          </div>
          <p>
          {lastProduct.description}
          </p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href={`http://localhost:3030/productos/detalle/${lastProduct.id}`}>
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};
export default LastProductInDb;

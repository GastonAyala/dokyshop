import React, { useEffect, useState } from "react";
import { Spinner } from '../reusable/Spinner';
import { useLocation } from 'react-router-dom';
import { Alert } from "../reusable/Alert";
import { PanelCard } from "../reusable/PanelCard";

export const ListCategories = () => {
  // useLocation
  const { pathname } = useLocation();

  // useState
  const [styleClass, setStyleClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [stateCategories, setStateCategories] = useState({
    categories: [],
    count: [],
    error: "",
  });

  // useEffect
  useEffect(() => pathname === "/categorias" ? setStyleClass("m-auto w-75") : setStyleClass("mb-4"), []);

  useEffect(() => {
    const endpoint = "http://localhost:3030/api/categories";

    const getCategories = async () => {
      try {
        const { ok, countByCategory = [], data = [], msg = null, } = await fetch(endpoint).then(res => res.json());

        if (!ok) throw new Error(msg);

        ok && setStateCategories({
          ...stateCategories,
          categories: data,
          count: countByCategory,
        });

        setTimeout(() => setLoading(false), 1000);

      } catch (error) {
        setStateCategories({
          ...stateCategories,
          error: error.message,
        });
      }
    };

    getCategories();
  }, []);

  return (
    <div className={`col-lg-6 text-center ${styleClass}`}>
      {!loading ? <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800 text-left" style={{ fontSize: "calc(0.94756rem + 0.3vw)" }}>
            Categorías
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {stateCategories.categories.map((c, i) => (
              stateCategories.count.map((countByCat, i) => countByCat.name === c.name ? <PanelCard key={i} {...c} countBy={countByCat.count} /> : "")
            ))}
          </div>
        </div>
      </div>
        : <Spinner containerClassName={"my-5"} />
      }
      {stateCategories.error && <Alert message={stateCategories.error} />}
    </div>
  );
}

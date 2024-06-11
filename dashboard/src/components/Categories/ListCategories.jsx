import React, { useEffect, useState } from "react";
import { Spinner } from '../reusable/Spinner';
import { useLocation } from 'react-router-dom';
import { Alert } from "../reusable/Alert";
import { PanelCard } from "../reusable/PanelCard";

export const ListCategories = () => {
  // useLocation
  const { pathname } = useLocation();

  // useState
  const [styleClass, setStyleClass] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [stateCategories, setStatesCategories] = useState({
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

        ok && setStatesCategories({
          ...stateCategories,
          categories: data,
          count: countByCategory,
        });

        setTimeout(() => setLoading(false), 1100);

      } catch (error) {
        setStatesCategories({
          ...stateCategories,
          error: error.message,
        });
      }
    };

    getCategories()
  }, []);

  return (
    <div className={`text-center ${styleClass}`}>
      {!loading ? <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800 text-left">
            Categorías
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {stateCategories.categories.map((c, i) => (
              stateCategories.count.map((countByCat, i) => countByCat.name === c.name ? <PanelCard key={i} {...c} countByCat={countByCat.count} /> : "")
            ))}
          </div>
        </div>
      </div>
        : <Spinner />
      }
      {stateCategories.error && <Alert message={stateCategories.error} />}
    </div>
  );
}

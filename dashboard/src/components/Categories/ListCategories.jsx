import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { useLocation } from 'react-router-dom'
export const ListCategories = () => {
  const [margin, setMargin] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [countByCategory, setCountByCategory] = useState([]);
  const {pathname} = useLocation()

  useEffect(() => {
    pathname === "/categories" ? setMargin("m-auto") : setMargin("mb-4")

    const getCategory = async () => {
      const endpoint = "http://localhost:3030/api/categories";
      const { ok, countByCategory, data } = await fetch(endpoint).then(res => res.json());
  
      ok && setCategories(data) & setCountByCategory(countByCategory);
    };

    getCategory()
  }, []);

  return (
    <div className={`col-lg-6 ${margin}`}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorías
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categories.map((c, i) => (
              countByCategory.map((countByCat, i) => countByCat.name === c.name ? <CategoryCard key={i} {...c} countByCat={countByCat.count}/> : "" )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

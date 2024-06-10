import React from 'react'

const CategoryCard = ({ id, name, products, countByCat  }) => {
    return (
        <>
            <div key={id} className="col-lg-6 mb-4">
                <div className="card bg-dark text-white shadow">
                    <div className="card-body d-flex justify-content-around">
                        <span>{name}</span>
                        <span>{countByCat}</span>
                        {/* {countByCategory.map(countByCat => countByCat.name === c.name ? <span key={c.name}>{countByCat.count}</span> : '')} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCard
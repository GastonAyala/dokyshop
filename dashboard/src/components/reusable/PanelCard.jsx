import React from 'react'

export const PanelCard = ({ id, name, products, countByCat }) => {
    return (
        <div key={id} className="col-lg-4 mb-4 p-2">
            <div className="card bg-dark text-white shadow">
                <div className="card-body d-flex justify-content-around">
                    <span>{name}</span>
                    <span>{countByCat}</span>
                </div>
            </div>
        </div>
    )
}

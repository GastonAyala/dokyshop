import React from 'react'

export const PanelCard = ({ id, name, products, countBy }) => {
    return (
        <div key={id} className="col-lg-4 mb-4 p-2">
            <div className="card bg-dark text-white shadow">
                <div className="card-body d-flex flex-wrap">
                    <span className='w-100 mb-1' style={{ fontSize: "calc(0.53rem + 0.6vw)"}}>{name}</span>
                    <span className='w-100'>{countBy}</span>
                </div>
            </div>
        </div>
    )
}

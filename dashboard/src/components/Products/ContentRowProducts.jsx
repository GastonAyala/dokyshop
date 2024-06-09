import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Products in DB --> */

let ProductsInDB = {
    title: 'Products in Data Base',
    color: 'primary',
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title: ' Total awards',
    color: 'success',
    cuantity: '79',
    icon: 'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title: 'Actors quantity',
    color: 'warning',
    cuantity: '49',
    icon: 'fa-user-check'
}

let cartProps = [ProductsInDB, totalAwards, actorsQuantity];

function ContentRowProducts() {
    return (

        <div className="row">

            {cartProps.map((movie, i) => {

                return <SmallCard {...movie} key={i} />

            })}

        </div>
    )
}

export default ContentRowProducts;
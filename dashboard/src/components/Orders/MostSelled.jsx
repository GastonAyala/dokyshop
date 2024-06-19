import React, { useEffect, useState } from 'react';
import { Spinner } from '../reusable/Spinner';
import { Alert } from '../reusable/Alert';


export const MostSelled = () => {
    const [orders, setOrders] = useState([]);
    const [mostSaled, setMostSaled] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stateError, setStateError] = useState("");

    useEffect(() => {
        const getCompletedOrders = async () => {
            const endpoint = 'http://localhost:3030/api/order/completed';
            try {
                const { ok, data = [], msg = null } = await fetch(endpoint).then(res => res.json());

                if (!ok) throw new Error(msg);

                ok && setOrders(data);

                setTimeout(() => setLoading(false), 1300);
                
            } catch (error) {
                setStateError(error.message)
            }
        };

        getCompletedOrders();
    }, [])

    useEffect(() => {
        let products = [];
        orders.map(o => {
            products = [...products, ...o.products];
        })
        setMostSaled(products);

    }, [orders]);

    return (
        <div className={`text-center`}>
            {!loading ? <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800 text-left" style={{ fontSize: "calc(0.94756rem + 0.3vw)" }}>
                        Productos más vendidos
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        {mostSaled.map((p, i) => {
                            return <div key={i} className="col-lg-4 mb-4 p-2">
                                <div className="card bg-dark text-white shadow">
                                    <div className="card-body">
                                        <a href={`http://localhost:3030/productos/detalle/${p.id}`}>
                                            <span className='w-100 mb-1' style={{color: "white" }}>{p.title.substring(0, 35)}{p.title.length > 35 ? "..." : null}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div> : <Spinner containerClassName={"my-5"} />}
            {stateError && <Alert message={stateError} />}
        </div>
    )
}

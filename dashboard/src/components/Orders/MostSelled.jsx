import { useEffect, useState } from 'react';
import { Spinner } from '../reusable/Spinner';
import { Alert } from '../reusable/Alert';


export const MostSelled = () => {
    const [mostSaled, setMostSaled] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stateError, setStateError] = useState("");

    useEffect(() => {
        const getMostSelled = async () => {
            const endpoint = `/api/query?q=SELECT p.id, p.title, SUM(op.quantity) "totalSales" FROM dokyshop.orders o  INNER JOIN dokyshop.orderproducts op  ON o.id = op.orderId  INNER JOIN dokyshop.products p  ON op.productId = p.id WHERE o.state = "completed" GROUP BY p.id, p.title ORDER BY SUM(op.quantity) DESC LIMIT 5;`;
            
            try {
                const { ok, data = [], msg = null } = await fetch(endpoint).then(res => res.json());
                if (!ok) throw new Error(msg);

                ok && setMostSaled(data);
                setTimeout(() => setLoading(false), 1300);
            } catch (error) {
                setStateError(error.message)
            }
        };

        getMostSelled();
    }, []);

    return (
        <div className={`col-lg-6 text-center`}>
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
                                    <div style={{ backgroundColor:'#407FB9', fontWeight:'500'}} className="card-body d-flex flex-wrap justify-content-center">
                                        <a href={`/productos/detalle/${p.id}`}>
                                            <span className='w-100 mb-1' style={{ color: "WHITE" }}>{p.title.substring(0, 35)}{p.title.length > 35 ? "..." : null}</span>
                                        </a>
                                            <span className='w-100 m-auto'>{p.totalSales}</span>
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

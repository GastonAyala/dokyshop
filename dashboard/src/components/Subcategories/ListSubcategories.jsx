import React, { useEffect, useState } from 'react'
import { PanelCard } from '../reusable/PanelCard'
import { Spinner } from '../reusable/Spinner'
import { Alert } from '../reusable/Alert'
import { useLocation } from 'react-router-dom'

export const ListSubcategories = () => {
    // useLocation
    const { pathname } = useLocation();

    // useState
    const [styleClass, setStyleClass] = useState('');
    const [loading, setLoading] = useState(true);
    const [stateSubcategories, setStateSubcategories] = useState({
        subcategories: [],
        count: [],
        error: '',
    });

    // useEffect
    useEffect(() => pathname === '/subcategorias' ? setStyleClass('m-auto w-75') : setStyleClass('mb-4'));

    useEffect(() => {
        const endpoint = 'http://localhost:3030/api/subcategories';

        const getSubcategories = async () => {
            try {
                const { ok, countBySubcategory = [], data = [], msg = null } = await fetch(endpoint).then(res => res.json());

                if (!ok) throw new Error(msg);

                ok && setStateSubcategories({
                    ...stateSubcategories,
                    subcategories: data,
                    count: countBySubcategory,
                });

                setTimeout(() => setLoading(false), 1200);

            } catch (error) {
                setStateSubcategories({
                    ...stateSubcategories,
                    error: error.message,
                });
            }
        };

        getSubcategories();
    }, []);

    return (
        <div className={`col-lg-6 text-center ${styleClass}`}>
            {!loading ? <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h5 className='m-0 font-weight-bold text-gray-800 text-left' style={{ fontSize: "calc(0.94756rem + 0.3vw)" }}>
                        Subcategorías
                    </h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        {stateSubcategories.subcategories.map((c, i) => (
                            stateSubcategories.count.map((countBySubcat, i) => countBySubcat.name === c.name ? <PanelCard key={i} {...c} countBy={countBySubcat.count} /> : '')
                        ))}
                    </div>
                </div>
            </div>
                : <Spinner containerClassName={"my-5"} />
            }
            {stateSubcategories.error && <Alert message={stateSubcategories.error} />}
        </div>
    )
};

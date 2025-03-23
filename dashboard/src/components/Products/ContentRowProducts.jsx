import { useEffect, useState } from 'react';
import SmallCard from './SmallCard';
import { Spinner } from '../reusable/Spinner';
import { Alert } from '../reusable/Alert';
import { API_HOST } from '../../environment';

function ContentRowProducts() {
    const [stateMetrics, setStateMetrics] = useState({
        metrics: [],
        error: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endpoint = `${API_HOST}/api/metrics`;
        const getMetrics = async () => {
            try {
                const { ok, data = [], msg = null } = await fetch(endpoint).then(res => res.json());

                if (!ok) throw new Error(msg);

                ok && setStateMetrics({
                    ...stateMetrics,
                    metrics: data
                });

                setTimeout(() => setLoading(false), 800);

            } catch (error) {
                setStateMetrics({
                    ...stateMetrics,
                    error: error.message
                });
            }
        };

        getMetrics();
    }, [])

    return (
        <div className="row">
            {
                !loading ? stateMetrics.metrics.map((metric, i) => {
                    return <SmallCard {...metric} key={i} />
                }) : <Spinner containerClassName={'d-flex m-auto'} />
            }
            {stateMetrics.error && <Alert message={stateMetrics.error} />}
        </div>
    )
}

export default ContentRowProducts;
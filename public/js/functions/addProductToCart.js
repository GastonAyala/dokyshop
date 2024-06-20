const addProductCart = async (id) => {
    try {
        const { ok, msg } = await fetch(`/api/order/add/${id}`, {
            method: "PATCH"
        }).then(res => res.json());

    } catch (error) {
        console.error(error.message);
    }
};
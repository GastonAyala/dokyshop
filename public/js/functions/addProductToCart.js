const addProductCart = async (id) => {
    const goToCart = () => {
        window.location.href = "/carrito-compra"
    }
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": goToCart,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    try {
        const { ok, msg } = await fetch(`/api/order/add/${id}`, {
            method: "PATCH"
        }).then(res => res.json());

        ok && 
        toastr["success"]("Producto agregado al carrito con éxito");
        if(!ok) throw Error("Debes iniciar sesión para agregar productos al carrito")
    } catch (error) {
        console.error(error.message);
        toastr["error"](error.message);
    }
};
const addProductCart = async (id) => {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
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
    } catch (error) {
        console.error(error.message);
        toastr["error"]("Ops... algo ha salido mal 😥");
    }
};
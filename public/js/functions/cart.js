const $ = (element) => document.querySelector(element);
const server = process.env.SERVER_HOST
let productsCart = [];

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const converMoneyArg = (num = 0) => num.toLocaleString({
    currency: "ARS",
    style: "currency"
})

const getShoppingCart = async (server) => fetch(`${server}/api/order`).then(res => res.json());

const getCardStructure = (p) => {
    return `<div class="producto">
            <figure>
              <img src=${p.imagePrincipal} alt="foto producto" />
            </figure>
            <div class="info-container">
              <button onclick="removeProductCart(${p.id})" class="close-button fs-5 p-0 border-0 bg-transparent text-danger">
                <i class="rounded-circle btn-clear far fa-times-circle"></i>
              </button>
              <h5>${p.title}</h5>
              <p class="precio">$${converMoneyArg(p.price - (p.price * p.sale / 100))}</p>
              <p class="descuento">${p.sale}% OFF</p>
              <div class="d-flex align-items-center quantity-container">
              <button onclick="lessProduct(${p.id})" class="btn">-</button>
              <output class="quantity form-control form-control-sm text-center">${p.orderproducts.quantity}</output>
              <button onclick="moreProduct(${p.id})" class="btn">+</button>
              </div>
              <p class="subtotal">Subtotal:
              <span>$${converMoneyArg((p.price - (p.price * p.sale / 100)) * p.orderproducts.quantity)} </span>
              </p>
              <a href="/productos/detalle/${p.id}" class="btn viewMore">Ver más</a>
              </div>
        </div>`
};

const printCartsInView = (products = [], elementContainerProducts) => {
    elementContainerProducts.innerHTML = "";
    products.forEach((product) => {
        elementContainerProducts.innerHTML += getCardStructure(product);
    });
};

const processReloadCart = async (containerProducts, ouputTotal) => {
    const { ok, data: { total, products } } = await getShoppingCart(server);
    ok && (productsCart = products);
    printCartsInView(productsCart, containerProducts);
    ouputTotal.innerHTML = converMoneyArg(+total)
}

window.addEventListener("load", async (e) => {
    const containerProducts = $(".contenedor-pro");
    const btnClearCart = $("#clear-cart");
    const btnBuy = $("#btn-buy");
    const ouputTotal = $("#show-total");

    try {
        processReloadCart(containerProducts, ouputTotal);
    } catch (error) {
        console.error(error.message);
        toastr["error"]("Ops... algo ha salido mal 😥");
    }

    btnClearCart.addEventListener('click', async () => {
        try {
            const { ok, msg } = await fetch(`/api/order/clear/`, {
                method: "PATCH"
            }).then(res => res.json());

            ok && processReloadCart(containerProducts, ouputTotal);
            ok && toastr["success"]("El carrito fue vaciado con éxito");
        } catch (error) {
            console.error(error.message);
            toastr["error"]("Ops... algo ha salido mal 😥");
        }
    });

    btnBuy.addEventListener('click', async () => {
        try {
            const { ok, msg } = await fetch(`/api/order/complete/`, {
                method: "PATCH"
            }).then(res => res.json());

            ok && processReloadCart(containerProducts, ouputTotal);
            ok && toastr["success"]("La compra fue realizada con éxito");
            setTimeout(() => {
                location.href = "/"    
            }, 3000);
        } catch (error) {
            console.error(error.message);
            toastr["error"]("Ops... algo ha salido mal 😥");
        }
    });

});

const lessProduct = async (id) => {
    const containerProducts = $(".contenedor-pro");
    const ouputTotal = $("#show-total");
    try {
        const { ok, msg } = await fetch(`/api/order/less/${id}`, {
            method: "PATCH"
        }).then(res => res.json());

        ok && processReloadCart(containerProducts, ouputTotal);
    } catch (error) {
        console.error(error.message);
        toastr["error"]("Ops... algo ha salido mal 😥");
    }
};

const moreProduct = async (id) => {
    const containerProducts = $(".contenedor-pro");
    const ouputTotal = $("#show-total");
    try {
        const { ok, msg } = await fetch(`/api/order/more/${id}`, {
            method: "PATCH"
        }).then(res => res.json());

        ok && processReloadCart(containerProducts, ouputTotal);
    } catch (error) {
        console.error(error.message);
        toastr["error"]("Ops... algo ha salido mal 😥");
    }
};

const removeProductCart = async (id) => {
    const containerProducts = $(".contenedor-pro");
    const ouputTotal = $("#show-total");
    try {
        const { ok, msg } = await fetch(`/api/order/remove/${id}`, {
            method: "PATCH"
        }).then(res => res.json());

        ok && processReloadCart(containerProducts, ouputTotal);
    } catch (error) {
        console.error(error.message);
        toastr["error"]("Ops... algo ha salido mal 😥");
    }
};
const $ = (element) => document.querySelector(element);
const server = `http://localhost:3030`;
let productsCart = [];

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
              <p class="precio">$${toThousand(p.price)}</p>
              <div class="d-flex align-items-center quantity-container">
                <button onclick="lessProduct(${p.id})" class="btn btn-warning">-</button>
                <output class="quantity form-control form-control-sm text-center">${p.orderproducts.quantity}</output>
                <button onclick="moreProduct(${p.id})" class="btn btn-warning">+</button>
              </div>
              <a href="/productos/detalle/${p.id}" class="btn btn-warning viewMore">Ver más</a>
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
    }

    btnClearCart.addEventListener('click', async () => {
        try {
            const { ok, msg } = await fetch(`/api/order/clear/`, {
                method: "PATCH"
            }).then(res => res.json());

            ok && processReloadCart(containerProducts);
            ouputTotal.innerHTML = 0
        } catch (error) {
            console.error(error.message);
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
    }
};

const removeProductCart = async (id) => {

};
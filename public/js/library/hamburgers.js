var forEach = function (t, o, r) { if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t) };

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("is-active");
            
           

            var nav = document.querySelector("#navigation");
            const userNav = document.querySelector("#user-nav");
            const mainList = document.querySelector("#main-list");
            const cart = document.querySelector('#buy-cart');

            nav.classList.toggle("active");
            userNav.classList.toggle("active");
            mainList.classList.toggle("active");
            cart.classList.toggle("active");
        }, false);
    });
}
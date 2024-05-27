const element = document.querySelector('#dot');
const dot = document.querySelector("#hidden");
window.addEventListener('load', function(){
    element.style.display = 'none'
    dot.classList.toggle("hidden");
})
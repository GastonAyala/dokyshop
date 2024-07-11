window.addEventListener('load', function(e) {
    const email = document.querySelector('#newsletterEmail');
    const form = document.querySelector('form');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const invalid = (elementErr, msgErr, elementInput) => {
        elementErr.innerHTML = msgErr;
        elementErr.style.position = "unset";
        elementErr.style.width = "182px";
        elementErr.classList.add("invalid-tooltip");
        elementInput.classList.add("is-invalid");
    };

    const valid = (elementErr, elementInput) => {
        elementErr.innerHTML = null;
        elementInput.classList.add("is-valid");
        elementErr.classList.remove("invalid-tooltip");
        elementInput.classList.remove("is-invalid");
    };

    const remove = (elementErr, elementInput) => {
        elementInput.classList.remove("is-valid");
        elementErr.classList.remove('invalid-tooltip');
        elementErr.innerHTML = null;
    };

    const focus = (elementErr, elementInput,) => {
        elementInput.addEventListener('focus', function (e) {
            remove(elementErr, this);
        });
    }

    let existEmailError = false;
    const errEmail = document.querySelector('.err-email');
    email.addEventListener('keyup', function(e) {
        const value = this.value.trim();
        switch (true) {
            case !emailRegex.test(value):
                invalid(errEmail, 'El correo no es valido', this);
                existEmailError = true;
                break;
            default:
                valid(errEmail, this);
                existEmailError = false;
                break;
        }
    })

    focus(errEmail, email);

    form.addEventListener('submit', function(e) {
        if (existEmailError) {
            e.preventDefault();
            errEmail.innerHTML = 'El correo no es valido';
            errEmail.classList.add("alert", "alert-danger");
            return;
        }
    })
})
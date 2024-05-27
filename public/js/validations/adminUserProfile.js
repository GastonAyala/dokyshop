window.addEventListener("load", function () {
    const avatar = document.querySelector("#avatar");
    const name = document.querySelector("#name");
    const role = document.querySelector("#role");
    const errGeneral = document.querySelector(".err-form-general");

    const regexAlpha = /^[A-Za-z ]+$/;

    const invalid = (elementErr, msgErr, elementInput) => {
        elementErr.innerHTML = msgErr;
        elementErr.style.position = "unset";
        elementErr.style.width = '100%';
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

    // value numero ROLE

    // VALIDATION INPUT AVATAR
    let existsAvatarErr = false;
    const errAvatar = document.querySelector(".errAvatar");
    avatar.addEventListener("change", function (e) {
        const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
        const files = Array.from(this.files);
        switch (true) {
            case files.length > 1:
                invalid(errAvatar, "No puedes ingresar más de una imagen", this);
                existsAvatarErr = true;
                break;
            case !regExpFiles.test(files[0].name):
                invalid(errAvatar, "El formato de la imagen de perfil es inválido. formatos sopórtados: .png, .jpg, .jpeg, .webp, .gif", this);
                existsAvatarErr = true;
                break;
            default:
                valid(errAvatar, this);
                existsAvatarErr = false;
                break;
        }
    });

    focus(errAvatar, avatar);

    // VALIDATION INPUT NAME
    let existsNameErr = false;
    const errName = document.querySelector(".errName");
    name.addEventListener("blur", function (e) {
        const value = this.value.trim();
        switch (true) {
            case !regexAlpha.test(value):
                invalid(errName, "El campo no permite números ni caracteres especiales", this);
                existsNameErr = true;
                break;
            case value.length < 5 || value.length > 50:
                invalid(errName, "Debe tener un mínimo de 5 y máximo de 50 caracteres", this);
                existsNameErr = true;
                break;
            default:
                valid(errName, this);
                existsNameErr = false;
                break;
        }
    });

    focus(errName, name);

    // VALIDATION INPUT ROLE
    let existsRoleErr = false;
    const errRole = document.querySelector(".errRole");
    role.addEventListener("blur", function (e) {
        const value = this.value.trim();
        switch (true) {
            case isNaN(value):
                invalid(errRole, "El valor debe ser numérico", this);
                existsRoleErr = true;
                break;
            case value < 0:
                invalid(errRole, "El valor debe ser numérico positivo", this);
                existsRoleErr = true;
                break;
            default:
                valid(errRole, this);
                existsRoleErr = false;
                break;
        }
    });

    focus(errRole, role);
    
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        if (existsAvatarErr || existsNameErr || existsRoleErr) {
            e.preventDefault();
            errGeneral.innerHTML = "Corrija los errores antes de enviar el formulario";
            errGeneral.classList.add("alert", "alert-danger");
            return;
        }
    });
});
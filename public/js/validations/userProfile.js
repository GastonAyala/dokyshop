window.addEventListener('load', async function () {
    const avatar = document.querySelector('#avatar');
    const name = document.querySelector('#name');
    const phone = document.querySelector('#phone');
    const street = document.querySelector('#street');
    const selectProvince = document.querySelector('#province');
    const selectCity = document.querySelector('#city');
    const zipcode = document.querySelector('#zipcode');
    const errGeneral = document.querySelector('.err-form-general');

    const regexAlpha = /^[A-Za-z ]+$/;
    const regexAlphanumeric = /[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s,.]/;

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

    // VALIDATION INPUT AVATAR
    let existsAvatarErr = false;
    const errAvatar = document.querySelector('.errAvatar');
    avatar.addEventListener('change', function (e) {
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

    // VALIDATION INPUT NAME
    let existsNameErr = false;
    const errName = document.querySelector('.errName');
    name.addEventListener('blur', function (e) {
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

    // VALIDATION INPUT PHONE
    let existsPhoneErr = false;
    const errPhone = document.querySelector('.errPhone');
    phone.addEventListener('blur', function (e) {
        const value = this.value.trim()
        switch (true) {
            case isNaN(value):
                invalid(errPhone, "El valor debe ser numérico", this);
                existsPhoneErr = true;
                break;
            case value < 0:
                invalid(errPhone, "El valor debe ser numérico positivo", this);
                existsPhoneErr = true;
                break;
            case value.length < 10 || value.length > 13:
                invalid(errPhone, "La longitud debe ser de mínimo 10 y máximo 13 numéros", this);
                existsPhoneErr = true;
                break;
            default:
                valid(errPhone, this);
                existsPhoneErr = false;
                break;
        }
    });

    focus(errPhone, phone);

    // VALIDATION INPUT STREET
    let existsStreetErr = false;
    const errStreet = document.querySelector('.errStreet');
    street.addEventListener('blur', function (e) {
        const value = this.value.trim()
        switch (true) {
            case regexAlphanumeric.test(value):
                invalid(errStreet, "El valor debe ser alfanumérico", this);
                existsStreetErr = true;
                break;
            case value.length < 5 || value.length > 50:
                invalid(errStreet, "La dirección debe tener un mínimo de 5 y máximo de 50 caracteres", this);
                existsStreetErr = true;
                break;
            default:
                valid(errStreet, this);
                existsStreetErr = false;
                break;
        }
    });
    focus(errStreet, street);

    // VALIDATION INPUT ZIPCODE
    let existsZipcodeErr = false;
    const errZipcode = document.querySelector('.errZipcode');
    zipcode.addEventListener('blur', function (e) {
        const value = this.value.trim()
        switch (true) {
            case isNaN(value):
                invalid(errZipcode, "El valor debe ser numérico", this);
                existsZipcodeErr = true;
                break;
            case value < 0:
                invalid(errZipcode, "El valor debe ser numérico positivo", this);
                existsZipcodeErr = true;
                break;
            case value.length < 4 || value.length > 4:
                invalid(errZipcode, "La longitud debe ser de 4 numéros", this);
                existsZipcodeErr = true;
                break;
            default:
                valid(errZipcode, this);
                existsZipcodeErr = false;
                break;
        }
    });

    focus(errZipcode, zipcode);

    // VALIDATION INPUT PROVINCE
    let existsProvinceErr = false;
    const errProvince = document.querySelector('.errProvince');
    selectProvince.addEventListener('blur', function (e) {
        const value = this.value
        switch (true) {
            case regexAlphanumeric.test(value):
                invalid(errProvince, "El valor debe ser alfanumérico", this);
                existsProvinceErr = true;
                break;
            case value.length < 5 || value.length > 100:
                invalid(errProvince, "El nombre de la provincia debe tener un mínimo de 5 y máximo de 100 caracteres", this);
                existsProvinceErr = true;
                break;
            default:
                valid(errProvince, this);
                existsProvinceErr = false;
                break;
        }
    });

    focus(errProvince, selectProvince);

    // VALIDATION INPUT CITY
    let existsCityErr = false;
    const errCity = document.querySelector('.errCity');
    selectCity.addEventListener('blur', function (e) {
        const value = this.value.trim()
        switch (true) {
            case regexAlphanumeric.test(value):
                invalid(errCity, "El valor debe ser alfanumérico", this);
                existsCityErr = true;
                break;
            case value.length < 5 || value.length > 100:
                invalid(errCity, "El nombre de la ciudad debe tener un mínimo de 5 y máximo de 100 caracteres", this);
                existsCityErr = true;
                break;
            default:
                valid(errCity, this);
                existsCityErr = false;
                break;
        }
    });

    focus(errCity, selectCity);

    // FORM PREVENT DEFAULT
    const form = document.querySelector('.form');
    form.addEventListener('submit', function(e) {
        if (existsAvatarErr || existsNameErr || existsPhoneErr || existsStreetErr || existsZipcodeErr || existsProvinceErr || existsCityErr) {
            e.preventDefault();
            errGeneral.innerHTML = 'Corrija los errores antes de enviar el formulario';
            errGeneral.classList.add("alert", "alert-danger");
            return;
        }
    })

    // PROVINCES AND CITIES API FUNCTIONALITY
    if (!selectProvince.options[selectProvince.selectedIndex].value) {
        selectCity.disabled = true;   
    }
    
    const getOption = ({ nombre }) => `<option value="${nombre}">${nombre}</option>`;
    
    const orderData = (a, b, keyData) => {
        return a[keyData].localeCompare(b[keyData], 'es', { sensitivity: 'base' });
    };
    
    const insertOptions = (data, elementSelect, sortKeyName) => {
        data
        .sort((a, b) => orderData(a, b, sortKeyName))
        .forEach((d) => {
            elementSelect.innerHTML += getOption(d);
        });
    };
    
    const { provincias } = await (await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')).json();
    insertOptions(provincias, selectProvince, "nombre");

    const citySelectInsertOptions = async (provinceSelected) => {
        const { municipios } = await (await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceSelected}&campos=id,nombre&max=1000`)).json();
        insertOptions(municipios, selectCity, "nombre");
    };

    if (selectCity.options[selectCity.selectedIndex].value) {
        const provinceSelected = selectProvince.options[selectProvince.selectedIndex].value;
        citySelectInsertOptions(provinceSelected);
    }

    selectProvince.addEventListener('change', async function () {
        selectCity.innerHTML = '<option value="" selected hidden>Seleccionar ciudad</option>';
        const provinceSelected = this.options[this.selectedIndex].value;
        citySelectInsertOptions(provinceSelected);
        selectCity.disabled = false;
    });
    // END PROVINCES AND CITIES API FUNCTIONALITY
});
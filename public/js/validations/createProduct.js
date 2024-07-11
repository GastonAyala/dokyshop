window.addEventListener('load', () => {
    const imgPrimary = document.querySelector("#imagePrimary");
    const imgSecondary = document.querySelector("#imagesSecondary");
    const title = document.querySelector("#title");
    const category = document.querySelector('#category');
    const subcategory = document.querySelector('#subcategory');
    const description = document.querySelector('#description');
    const price = document.querySelector('#price');
    const sale = document.querySelector('#sale');
    const quantity = document.querySelector('#quantity');
    const color = document.querySelector('#color');

    const exRegAlfanumeric = /[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s,.]/;

    let existImgPrima = true;
    let existImgSecon = false;
    let existTitleError = true;
    let existCateError = true;
    let existSubcaError = true;
    let existDescripError = true;
    let existPriceError = true;
    let existSaleError = false;
    let existQuanError = true;
    let existColorError = true;


    const invalid = (elemErr, msgErr, elemInput) => {
        elemErr.innerHTML = msgErr;
        elemErr.style.position = 'unset';
        elemErr.classList.add('invalid-tooltip');
        elemInput.classList.add('is-invalid');
    };

    const valid = (elemErr, elemInput) => {
        elemErr.innerHTML = null;
        elemInput.classList.add('is-valid');
        elemErr.classList.remove('invalid-tooltip');
        elemInput.classList.remove('is-invalid');
    };

    const remove = (elemErr, elemInput) => {
        elemInput.classList.remove('is-valid');
        elemErr.classList.remove('invalid-tooltip');
        elemErr.innerHTML = null;
    };

    //*IMAGEN PRIMARIA

    const errImgPrimary = document.querySelector('.err-imgPrimary');
    const imgElement = document.querySelector('.imagePrimary');
    
    imgPrimary.addEventListener('change', function (e) {
        const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
        const files = Array.from(this.files);
        switch (true) {
            case !files.length:
                invalid(errImgPrimary, 'Debes ingresar una imagen principal', this);
                existImgPrima = true;
                break;
            case files.length > 1:
                invalid(errImgPrimary, 'No puedes ingresar más de 1 archivo', this);
                existImgPrima = true;
                break;
            case files.some((file) => !regExpFiles.test(file.name)):
                invalid(errImgPrimary, 'El formato de la imagen principal es inválido. Formatos válidos: .png .jpg .jpeg .webp .gif', this);
                existImgPrima = true;
                break;
            default:
                valid(errImgPrimary, this);
                existImgPrima = false;
                if (this.files && this.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        imgElement.setAttribute('src', e.target.result);
                    };
                    reader.readAsDataURL(this.files[0]);
                };
                break;
        };
    });

    //*IMAGEN SECUNDARIA

    const errImgSecondary = document.querySelector('.err-imgSecondaries');
    imgSecondary.addEventListener('change', function (e) {
        const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
        const files = Array.from(this.files);
        switch (true) {
            case files.length > 3:
                invalid(errImgSecondary, 'No puedes ingresar más de 3 archivos', this)
                existImgSecon = true;
                break;
            case files.some((file) => !regExpFiles.test(file.name)):
                invalid(errImgSecondary, 'Uno de los archivos es inválido. Formatos válidos: .png .jpg .jpeg .webp .gif', this)
                existImgSecon = true;
                break;
            default:
                valid(errImgSecondary, this);
                existImgSecon = false;
                break;
        };
    });

    //*TITULO

    const errTitle = document.querySelector('.err-title');
    title.addEventListener('keyup', function (e) {
        const value = this.value.trim();
        switch (true) {
            case !value.length:
                invalid(errTitle, 'El título es requerido', this);
                existTitleError = true;
                break;
            case exRegAlfanumeric.test(value):
                invalid(errTitle, 'El título debe ser alfanumérico', this);
                existTitleError = true;
                break;
            case value.length < 5 || value.length > 100:
                invalid(errTitle, 'El título debe tener un mínimo de 5 caracteres y un máximo de 100 caracteres', this);
                existTitleError = true;
                break;
            default:
                valid(errTitle, this);
                existTitleError = false;
                break;
        };
    });

    title.addEventListener('focus', function (e) {
        remove(errTitle, this);
    });

    //*CATEGORIA

    const errCategory = document.querySelector('.err-category');
    category.addEventListener('keyup', function (e) {
        if (!this.options[this.selectedIndex].value) {
            invalid(errCategory, 'La categoría es requerida', this);
            existCateError = true;
        } else {
            valid(errCategory, this);
            existCateError = false;
        };
    });

    //*SUBCATEGORIA

    const errSubcategory = document.querySelector('.err-subcategory');
    subcategory.addEventListener('keyup', function (e) {
        if (!this.options[this.selectedIndex].value) {
            invalid(errSubcategory, 'La subcategoría es requerida', this);
            existSubcaError = true;
        } else {
            valid(errSubcategory, this);
            existSubcaError = false;
        };
    });

    //*DESCRIPCIÓN

    const errDescription = document.querySelector('.err-description');
    description.addEventListener('keyup', function (e) {
        const value = this.value.trim();
        switch (true) {
            case !value.length:
                invalid(errDescription, 'La descripción es requerida', this);
                existDescripError = true;
                break;
            case exRegAlfanumeric.test(value):
                invalid(errDescription, 'La descripción debe ser alfanumérica', this);
                existDescripError = true;
                break;
            case value.length < 30 || value.length > 500:
                invalid(errDescription, 'La descripción debe tener un mínimo de 30 y un máximo de 500 caracteres', this);
                existDescripError = true;
                break;
            default:
                valid(errDescription, this);
                existDescripError = false;
                break;
        }
    });

    description.addEventListener('focus', function (e) {
        remove(errDescription, this)
    });

    //*PRECIO

    const errPrice = document.querySelector('.err-price');
    price.addEventListener('keyup', function (e) {
        const value = this.value.trim();
        switch (true) {
            case !value.length:
                invalid(errPrice, 'El precio es requerido', this);
                existPriceError = true;
                break;
            case isNaN(value):
                invalid(errPrice, 'El precio debe ser numérico', this);
                existPriceError = true;
                break;
            case value < 0:
                invalid(errPrice, 'El precio debe tener un valor positivo', this);
                existPriceError = true;
                break;
            default:
                valid(errPrice, this);
                existPriceError = false;
                break;
        }
    });

    price.addEventListener('focus', function (e) {
        remove(errPrice, this);
    });


    //*DESCUENTO

    const errSale = document.querySelector('.err-sale');
    sale.addEventListener('keyup', function (e) {
        const value = this.value.trim();
        switch (true) {
            case !value.length:
                invalid(errSale, 'El descuento es requerido', this);
                existSaleError = true;
                break;
            case value < 0 || value > 100:
                invalid(errSale, 'El descuento debe ser un numero entre 0 y 100', this);
                existSaleError = true;
                break;
            default:
                valid(errSale, this);
                existSaleError = false;
                break;
        };
    });

    sale.addEventListener('focus', function (e) {
        remove(errSale, this);
    });

    //*CANTIDAD

    const errQuantity = document.querySelector('.err-quantity');
    quantity.addEventListener('keyup', function (e) {
        const value = this.value.trim();
        switch (true) {
            case !value.length:
                invalid(errQuantity, 'La cantidad es requerida', this);
                existQuanError = true;
                break;
            case isNaN(value):
                invalid(errQuantity, 'La cantidad debe ser un número', this)
                existQuanError = true;
                break;
            case value <= 0:
                invalid(errQuantity, 'La cantidad debe ser un número positivo', this)
                existQuanError = true;
                break
            default:
                valid(errQuantity, this)
                existQuanError = false;
                break;
        };
    });

    quantity.addEventListener('focus', function (e) {
        remove(errQuantity, this);
    });

    //*COLOR

    const errColor = document.querySelector('.err-color');
    color.addEventListener('keyup', function (e) {
        if (!this.options[this.selectedIndex].value) {
            invalid(errColor, 'El color es requerido', this);
            existColorError = true;
        } else {
            valid(errColor, this);
            existColorError = false;
        };
    });

    //*FORMULARIO

    const formCreate = document.querySelector('#form');
    const errFormGeneral = document.querySelector('.err-form-general');
    formCreate.addEventListener("submit", function (e) {

        if (existImgPrima || existImgSecon || existTitleError || existCateError || existSubcaError || existDescripError || existPriceError || existSaleError || existQuanError || existColorError) {
            e.preventDefault();
            errFormGeneral.innerHTML = 'Hay errores en algunos campos';
            errFormGeneral.classList.add("alert", "alert-danger");
            return;
        };
    });
});
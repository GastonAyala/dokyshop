const { check, body } = require("express-validator");
const path = require("path");

const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;

const fieldTitulo = check("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .bail()
    .isAlphanumeric("es-ES", { ignore: " .," })
    .withMessage("El título debe ser alfanumérico")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener un mínimo de 5 caracteres");

const fieldCategoria = check("category")
    .notEmpty()
    .withMessage("La categoría es requerida");

const fieldSubcategoria = check("subcategory")
    .notEmpty()
    .withMessage("La subcategoría es requerida");

const fieldDescripcion = check("descrition")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .bail()
    .isAlphanumeric("es-ES", { ignore: " .," })
    .withMessage("La descripción debe ser alfanumérica")
    .bail()
    .isLength({ min: 30, max: 500 })
    .withMessage("La descripción debe tener un mínimo de 30 y un máximo de 500 caracteres");

const fieldPrecio = check("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .bail()
    .isNumeric()
    .withMessage("El precio debe ser numérico")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("El precio debe tener un valor positivo");

const fieldDescuento = check("sale")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("El descuento debe ser un porcentaje entre 0 y 100");

const fieldCantidad = check("quantity")
    .notEmpty().withMessage("La cantidad es requerida")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("La cantidad debe ser un número entero positivo");

const fieldColor = check("color")
    .notEmpty()
    .withMessage("El color es requerido");

const fieldDisponible = check("available")
    .notEmpty()
    .withMessage("El campo Disponible es requerido")
    .bail()
    .isBoolean()
    .withMessage("Disponible debe ser un valor booleano");

const fieldImagePrincipalStore = body("imageprincipal")
    .custom((value, { req }) => {
    const lengthImages = req.files?.imagePrincipal?.length;

    if (!lengthImages) throw new Error("Debes ingresar una imagen principal");
    if (lengthImages > 1) throw new Error("No puedes ingresar más de 1 archivo");

    const extFile = path.extname(req.files.imagePrincipal[0].originalname);
    const isFormatSuccess = regExpFiles.test(extFile);

    if (!isFormatSuccess) throw new Error("El formato de la imagen principal es inválido");
    return true;
});

const fieldImagesSecondaryStore = body("imagesSecondary")
    .custom((value, { req }) => {
    const lengthImages = req.files?.imagesSecondary?.length;

    if (!lengthImages) throw new Error("Debes ingresar imágenes secundarias");
    if (lengthImages > 3) throw new Error("No puedes ingresar más de 3 archivos");

    const imagesSecondary = req.files.imagesSecondary;
    const existSomeFormatInvalid = imagesSecondary.some((img) => {
        const extFile = path.extname(img.originalname);
        return !regExpFiles.test(extFile);
    });

    if (existSomeFormatInvalid) throw new Error("Uno de los archivos es inválido. Formatos válidos: .png .jpg .jpeg .webp .gif");
    return true;
});

const fieldImagePrincipalUpdate = body("imagePrincipal").custom((value, { req }) => {
    const lengthImages = req.files?.imagePrincipal?.length;

    if (lengthImages) {
        if (lengthImages > 1) throw new Error("No puedes ingresar más de 1 archivo");

        const extFile = path.extname(req.files.imagePrincipal[0].originalname);
        const isFormatSuccess = regExpFiles.test(extFile);

        if (!isFormatSuccess) throw new Error("El formato de la imagen principal es inválido");
    }
    return true;
});

const fieldImagesSecondaryUpdate = body("imagesSecondary").custom((value, { req }) => {
    const lengthImages = req.files?.imagesSecondary?.length;

    if (lengthImages) {
        if (lengthImages > 3) throw new Error("No puedes ingresar más de 3 archivos");

        const imagesSecondary = req.files.imagesSecondary;
        const existSomeFormatInvalid = imagesSecondary.some((img) => {
            const extFile = path.extname(img.originalname);
            return !regExpFiles.test(extFile);
        });

        if (existSomeFormatInvalid) throw new Error("Uno de los archivos es inválido. Formatos válidos: .png .jpg .jpeg .webp .gif");
    }
    return true;
});

const defaultValidationFields = [
    fieldTitulo,
    fieldCategoria,
    fieldSubcategoria,
    fieldDescripcion,
    fieldPrecio,
    fieldDescuento,
    fieldCantidad,
    fieldColor,
    fieldDisponible,
];

module.exports = {
    productValidationStore: [
        ...defaultValidationFields,
        fieldImagePrincipalStore,
        fieldImagesSecondaryStore,
    ],
    productValidationUpdate: [
        ...defaultValidationFields,
        fieldImagePrincipalUpdate,
        fieldImagesSecondaryUpdate,
    ],
};
const { body } = require("express-validator");
const path = require('path')
const regExpFiles = /.png|.jpg|.jpeg|.webp/i;

const fieldAvatar = body('avatar')
.custom((value, {req}) => {
    const lengthAvatar = req.files?.avatar?.length;
    if(lengthAvatar) {
        if (lengthAvatar > 1) 
        throw new Error('No puedes ingresar mas de una imagen')

        const extAvatar = path.extname(req.files?.avatar[0]?.originalname);
        const isFormatSucess = regExpFiles.test(extAvatar);

        if (!isFormatSucess) throw new Error("El formato de la imagen de perfil es inválido. formatos sopórtados: .png, .jpg, .jpeg, .webp");

    }
    return true;
});

const fieldName = body('name')
    .notEmpty()
    .withMessage("El campo Nombre es requerido")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("Debe tener un mínimo de 5 y máximo 50 caracteres");

const fieldAdress = body("adress")
    .isAlphanumeric("es-ES", {ignore: " "})
    .withMessage("El campo Dirección debe ser alfanumérico")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("La dirección debe tener un mínimo de 5 y máximo 50 caracteres");

const fieldCity = body("city")
    .isAlpha("es-ES", {ignore: " "})
    .withMessage("No se permiten caracteres especiales y números")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("El nombre de ciudad debe tener un mínimo de 5 y máximo de 50 caracteres");


const fieldProvince = body("province")
    .isAlpha("es-ES", {ignore: " "})
    .withMessage("No se permiten caracteres especiales y números")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("El nombre de ciudad debe tener un mínimo de 5 y máximo de 50 caracteres");

const fieldZipcode = body("zipcode")
.isNumeric()
.withMessage("El campo Código postal debe ser numérico")
.bail()
.isLength({min: 4, max: 4})
.withMessage("La longitud debe ser de 4 numéros")

const fieldPhone = body("phone")
    .isNumeric()
    .withMessage("El campo Teléfono postal debe ser numérico")
    .bail()
    .isLength({min: 10, max: 13})
    .withMessage("La longitud debe ser de mínimo 10 y máximo 13 numéros")

module.exports = {
    updateUserValidation: [fieldAvatar, fieldName, fieldAdress, fieldCity, fieldProvince, fieldZipcode, fieldPhone]
};
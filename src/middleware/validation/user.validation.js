const { body } = require("express-validator");
const path = require('path')
const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;

const fieldAvatar = body('avatar')
.custom((value, {req}) => {
    const lengthAvatar = req.files?.avatar?.length;
    if(lengthAvatar) {
        if (lengthAvatar > 1) 
        throw new Error('No puedes ingresar más de una imagen')

        const extAvatar = path.extname(req.files?.avatar[0]?.originalname);
        const isFormatSucess = regExpFiles.test(extAvatar);

        if (!isFormatSucess) throw new Error("El formato de la imagen de perfil es inválido. formatos sopórtados: .png, .jpg, .jpeg, .webp, .gif");

    }
    return true;
});

const fieldName = body('name')
    .optional({checkFalsy: true})
    .isAlpha("es-ES", {ignore: " "})
    .withMessage("El campo no permite números ni caracteres especiales")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("Debe tener un mínimo de 5 y máximo 50 caracteres");

const fieldstreet = body("street")
    .optional({checkFalsy: true})
    .isAlphanumeric("es-ES", {ignore: " "})
    .withMessage("El campo Dirección debe ser alfanumérico")
    .bail()
    .isLength({ min: 5, max: 50})
    .withMessage("La dirección debe tener un mínimo de 5 y máximo 50 caracteres");

const fieldCity = body("city")
    .optional({checkFalsy: true})
    .isAlphanumeric("es-ES", {ignore: " "})
    .withMessage("El campo Ciudad debe ser alfanumérico")
    .bail()
    .isLength({ min: 5, max: 100})
    .withMessage("El nombre de la ciudad debe tener un mínimo de 5 y máximo de 100 caracteres");


const fieldProvince = body("province")
    .optional({checkFalsy: true})
    .isAlphanumeric("es-ES", {ignore: " ,´"})
    .withMessage("El campo Provincia debe ser alfanumérico")
    .bail()
    .isLength({ min: 5, max: 100})
    .withMessage("El nombre de la provincia debe tener un mínimo de 5 y máximo de 100 caracteres");

const fieldZipcode = body("zipcode")
   .optional({checkFalsy: true})
   .isNumeric()
   .withMessage("El campo Código postal debe ser numérico")
   .bail()
   .isLength({min: 4, max: 4})
   .withMessage("La longitud debe ser de 4 numéros")

const fieldPhone = body("phone")
    .optional({checkFalsy: true})
    .isInt({ gt: 0})
    .withMessage("El valor debe ser numérico positivo")
    .bail()
    .isLength({min: 10, max: 13})
    .withMessage("La longitud debe ser de mínimo 10 y máximo 13 numéros")

module.exports = {
    updateUserValidation: [fieldAvatar, fieldName, fieldstreet, fieldCity, fieldProvince, fieldZipcode, fieldPhone]
};
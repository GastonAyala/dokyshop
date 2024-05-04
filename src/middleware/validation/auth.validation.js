const db = require('../../database/models');
const { body } = require('express-validator');
const { compareSync } = require('bcryptjs');
const path = require('path');
const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const expReg = /.png|.jpg|.jpeg|.webp|.gif/i;

const fieldEmaildDefault = body("email")
    .notEmpty()
    .withMessage("El campo email es requerido!").bail()
    .isEmail()
    .withMessage("Debe completar un email valido!").bail()

const imageAvatar = body("avatar").custom((value, { req }) => {
    const lengthImages = req.files?.avatar?.length;

    if (lengthImages) {
        if (lengthImages > 1) throw new Error("No puedes ingresar mas de un archivo");

        const extFile = path.extname(req.files?.avatar[0]?.originalname);
        const isFormat = expReg.test(extFile);

        if (!isFormat) throw new Error("Formato invalida los formatos  soportados son : .png, .jpg, .jpeg, webp");
    }
    return true
});

// register
const fieldName = body('name')
    .notEmpty()
    .withMessage("El campo nombre completo es requerido!").bail()
    .isLength({ min: 5, max: 50 })
    .withMessage("Debe tener un minimo de 5 caracteres!")

const fieldEmail = fieldEmaildDefault.custom(async (value, { req }) => {
    const userFind = await db.user.findAll({
        where: { email: value.trim() }
    })

    if (userFind.length) {
        if (userFind[0].dataValues.email === value) {
            throw new Error("Ya existe un usuario registrado con ese email!")
        }
    }
    return true
})

const fieldPassword = body("password")
    .notEmpty()
    .withMessage("El campo contraseña es requerido!").bail()
    .isLength({ min: 8, max: 16 })
    .withMessage("Longitud invalida!").bail()
    .matches(regExPass).withMessage("Contraseña debe contener al menos una mayuscula una minuscula y un  numero!")


// Login

const loginEmail = body("email")
    .notEmpty()
    .withMessage("El campo email es requerido!").bail()
    .isEmail()
    .withMessage("Debe completar un email valido!").bail()
    .custom( async (value, { req }) => {
        const userFind = await db.user.findAll({
            where: { email: value.trim() }
        })

        if (!userFind.length) {
            throw new Error("Datos ingresados incorrectos!")
        }
        return true

    });

const logindPassword = body("password")
    .notEmpty()
    .withMessage("El campo contraseña es requerido!").bail()
    .isLength({ min: 8, max: 16 })
    .withMessage("Longitud invalida!").bail()
    .matches(regExPass)
    .withMessage("Dato invalido")
    .bail()
    .custom(async (value, { req }) => {
        const { email } = req.body;
        const userFind = await db.user.findAll({
            where: { email }
        })
        
        const isValidPassword = compareSync(value, userFind[0].dataValues.password)
        if (!isValidPassword) {
            throw new Error("Credenciales inválidas");
        }
        return true
    });

module.exports = {
    registerValidation: [imageAvatar, fieldName, fieldEmail, fieldPassword],
    loginValidation: [loginEmail, logindPassword],
};
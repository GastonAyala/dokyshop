const express = require("express");
const router = express.Router();

const { login, loginProcess, register, registerProcess, logout } = require("../controllers/authentication");
const { uploadAvatar } = require("../middleware/uploadAvatar");
const { registerValidation, loginValidation } = require("../middleware/validation");
const { checkIsGuest, checkIsLogged } = require("../middleware");

router.get("/registro", checkIsGuest, register);   // autenticacion/registro

router.post("/registro", 
uploadAvatar.fields([{name: 'avatar'}]), 
registerValidation,
registerProcess)

// /autenticacion
router.get("/iniciar", checkIsGuest, login); 

router.post("/iniciar", loginValidation, loginProcess); // /autenticacion/iniciar

router.get("/cerrar-sesion", checkIsLogged, logout);


module.exports = router;
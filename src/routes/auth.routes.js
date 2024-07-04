const express = require("express");
const router = express.Router();

const { login, loginProcess, register, registerProcess, logout, loginAndRegisterGoogle } = require("../controllers/authentication");
const { uploadAvatar } = require("../middleware/uploadAvatar");
const { registerValidation, loginValidation } = require("../middleware/validation");
const { checkIsGuest, checkIsLogged } = require("../middleware");

const passport = require("passport");

router.get("/registro", checkIsGuest, register);   // autenticacion/registro

router.post("/registro", 
uploadAvatar.fields([{name: 'avatar'}]), 
registerValidation,
registerProcess)


// /autenticacion
router.get("/iniciar", checkIsGuest, login); 

router.post("/iniciar", loginValidation, loginProcess); // /autenticacion/iniciar

router.get("/cerrar-sesion", checkIsLogged, logout);

//Login Google
passport.serializeUser((user,done) => done(null, user))
passport.deserializeUser((user,done) => done(null, user))

router.get('/iniciar/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/autenticacion/iniciar'}),
 loginAndRegisterGoogle
);
module.exports = router;
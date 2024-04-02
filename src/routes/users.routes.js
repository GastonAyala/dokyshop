const express = require("express");
const router = express.Router();

const { profile, editProcess } = require("../controllers/users");
const { uploadAvatar } = require("../middleware/uploadAvatar");
const { updateUserValidation } = require("../middleware/validation");
const { checkIsLogged } = require("../middleware");

router.get("/perfil", checkIsLogged, profile);

router.put("/perfil/editar/:id",
uploadAvatar.fields([{name: "avatar"}]),
updateUserValidation,
editProcess);


module.exports = router;
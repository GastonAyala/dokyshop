const express = require('express');
const router = express.Router();

const { uploadProducts } = require("../middleware/uploadFiles");
const { uploadAvatar } = require('../middleware/uploadAvatar');

const { checkIsAdmin } = require('../middleware');

const { list, search, create, store, edit, update, deleteProduct, destroy } = require('../controllers/admin');
const { userList, userEdit, editProcess, deleteUser, destroyUser, userSearch } = require('../controllers/admin/users');

// /admin
router.get("/productos", checkIsAdmin, list);
router.get("/productos/buscar", checkIsAdmin, search)

router.get("/crear-producto", checkIsAdmin, create);
router.post("/crear-producto", uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 1 }]), store);


router.get("/editar-producto/:id", checkIsAdmin, edit);
router.put("/editar-producto/:id", uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 1 }
]), update);

router.get('/eliminar', checkIsAdmin, deleteProduct)
router.delete('/eliminar/:id', destroy)


// /admin/usuarios
router.get("/usuarios", checkIsAdmin, userList);
router.get("/usuarios/buscar", checkIsAdmin, userSearch);

router.get("/editar-usuario/:id", checkIsAdmin, userEdit);
router.put("/editar-usuario/:id", uploadAvatar.fields([{name: "avatar", maxCount: 1}]), editProcess);

router.get("/eliminar-usuario", checkIsAdmin, deleteUser)
router.delete("/eliminar-usuario/:id", destroyUser)

module.exports = router;
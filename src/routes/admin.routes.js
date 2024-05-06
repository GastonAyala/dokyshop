const express = require('express');
const router = express.Router();

const { uploadProducts } = require("../middleware/uploadFiles");
const { uploadAvatar } = require('../middleware/uploadAvatar');

const { checkIsAdmin } = require('../middleware');

const { list, search, create, store, edit, update, deleteProduct, destroy } = require('../controllers/admin');
const { userList, userEdit, editProcess, deleteUser, destroyUser, userSearch } = require('../controllers/admin/users');
const { orderList, searchOrder } = require('../controllers/admin/orders');
const { updateUserValidation } = require('../middleware/validation/user.validation');

// /admin
router.get("/productos", checkIsAdmin, list);
router.get("/productos/buscar", checkIsAdmin, search);

router.get("/crear-producto", checkIsAdmin, create);
router.post("/crear-producto", checkIsAdmin, uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 3 }]), store);


router.get("/editar-producto/:id", checkIsAdmin, edit);
router.put("/editar-producto/:id", checkIsAdmin, uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 3 }
]), update);

router.get('/eliminar', checkIsAdmin, deleteProduct);
router.delete('/eliminar/:id', checkIsAdmin, destroy);


// /admin/usuarios
router.get("/usuarios", checkIsAdmin, userList);
router.get("/usuarios/buscar", checkIsAdmin, userSearch);

router.get("/editar-usuario/:id", checkIsAdmin, userEdit);
router.put("/editar-usuario/:id", checkIsAdmin, uploadAvatar.fields([{name: "avatar", maxCount: 1}]), updateUserValidation, editProcess);

router.get("/eliminar-usuario", checkIsAdmin, deleteUser);
router.delete("/eliminar-usuario/:id", checkIsAdmin, destroyUser);


// admin/ordenes
router.get("/ordenes", checkIsAdmin, orderList);
router.get("/ordenes/buscar", checkIsAdmin, searchOrder);

module.exports = router;
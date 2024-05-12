const router = require('express').Router();

const { getOrder, addProductToOrder, removeProductToOrder } = require('../../controllers/api/cart');


router.get('/', getOrder);
router.patch('/add/:id', addProductToOrder);
router.patch('/remove/:id', removeProductToOrder);

module.exports = router;
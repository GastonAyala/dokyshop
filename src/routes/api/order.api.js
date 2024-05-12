const router = require('express').Router();

const { getOrder, addProductToOrder, removeProductToOrder, moreQuantity, lessQuantity } = require('../../controllers/api/cart');


router.get('/', getOrder);
router.patch('/add/:id', addProductToOrder);
router.patch('/remove/:id', removeProductToOrder);
router.patch('/more/:id', moreQuantity);
router.patch('/less/:id', lessQuantity);

module.exports = router;
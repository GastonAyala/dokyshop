const router = require('express').Router();

const { getOrder, addProductToOrder, removeProductToOrder, moreQuantity, lessQuantity, cancelOrder, completeOrder } = require('../../controllers/api/cart');
const { getCompletedOrder } = require('../../controllers/api/orders');


router.get('/', getOrder);
router.patch('/add/:id', addProductToOrder);
router.patch('/remove/:id', removeProductToOrder);
router.patch('/more/:id', moreQuantity);
router.patch('/less/:id', lessQuantity);
router.patch('/cancel', cancelOrder);
router.patch('/complete', completeOrder);

router.get('/completed', getCompletedOrder);

module.exports = router;
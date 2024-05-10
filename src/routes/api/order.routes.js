const router = require('express').Router();

const { getOrder } = require('../../controllers/api/cart');


router.get('/', getOrder);


module.exports = router;
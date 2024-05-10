const router = require('express').Router();
const { listApi, renderImg } = require('../../controllers/api/product');

router.get('/', listApi)

router.get('/:image', renderImg)

module.exports = router;
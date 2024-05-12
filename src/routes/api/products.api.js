const router = require('express').Router();
const { listApi, renderImg, detailProductApi } = require('../../controllers/api/product');
const { detailApi } = require('../../controllers/api/users');

router.get('/', listApi)
router.get('/:id',detailProductApi)
router.get('/:image', renderImg)

module.exports = router;
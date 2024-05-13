const router = require('express').Router();
const { listApi, renderImg, detailProductApi } = require('../../controllers/api/product');

router.get('/', listApi);
router.get('/detail/:id', detailProductApi);
router.get('/:image', renderImg);

module.exports = router;
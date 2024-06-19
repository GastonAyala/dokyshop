const router = require('express').Router();
const { listApi, renderImg, detailProductApi, storeApi, updateApi, removeApi } = require('../../controllers/api/product');
const { uploadProducts } = require('../../middleware/uploadFiles');

router.get('/', listApi);
router.get('/detail/:id', detailProductApi);
router.get('/:image', renderImg);

router.post('/create', uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 3 }
]), storeApi);

router.put('/update/:id', uploadProducts.fields([
    { name: "imagePrimary", maxCount: 1 },
    { name: "imagesSecondary", maxCount: 3 }
]), updateApi);

router.delete('/delete/:id', removeApi);

module.exports = router;
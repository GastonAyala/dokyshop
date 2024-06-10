const router = require('express').Router();

const { list } = require('../../controllers/api/categories')

router.get('/', list)


module.exports = router;
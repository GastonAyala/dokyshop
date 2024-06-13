const { list } = require('../../controllers/api/subcategories');

const router = require('express').Router();

router.get('/', list)

module.exports = router;
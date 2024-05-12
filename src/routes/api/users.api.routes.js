const router = require("express").Router()
const { listApi, renderImg, } = require("../../controllers/api/users");



//  /api/users
router.get("/", listApi)
router.get('/:image', renderImg)




module.exports = router;
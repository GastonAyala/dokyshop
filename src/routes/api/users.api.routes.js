const router = require("express").Router()
const { listApi, renderImg, detailUserApi, } = require("../../controllers/api/users");



//  /api/users
router.get("/", listApi)
router.get("/:id",detailUserApi)
router.get('/:image', renderImg)




module.exports = router;
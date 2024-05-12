const router = require("express").Router()
const { listApi, renderImg, detailApi, } = require("../../controllers/api/users");



//  /api/users
router.get("/", listApi)
router.get("/:id",detailApi)
router.get('/:image', renderImg)




module.exports = router;
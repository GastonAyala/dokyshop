const router = require("express").Router()
const { listApi } = require("../../controllers/api/users");
const { uploadAvatar } = require("../../middleware/uploadAvatar")


//  /api/users
router.get("/",uploadAvatar.fields([{name: "avatar"}]), listApi)




module.exports = router;
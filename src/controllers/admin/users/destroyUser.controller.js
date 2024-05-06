const db = require('../../../database/models');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    const { id } = req.params
    const userToDestroy = await db.user.findByPk(id, {
        attributes: { exclude: ['password']}
    })
   
    const pathAvatar = path.join(__dirname, "../../../../public/images/avatar/" + userToDestroy.avatar);
    const existsFile = fs.existsSync(pathAvatar);

    if(existsFile && pathAvatar !== "perfilUser.png") {
        fs.unlinkSync(pathAvatar)
    }
    const userDestroyed = await db.user.destroy({
        where: {
            id
        }
    })
    return res.redirect("/admin/usuarios")
};
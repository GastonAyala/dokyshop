const db = require('../../../database/models');
const path = require('path');
const fs = require('fs')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role } = req.body; 
        const avatarImage = req.files?.avatar;

        const userToEdit = await db.user.findAll({
            include: ['role'],
            where: {id}
        });
        const userEdited = await db.user.update({
            name: name ? name.trim() : null,
            role: role ? role.trim().toUpperCase() : null,
            avatar: avatarImage?.length && avatarImage[0]?.filename
        },
        {
            where: { id: +id }
        })
        const oldAvatarPath = path.join(__dirname, "../../../../public/images/avatar/" + userToEdit[0].avatar);
        const existOldImg = fs.existsSync(oldAvatarPath);
        if (existOldImg) {
            if (userEdited[0].avatar !== "perfilUser.png" && avatarImage?.length) {
                fs.unlinkSync(oldAvatarPath);
            };
        };
        return res.redirect("/admin/usuarios")

    } catch (err) {
        return res.send(err.message)
    }
};
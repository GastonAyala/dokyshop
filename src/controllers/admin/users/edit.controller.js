const db = require("../../../database/models")

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.user.findByPk(id,
            {
                attributes: { exclude : ['password','addressId', 'createdAt', 'updatedAt', 'deletedAt']},
                include: ['role', {association: 'address', attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }}]
            }
        )
        const roles = await db.role.findAll()
        return res.render("admin/users/editUser", { user, roles },
            (err, contentView) => {
            err && res.send(err.message)
            return res.render("partials/dashboard", {
                contentView
            });
        });
    } catch (err) {
        return res.send(err.message)
    }
};
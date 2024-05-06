const db = require("../database/models");

module.exports = async (req, res, next) => {
    if (req.session.userLogin ) {
        try {
            const users = await db.user.findAll({
                include: ['role'],
                where: {
                    email: req.session.userLogin.email
                }
            });
        
            const roles = await db.role.findAll({
                where: {
                    name: "ADMIN"
                }
            });
        
            const adminRoleId = roles[0].id
            
            if (req.session.userLogin && req.session.userLogin.roleId === adminRoleId) {
                if (users.length) {
                    return next();
                }
                else {
                    return res.redirect("/");
                }
            };
        } catch {
            return res.redirect("/");
        }
    }
    return res.redirect("/");
};
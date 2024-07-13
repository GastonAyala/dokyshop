const db = require("../database/models");

module.exports = async (req, res, next) => {
    if (req.session.userLogin) {
        try {
            const { avatar } = await db.user.findByPk(req.session.userLogin.id, {
                attributes: ["avatar"]
            })

            req.session.userLogin.avatar = avatar
            req.cookies.userLogin = req.session.userLogin
            res.locals.userLogin = req.session.userLogin

            res.cookie("userLogin", req.session.userLogin, {maxAge: (60000 * 10 ) * 6})

            return next()
        } catch (error) {
            console.error("Error en el middleware: ", error);
            return next(error);
        }
    } else {
        next();
    }
};
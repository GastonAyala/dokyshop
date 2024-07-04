const db = require('../../database/models');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    try {
        const { id } = req.session.userLogin
        const sessionAvatar = req.session.userLogin.avatar
        const user = await db.user.findByPk(id)
        const oldAvatarPath = path.join(__dirname, "../../../public/images/avatar/" + sessionAvatar)
        const googleImg = /http/

        if (!googleImg.test(oldAvatarPath) && sessionAvatar !== user.avatar) {
            fs.unlinkSync(oldAvatarPath)
        }
        
        req.session.destroy();
        res.cookie("userLogin", "", { maxAge: -1 });

        return res.redirect("/");
    } catch (err) {
       res.send(err.message)
    }
    
};
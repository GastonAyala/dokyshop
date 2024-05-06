const db = require("../../database/models")
const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { name, street, city, province, zipcode, phone } = req.body;
        const avatarImage = req.files?.avatar;
        db.user.update({
            avatar: avatarImage?.length && avatarImage[0]?.filename,
            name: name.trim() ? name : null,
            phone: phone ? phone : null,
        }, { where: { id: req.session?.userLogin?.id } })
            .then(() => {
                db.address.update({
                    street: street ? street : null,
                    city: city ? city : null,
                    province: province ? province : null,
                    zipCode: zipcode ? zipcode : null,
                }, {
                    where: { id: req.session?.userLogin?.id },
                })
            })
            .then(() => {
                const oldAvatarPath = path.join(__dirname, "../../../public/images/avatar/" + avatarImage)
                const existOldImg = fs.existsSync(oldAvatarPath);
                if (existOldImg) {
                    if (userUpdated.avatar !== "perfilUser.png" && avatarImage?.length) {
                        if (userEdited.avatar === avatarImage[0]?.filename) {
                            fs.unlinkSync(oldAvatarPath);
                        };
                    }
                }
                return res.redirect("/usuario/perfil")
            })

    } else {
        const { id } = req.session?.userLogin
        db.user.findByPk(id, {
            include: ['address']
        })
        .then(user => {
            return res.render("users/profile", {
                user,
                old: req.body,
                errors: errors.mapped()
            });
        })
    };
};

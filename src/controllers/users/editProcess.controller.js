const db = require("../../database/models")
const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { id } = req.session?.userLogin;
        const { name, street, city, province, zipcode, phone } = req.body;
        const avatarImage = req.files?.avatar;
        db.user.findByPk(id)
        .then(userToEdit => {
            db.user.update({
                avatar: avatarImage?.length && avatarImage[0]?.filename,
                name: name.trim() ? name : null,
                phone: phone ? phone : null,
            }, 
            { where: { id } 
            })
            .then(() => {
                db.address.update({
                    street: street ? street : null,
                    city: city ? city : null,
                    province: province ? province : null,
                    zipCode: zipcode ? zipcode : null,
                }, {
                    where: { id },
                })
            })
            .then(() => {
                return res.redirect("/usuario/perfil")
            })
            .catch(err => {
                return res.send(err.message)
            })
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

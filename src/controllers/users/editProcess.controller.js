const { loadData, saveData } = require("../../data");
const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const users = loadData("users");

        const { id } = req.params;
        const { name, street, city, province, zipcode, phone } = req.body;
        const avatarImage = req.files?.avatar;
    
        const usersMapped = users.map(u => {
            if (u.id === +id) {
                const userEdited = {
                    ...u,
                    name: name ? name.trim() : u.name,
                    avatar: avatarImage ? avatarImage[0]?.filename : u.avatar,
                    addresses : {
                        street : street ? street.trim() : u.street,
                        city: city ? city.trim() : u.city,
                        province: province ? province.trim() : u.province,
                        zipcode: zipcode ? zipcode.trim() : u.zipcode,
                    },
                    phone: phone ? phone.trim() : u.phone
                };
    
                const oldAvatarPath = path.join(__dirname, "../../../public/images/avatar/" + u.avatar)
                const existOldImg = fs.existsSync(oldAvatarPath);
    
                if (existOldImg) {
                    if (u.avatar !== "perfilUser.png" && avatarImage?.length) {
                        if (userEdited.avatar === avatarImage[0]?.filename) {
                            fs.unlinkSync(oldAvatarPath);
                        };
                    }
                };
                return userEdited
            };
            return u
        });
    
        saveData(usersMapped, 'users');
        
        return res.redirect("/usuario/perfil");
    };
    
    return res.render("users/profile", {
        old: req.body,
        errors: errors.mapped()
    });
};
const { loadData, saveData } = require("../../../data")
const path = require('path');
const fs = require('fs')

module.exports = (req, res) => {
    const users = loadData("users");
    const { id } = req.params;
    const { name, role } = req.body;
    const avatarImage = req.files?.avatar;

    const usersMapped = users.map(u => {
        if(u.id === +id) {
            const userEdited = {
                ...u,
                name: name ? name.trim() : u.name,
                role: role ? role.trim().toUpperCase() : u.role,
                avatar: avatarImage ? avatarImage[0]?.filename : u.avatar
            };

            const oldAvatarPath = path.join(__dirname, "../../../public/images/avatar/" + u.avatar)
            const existOldImg = fs.existsSync(oldAvatarPath);
            if (existOldImg) {
                if (u.avatar !== "perfilUser.png" && avatarImage?.length) {
                    fs.unlinkSync(oldAvatarPath);
                };
            };
            return userEdited
        };
        return u
    });
    saveData(usersMapped, "users");

    return res.redirect("/admin/usuarios")
}
const { loadData, saveData } = require("../../../data")
const path = require('path');
const fs = require('fs');


module.exports = (req, res) => {
    const users = loadData("users")
    const { id } = req.params;

    const userLessOne = users.filter(u => u.id !== +id);

    const userDestroy = users.find(u => u.id === +id);

    const pathAvatar = path.join(__dirname, "../../../../public/images/avatar/" + userDestroy.avatar);

    const existsFile = fs.existsSync(pathAvatar);

    if(existsFile) {
        fs.unlinkSync(pathAvatar)
    }

    saveData(userLessOne, "users");

    return res.redirect("/admin/usuarios")
};
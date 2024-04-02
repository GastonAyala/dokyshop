const { loadData } = require("../../../data")


module.exports = (req, res) => {
    const users = loadData("users");
    const { id } = req.params;
    const userFind = users.find(u => u.id === +id)
    res.render("admin/users/editUser", { user : userFind}, 
    (err, contentView) => {
        err && res.send(err.message)
        res.render("partials/dashboard", {
            contentView
        });
    });
};
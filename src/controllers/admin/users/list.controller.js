const { loadData } = require("../../../data");

module.exports = (req, res) => {
    const user = loadData('users');
    res.render("admin/users/listUsers", { user },
    (err, contentView) => {
        err && res.send(err.message)
        res.render("partials/dashboard", {
            contentView
        });
    });
};
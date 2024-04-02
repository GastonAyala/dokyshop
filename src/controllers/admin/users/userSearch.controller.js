const { loadData } = require("../../../data");

module.exports = (req, res) => {
    const { dashUserSearch, roleFilter } = req.query
    const users = loadData("users");
    const usersFilter = users.filter(u => 
        u.id == dashUserSearch ||
        u.name.toLowerCase().includes(dashUserSearch?.toLowerCase()) ||
        u.email.toLowerCase().includes(dashUserSearch?.toLowerCase()) ||
        u.role.toLowerCase().includes(roleFilter?.toLowerCase())
    );

    res.render("admin/users/searchUser", {
        users : usersFilter, dashUserSearch, roleFilter
    }, (err, contentView) => {
        err && res.send(err.message)

        res.render("partials/dashboard", { contentView })
    });
};
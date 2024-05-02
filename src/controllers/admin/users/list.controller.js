const db = require('../../../database/models');

module.exports = (req, res) => {
    db.role.findAll()
    .then(roles => {
        db.user.findAll({
            include: ['role', 'address'],
            attributes: {
                exclude: 'password'
            }
        })
        .then(users => {
            res.render("admin/users/listUsers", { users, roles }, (err, contentView) => {
                err && res.send(err.message)
                res.render("partials/dashboard", {
                    contentView
                });
            });
        })
    })
    .catch(err => {
        res.send(err.message)
    })
};
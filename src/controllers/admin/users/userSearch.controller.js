const db = require('../../../database/models');
const { Op } = require('sequelize');

module.exports = (req, res) => {
    const { dashUserSearch, roleFilter } = req.query;

    db.role.findAll()
    .then(roles => {
        db.user.findAll({
            include: ['role','address'],
            attributes: {
                exclude: 'password'
            },
            where: {
                [Op.or]: {
                    id: dashUserSearch ? dashUserSearch : null,
                    name: {
                        [Op.like]: `%${dashUserSearch}%`
                    },
                    email: {
                        [Op.like]: `%${dashUserSearch}%`
                    },
                    roleId: roleFilter ? roleFilter : null,
                }
            }
        })
        .then(users => {
            res.render("admin/users/searchUser", {
                users, roles, dashUserSearch, roleFilter
            },
            (err, contentView) => {
                err && res.send(err.message)
                res.render("partials/dashboard", { contentView })
            });
        })
    })
    .catch(err => {
        res.send(err.message)
    })
};
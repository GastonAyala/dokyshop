const db = require('../../../database/models');
const { Op } = require('sequelize');

module.exports = (req, res) => {
    const { dashOrderSearch, statusFilter } = req.query;
    db.order.findAll({
        include: [
            {
                association: 'user',
                attributes: {
                    exclude: ['password','phone', 'roleId', 'avatar', 'addressId', 'createdAt', 'updatedAt', 'deletedAt']
                }

            },
            {
                association: 'products',
                attributes: {
                    exclude: ['description','quantity', 'sale', 'imagePrincipal','available', 'createdAt', 'updatedAt', 'deletedAt']
                }
            }
        ],
        where: {
            [Op.or]: {
                state: {
                    [Op.like] : `%${statusFilter}%`
                },
                '$user.email$' : {[Op.like]: `%${dashOrderSearch}%`},
                '$products.title$' : {[Op.like]: `%${dashOrderSearch}%`},
            }
        }
    })
    .then(orders => {
        return res.render('admin/orders/searchOrder',  {orders, dashOrderSearch, statusFilter },
        (err, contentView) => {
            err && res.send(err.message);
            return res.render('partials/dashboard', { contentView })
        }
    )})
    .catch(err => {
        res.send(err.message)
    })

};
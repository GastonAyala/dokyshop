const db = require('../../../database/models');

module.exports = (req, res) => {
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
            }]
    })
    .then(orders => {
        return res.render("admin/orders/listOrders",
        { 
            orders, 
        },
        (err, contentView) => {
            err && res.send(err.message);
            return res.render('partials/dashboard', {
                contentView
            })
        }
    )
    })
    .catch(err => {
        res.send(err.message)
    })
};
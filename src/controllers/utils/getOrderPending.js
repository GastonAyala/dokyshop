const db = require('../../database/models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
   const dataOrder = await db.order.findOrCreate({
    where: {
        [Op.and]: [
            {
                userId: req.query.userId
            },
            {
                state: "pending"
            }
        ]
    },
    defaults: {
        userId: req.query.userId,
        state: 'pending',
    },
    include: [
        {
            association: 'products',
            through: {
                attributes: ['quantity']
            }
        }
    ]
   });
   return dataOrder
};
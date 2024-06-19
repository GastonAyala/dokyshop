const db = require('../../../database/models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const data = await db.order.findAll({
            include: [{
                association: 'products',
                attributes: {
                    exclude: ['description', 'quantity', 'color', 'imagePrincipal', 'available', 'createdAt', 'updatedAt', 'deletedAt']
                }
            },
            ],
            where: {
                state: "completed"
            }
        })

        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
};

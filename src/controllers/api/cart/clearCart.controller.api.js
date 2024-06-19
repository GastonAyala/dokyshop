const db = require('../../../database/models');
const { getOrderPending } = require('../../utils');

module.exports = async (req, res) => {
    try {
        const [order, isCreate] = await getOrderPending(req);
        await db.orderproduct.destroy({
            where: {
                orderId: order.id,
            }
        });

        order.total = 0;
        await order.save

        res.status(200).json({
            ok: true,
            msg: "Productos eliminados con éxito"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }

};

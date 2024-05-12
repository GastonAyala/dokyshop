const { Op } = require('sequelize');
const db = require('../../../database/models');
const { getOrderPending, getTotalOrder } = require('../../utils');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        let [order, isCreate] = await getOrderPending(req);

        const record = await db.orderproduct.findOne({
            where: {
                [Op.and]: [
                    {
                        orderId: order.id
                    },
                    {
                        productId: id,
                    },
                ],
            },
        });

        if(record.quantity > 1) {
            record.quantity--;
            await record.save()

            order = await order.reload({
                include: [
                    {
                        association: "products",
                        throung: {
                            attributes: ["quantity"],
                        },
                    },
                ],
            });
            const total = getTotalOrder(order.products);
            order.total = total;
            await order.save();
        }
        res.status(200).json({
            ok: true,
            msg: "Cantidad descontada con éxito"
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    }
}